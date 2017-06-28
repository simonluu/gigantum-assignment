import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Result extends Component {
  render() {
    let info;
    if (this.props.morning) {
      info = (
        <span>in the Morning.</span>
      );
    } else {
      info = (
        <span>in the Evening.</span>
      );
    }

    return (
      <div className="info">
        You should {this.props.transportation} {info}
      </div>
    );
  }
}

Result.propTypes = {
  morning: PropTypes.bool,
  transportation: PropTypes.string,
}

export default Result;