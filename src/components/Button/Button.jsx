import PropTypes from 'prop-types';
import style from './button.module.scss';

const Button = ({ gallery, onClick }) => {
  return (
    <>
      {gallery && (
        <div className={style.container}>
          <button className={style.button} type="button" onClick={onClick}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
