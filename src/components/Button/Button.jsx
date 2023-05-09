import React, { Component } from "react";
import PropTypes from 'prop-types';
import style from './button.module.scss';

class Button extends Component {

    render() {

        return (
            <>
                { (this.props.gallery) && 
                (<div className={style.container}>
                    <button className={style.button} type="button" onClick={this.props.onClick}>Load more</button>
                </div>)
                }
            </>
            
        )
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
}

export default Button;