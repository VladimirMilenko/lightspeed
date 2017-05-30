/**
 * Created by netre on 30.05.2017.
 */
import React from 'react';
import {Button} from "../Button/Button";

import './ProductItem.css';

export const ProductItem = (props) => {
    return <div className="product">
        <div className="product__photo">
            <img className="product__img" src={props.image}/>
        </div>
        <div className="product__info">
            <h4 className="product__title">{props.title}</h4>
            <div className="product__price">Price: {props.price}</div>
            <div className="product__price">Quantity: {props.stock.remaining}</div>
            <div className="product__actions">
                <Button type="button"><i className="fa fa-shopping-basket"/> Buy</Button>
            </div>
        </div>
    </div>
};