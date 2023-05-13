import PropTypes from 'prop-types';
import style from './imageGallery.module.scss';

const ImageGallery = ({ children }) => {
  return <ul className={style.gallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  onSelected: PropTypes.func,
};
export default ImageGallery;
