/**
 * Created by netre on 30.05.2017.
 */
import React from 'react';
import './Button.css';
export const Button = (props) => {

    function onClick(event) {
        event.target.blur();
        props.onClick && props.onClick(event);
    }

    return <button className={"btn"} {...props} onClick={onClick}>{props.children}</button>
};