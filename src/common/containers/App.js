import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import TemperatureRange from '../components/temperature';
import RainChance from '../components/rain';
import CommuteRange from '../components/commute';
import Result from '../components/result';

import { retrieveWeather } from '../actions';

import '../../client/styles/App.css';
import footerImage from '../../client/images/poweredby-oneline.png';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minTemp: "",
      maxTemp: "",
      rain: 0,
      morningTimeOne: "08:00",
      morningTimeTwo: "09:00",
      eveningTimeOne: "17:00",
      eveningTimeTwo: "18:00",
      dayOne: "Monday",
      dayTwo: "Friday",
      timeOne: "",
      timeTwo: "",
      timeThree: "",
      timeFour: "",
      morningData: [],
      eveningData: [],
      tempError: null,
      morningError: null,
      eveningError: null,
      commuteError: null,

    };

    // this makes sure that the this keyword is binded to these functions
    this.decideTransportation = this.decideTransportation.bind(this);
    this.onMinChange = this.onMinChange.bind(this);
    this.onMaxChange = this.onMaxChange.bind(this);
    this.onRainChange = this.onRainChange.bind(this);
    this.onMorningOneChange = this.onMorningOneChange.bind(this);
    this.onMorningTwoChange = this.onMorningTwoChange.bind(this);
    this.onEveningOneChange = this.onEveningOneChange.bind(this);
    this.onEveningTwoChange = this.onEveningTwoChange.bind(this);
    this.onDayOneChange = this.onDayOneChange.bind(this);
    this.onDayTwoChange = this.onDayTwoChange.bind(this);
  }

  // This function is called when you click Decide My Transportation button.
  // makes the api call and determines the errors.
  decideTransportation() {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let errorTemp = false;
    let errorMorning = false;
    let errorEvening = false;
    let errorCommute = false;

    // sets all the errors to null and looks for the errors again.
    this.setState({ tempError: null, morningError: null, eveningError: null, commuteError: null });

    // checks if the minTemp and maxTemps are empty
    // or if the maxTemp is less than the minTemp, which makes the range invalid.
    // if either of these are true, sets tempError message and errorTemp is set to true so it doesn't make the api call.
    if ((this.state.minTemp === "" && this.state.maxTemp === "") || this.state.maxTemp < this.state.minTemp) {
      errorTemp = true;
      this.setState({ tempError: "Please enter valid Temperature range" });
    }

    // checks if morningTimeTwo is less than morningTimeOne.
    // if this is true, it makes an invalid commute time. So morningError message is set.
    if (this.state.morningTimeTwo < this.state.morningTimeOne) {
      errorMorning = true;
      this.setState({ morningError: "Please enter valid morning commute times" });
    }

    // checks if eveningTimeTwo is less than eveningTimeOne.
    // if this is true, it makes an invalid commute time. So eveningError message is set.
    if (this.state.eveningTimeTwo < this.state.eveningTimeOne) {
      errorEvening = true;
      this.setState({ eveningError: "Please enter valid evening commute times" });
    }

    // checks if the commute days are valid days.
    // if not, then commuteError message is set.
    if (!days.includes(this.state.dayOne.toLowerCase()) || !days.includes(this.state.dayTwo.toLowerCase())) {
      errorCommute = true;
      this.setState({ commuteError: "Please enter valid days" });
    }

    // If there are no errors, then this part will calculate the current time if not past
    // the evening commute times.
    if (!errorTemp && !errorMorning && !errorEvening && !errorCommute) {
      // creates a new date of the current time.
      const date = new Date();
      // checks if the hour is past the evening commute time range.
      // if it is past, the day is set to the next day
      // and you will receive information about the commutes for tomorrow.
      if (date.getHours() >= parseInt(this.state.eveningTimeTwo.split(":")[0], 10)) {
        date.setDate(date.getDate() + 1);
      }

      // grabs the index of each of the days.
      const indexOfDayOne = days.indexOf(this.state.dayOne.toLowerCase());
      const indexOfDayTwo = days.indexOf(this.state.dayTwo.toLowerCase());

      // will only call the weather api if current date/tomorrow is in the range of the Commute Days
      // the user has entered.
      if (date.getDay() >= indexOfDayOne && date.getDay() <= indexOfDayTwo) {
        const morningTimeOne = date.setHours(this.state.morningTimeOne.split(":")[0], this.state.morningTimeOne.split(":")[1], 0);
        const morningTimeTwo = date.setHours(this.state.morningTimeTwo.split(":")[0], this.state.morningTimeTwo.split(":")[1], 0);
        const eveningTimeOne = date.setHours(this.state.eveningTimeOne.split(":")[0], this.state.eveningTimeOne.split(":")[1], 0);
        const eveningTimeTwo = date.setHours(this.state.eveningTimeTwo.split(":")[0], this.state.eveningTimeTwo.split(":")[1], 0);
        // sets the range of times of the morning commutes and evening commutes
        // this is used to compare the hourly times of the weather to get a specific data point in the weather api.
        this.setState({
          timeOne: Math.floor(morningTimeOne / 1000),
          timeTwo: Math.floor(morningTimeTwo / 1000),
          timeThree: Math.floor(eveningTimeOne / 1000),
          timeFour: Math.floor(eveningTimeTwo / 1000),
        });

        // this is the action call, that then will make an api request to the proxy server.
        this.props.retrieveWeather();
      }
    }
  }

  // these functions change the state for each input in the application.
  onMinChange(e) {
    this.setState({ minTemp: e.target.value });
  }

  onMaxChange(e) {
    this.setState({ maxTemp: e.target.value });
  }

  onRainChange(e) {
    this.setState({ rain: e.target.value });
  }

  onMorningOneChange(e) {
    this.setState({ morningTimeOne: e.target.value });
  }

  onMorningTwoChange(e) {
    this.setState({ morningTimeTwo: e.target.value });
  }

  onEveningOneChange(e) {
    this.setState({ eveningTimeOne: e.target.value });
  }

  onEveningTwoChange(e) {
    this.setState({ eveningTimeTwo: e.target.value });
  }

  onDayOneChange(e) {
    this.setState({ dayOne: e.target.value });
  }

  onDayTwoChange(e) {
    this.setState({ dayTwo: e.target.value });
  }

  render() {
    let tempError, morningError, eveningError, commuteError, morningResult, eveningResult;
    // when the weather data is obtained it will go through this if statement.
    if (this.props.weather !== undefined) {
      // loops through the hourly data
      for (let i = 0; i < this.props.weather.hourly.data.length; i+=1) {
        const data = this.props.weather.hourly.data[i];
        // if the time of the data point is between the morning times or evening times
        // it goes through these if statements and changes the morningResult/eveningResult
        // for it to be displayed.
        if (data.time >= this.state.timeOne && data.time < this.state.timeTwo) {
          // if precipProbability is > user input rain, then they will Metro.
          // They will also Metro if the temp is less than min or greater than max.
          // else they will ride their bikes.
          if (data.precipProbability > this.state.rain || (data.temperature <= this.state.minTemp || data.temperature >= this.state.maxTemp)) {
            // This means they will Metro.
            morningResult = (
              <Result morning={true} transportation="Metro" />
            );
          } else {
            morningResult = (
              <Result morning={true} transportation="Bike" />
            );
          }
        } else if (data.time >= this.state.timeThree && data.time < this.state.timeFour) {
          // if precipProbability is > user input rain, then they will Metro.
          // They will also Metro if the temp is less than min or greater than max.
          // else they will ride their bikes.
          if (data.precipProbability > this.state.rain || (data.temperature <= this.state.minTemp || data.temperature >= this.state.maxTemp)) {
            eveningResult = (
              <Result morning={false} transportation="Metro" />
            );
          } else {
            eveningResult = (
              <Result morning={false} transportation="Bike" />
            );
          }
        }
      }
    }
    // If there is an error, it will go through this if statement
    // and render specific errors.
    if (this.state.tempError !== null || this.state.morningError !== null || this.state.eveningError !== null || this.state.commuteError !== null) {
      morningResult = null;
      eveningResult = null;
      tempError = (
        <div id="error">
          {this.state.tempError}
        </div>
      );
      morningError = (
        <div id="error">
          {this.state.morningError}
        </div>
      );
      eveningError = (
        <div id="error">
          {this.state.eveningError}
        </div>
      );
      commuteError = (
        <div id="error">
          {this.state.commuteError}
        </div>
      );
    }
    return (
      <div className="app">
        <div className="container">
          <Header />

          <div className="user-input">
            <div>
              This application will determine whether or not you should ride your Bike or Ride the Metro.
              Please provide some of your preferences on Temperature Range, Chance of Rain. You may also optionally
              enter a morning commute time range, evening commute time range, and commute days.
            </div>

            <TemperatureRange
              tempError={this.state.tempError}
              minTemp={this.state.minTemp}
              maxTemp={this.state.maxTemp}
              onMinChange={this.onMinChange}
              onMaxChange={this.onMaxChange} />

            <RainChance
              rain={this.state.rain}
              onRainChange={this.onRainChange} />

            <CommuteRange
              morningError={this.state.morningError}
              eveningError={this.state.eveningError}
              commuteError={this.state.commuteError}
              morningTimeOne={this.state.morningTimeOne}
              morningTimeTwo={this.state.morningTimeTwo}
              eveningTimeOne={this.state.eveningTimeOne}
              eveningTimeTwo={this.state.eveningTimeTwo}
              dayOne={this.state.dayOne}
              dayTwo={this.state.dayTwo}
              onMorningOneChange={this.onMorningOneChange}
              onMorningTwoChange={this.onMorningTwoChange}
              onEveningOneChange={this.onEveningOneChange}
              onEveningTwoChange={this.onEveningTwoChange}
              onDayOneChange={this.onDayOneChange}
              onDayTwoChange={this.onDayTwoChange} />

          </div>

          <button onClick={this.decideTransportation}>Decide My Transportation</button>

          <div id="errors">
            {tempError}
            {morningError}
            {eveningError}
            {commuteError}
          </div>
          <div>
            {morningResult}
            {eveningResult}
          </div>
        </div>

        <footer id="footer">
          <img src={footerImage} alt="Powered by Dark Sky" width="500px" height="110px" />
        </footer>
      </div>
    );
  }
}

// this function maps the redux state to props.
function mapStateToProps(state) {
  return { weather: state.weather.data };
}

// this connects App to the redux store. So it can use the redux state and actions.
export default connect(mapStateToProps, { retrieveWeather })(App);