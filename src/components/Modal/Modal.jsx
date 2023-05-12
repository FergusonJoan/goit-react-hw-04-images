import { useEffect } from 'react';

import PropTypes from 'prop-types';
import style from './modal.module.scss';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, img }) => {
  const handleClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);
  return createPortal(
    <div className={style.overlay} onClick={handleClick}>
      <div className={style.modal}>
        <img src={img.url} alt={img.alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  img: PropTypes.object,
  closeModal: PropTypes.func,
};

export default Modal;
