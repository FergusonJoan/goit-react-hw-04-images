import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search.trim());
    setSearch('');
  };

  return (
    <header className={style.searchbar}>
      <form onSubmit={handleSubmit} className={style.form}>
        <button type="submit" className={style.button}>
          <span className={style.buttonLabel}>Search</span>
        </button>

        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
