import React, { Component } from "react";
import PropTypes from 'prop-types';
import style from './modal.module.scss';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        const { closeModal } = this.props;

        if (e.code === 'Escape') {
            closeModal();
        }
    }

    handleClick = (e) => {
        const { closeModal } = this.props;

        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

    render() {
        return createPortal((
            <div className={style.overlay} onClick={this.handleClick}>
                <div className={style.modal}>
                    <img src={this.props.img.url} alt={this.props.img.alt} />
                </div>
            </div>
        ), modalRoot)
    }
}

Modal.propTypes = {
    img: PropTypes.object,
    closeModal: PropTypes.func,
}

export default Modal;