import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommuteRange extends Component {
  render() {
    return (
      <div>
        <h2>What is your desired commute window? (optional)</h2>
        <div className="form-group">
          <label className="app-label">Morning Commute Time:</label>
          <input className={`app-input ${this.props.morningError !== null}`} type="time" value={this.props.morningTimeOne} onChange={this.props.onMorningOneChange} />
          to
          <input className={`app-input ${this.props.morningError !== null}`} type="time" value={this.props.morningTimeTwo} onChange={this.props.onMorningTwoChange} />
        </div>

        <div className="form-group">
          <label className="app-label">Evening Commute Time:</label>
          <input className={`app-input ${this.props.eveningError !== null}`} type="time" value={this.props.eveningTimeOne} onChange={this.props.onEveningOneChange} />
          to
          <input className={`app-input ${this.props.eveningError !== null}`} type="time" value={this.props.eveningTimeTwo} onChange={this.props.onEveningTwoChange} />
        </div>

        <div className="form-group">
          <label className="app-label">Commute Days:</label>
          <input className={`app-input ${this.props.commuteError !== null}`} type="text" value={this.props.dayOne} onChange={this.props.onDayOneChange} />
          to
          <input className={`app-input ${this.props.commuteError !== null}`} type="text" value={this.props.dayTwo} onChange={this.props.onDayTwoChange} />
        </div>
      </div>
    );
  }
}

CommuteRange.propTypes = {
  morningError: PropTypes.string,
  eveningError: PropTypes.string,
  commuteError: PropTypes.string,
  morningTimeOne: PropTypes.string,
  morningTimeTwo: PropTypes.string,
  eveningTimeOne: PropTypes.string,
  eveningTimeTwo: PropTypes.string,
  dayOne: PropTypes.string,
  dayTwo: PropTypes.string,
  onMorningOneChange: PropTypes.func,
  onMorningTwoChange: PropTypes.func,
  onEveningOneChange: PropTypes.func,
  onEveningTwoChange: PropTypes.func,
  onDayOneChange: PropTypes.func,
  onDayTwoChange: PropTypes.func,
};

export default CommuteRange;