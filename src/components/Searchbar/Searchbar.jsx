import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './searchbar.module.scss';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.search.trim());
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>Search</span>
          </button>

          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
