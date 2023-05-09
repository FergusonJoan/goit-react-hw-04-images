import React, { Component } from "react";
import PropTypes from 'prop-types';
import style from './imageGallery.module.scss';

class ImageGallery extends Component {

    render() {
        const {children} = this.props;

        return (
            <ul className={style.gallery} onClick={this.props.onSelected} >
                { children }
            </ul>
        );
    }
}

ImageGallery.propTypes = {
    onSelected: PropTypes.func,
}
export default ImageGallery;