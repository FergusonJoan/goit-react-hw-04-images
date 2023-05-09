import style from './errorMessage.module.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class ErrorMessage extends Component {
  render() {
    return (
      <div className={style.errorMessage}>
        <p>{this.props.message}</p>
        toast.error('{this.props.message}')
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
