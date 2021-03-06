import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TemperatureRange extends Component {
  render() {
    return (
      <div>
        <h2>Minimum/Maximum Temperatures you are willing to bike during your commute</h2>
        <div className="form-group">
          <label className="app-label">Temperature Range (in Fahrenheit):</label>
          <input className={`app-input ${this.props.tempError !== null}`} value={this.props.minTemp} type="number" placeholder="Min temperature" onChange={this.props.onMinChange} />
          to
          <input className={`app-input ${this.props.tempError !== null}`} value={this.props.maxTemp} type="number" placeholder="Max temperature" onChange={this.props.onMaxChange} />
        </div>
      </div>
    );
  }
}

TemperatureRange.propTypes = {
  tempError: PropTypes.string,
  minTemp: PropTypes.number,
  maxTemp: PropTypes.number,
  onMinChange: PropTypes.func,
  onMaxChange: PropTypes.func,
}

export default TemperatureRange;