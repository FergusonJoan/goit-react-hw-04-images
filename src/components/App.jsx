import { useState, useEffect } from 'react';
import galleryApi from '../services/gallery-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ErrorMessage from './ErrorMessage/ErrorMessage';

export const App = () => {
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [gallery, setGallery] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!search) {
      return;
    }

    const handleAPI = page => {
      setStatus('pending');

      galleryApi
        .fetchGallery(page, search)
        .then(data => {
          if (data.total === 0) {
            setStatus('rejected');
            setMessage('Nothing found for your request :(');
            return;
          }
          setGallery(prevState => [...prevState, ...data.hits]);
          setStatus('resolved');
          setShowBtn(page < Math.ceil(data.total / 12));
        })
        .catch(() => {
          setStatus('rejected');
          setMessage('Ooops... something went wrong :(');
        });
    };

    handleAPI(page);
  }, [search, page]);

  const onSubmitForm = state => {
    if (!state) {
      setStatus('rejected');
      setMessage('string must not be empty');
      return;
    }
    setSearch(state);
    setGallery([]);
    setPage(1);
    setShowBtn(false);
  };

  const closeModal = () => {
    setSelected(null);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitForm} />

      {gallery.length > 0 && (
        <ImageGallery>
          {gallery !== null &&
            gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                id={id}
                onImgClick={() =>
                  setSelected({ url: largeImageURL, alt: tags })
                }
              />
            ))}
        </ImageGallery>
      )}

      {status === 'resolved' && showBtn && (
        <Button gallery={gallery} onClick={handleLoadMore} />
      )}
      {status === 'rejected' && <ErrorMessage message={message} />}
      {status === 'pending' && <Loader />}

      {selected && <Modal img={selected} closeModal={closeModal} />}
    </>
  );
};
