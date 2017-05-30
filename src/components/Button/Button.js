/**
 * Created by netre on 30.05.2017.
 */
import React from 'react';
import './Button.css';
export const Button = (props) => {
    return <button className="btn" {...props}>{props.children}</button>
};