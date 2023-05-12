import PropTypes from 'prop-types';
import style from './imageGallery.module.scss';

const ImageGallery = ({ children, onSelected }) => {
  return (
    <ul className={style.gallery} onClick={onSelected}>
      {children}
    </ul>
  );
};

ImageGallery.propTypes = {
  onSelected: PropTypes.func,
};
export default ImageGallery;
