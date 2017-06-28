import React, { Component } from 'react';

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

export default Result;