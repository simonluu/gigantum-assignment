import React, { Component } from 'react';

class CommuteRange extends Component {
  render() {
    return (
      <div>
        <h2>What is your desired commute window? (optional)</h2>
        <div className="form-group">
          <label className="app-label">Morning Commute Time:</label>
          <input id={this.props.morningError !== null} className="app-input" type="time" value={this.props.morningTimeOne} onChange={this.props.onMorningOneChange} />
          to
          <input id={this.props.morningError !== null} className="app-input" type="time" value={this.props.morningTimeTwo} onChange={this.props.onMorningTwoChange} />
        </div>

        <div className="form-group">
          <label className="app-label">Evening Commute Time:</label>
          <input id={this.props.eveningError !== null} className="app-input" type="time" value={this.props.eveningTimeOne} onChange={this.props.onEveningOneChange} />
          to
          <input id={this.props.eveningError !== null} className="app-input" type="time" value={this.props.eveningTimeTwo} onChange={this.props.onEveningTwoChange} />
        </div>

        <div className="form-group">
          <label className="app-label">Commute Days:</label>
          <input id={this.props.commuteError !== null} className="app-input" type="text" value={this.props.dayOne} onChange={this.props.onDayOneChange} />
          to
          <input id={this.props.commuteError !== null} className="app-input" type="text" value={this.props.dayTwo} onChange={this.props.onDayTwoChange} />
        </div>
      </div>
    );
  }
}

export default CommuteRange;