import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RainChance extends Component {
  render() {
    return (
      <div>
        <h2>Maximum chance of rain you are willing to bike during your commute</h2>
        <div className="form-group">
          <label className="app-label">Chance of Rain (in Decimals):</label>
          <input className={`app-input ${this.props.rainError !== null}`} type="number" value={this.props.rain} min="0" max="1" step=".1" onChange={this.props.onRainChange} />
        </div>
      </div>
    );
  }
}

RainChance.propTypes = {
  rainError: PropTypes.string,
  rain: PropTypes.number,
  onRainChange: PropTypes.func,
}

export default RainChance;