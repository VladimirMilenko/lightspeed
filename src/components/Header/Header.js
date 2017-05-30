/**
 * Created by netre on 30.05.2017.
 */
import React from 'react';
import {Link} from 'react-router';
import './Header.css';

export const Header = () => {
    return (
        <Link className="logo" to="/">MiMarket</Link>
    )
};