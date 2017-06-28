import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorComponent extends Component {
  render() {
    return (
      <div className="error">
        {this.props.error}
      </div>
    );
  }
}

ErrorComponent.propTypes = {
  error: PropTypes.string,
}

export default ErrorComponent;