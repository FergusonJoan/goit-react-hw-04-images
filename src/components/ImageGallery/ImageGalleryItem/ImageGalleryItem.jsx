import PropTypes from 'prop-types';
import style from './imageGalleryItem.module.scss';

const ImageGalleryItem = ({ url, tags, onImgClick }) => {
  return (
    <li className={style.galleryItem}>
      <img src={url} alt={tags} onClick={onImgClick} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  tags: PropTypes.string,
  id: PropTypes.number,
};

export default ImageGalleryItem;
