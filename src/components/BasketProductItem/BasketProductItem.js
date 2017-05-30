/**
 * Created by netre on 30.05.2017.
 */
import React, {PropTypes} from 'react';

import {Button} from "../Button/Button";

import './BasketProductItem.css';

export const BasketProductItem = (props) => {
    return (
        <li className="cart-list__item">
            <div className="product product_view_order">
                <div className="product__preview">
                    <img className="product__photo"
                         src={props.image}/>
                </div>
                <div className="product__info">
                    <h4 className="product__title">{props.title}</h4>
                    <span className="product__total">{props.amount} x {props.price}</span>
                    <div className="quantity quantity_type_order">
                        <Button onClick={()=>{props.deleteOne(props.productId)}} className="quantity__btn btn"><i
                            className="fa fa-minus"/></Button>
                        <input className="quantity__input input" value={props.amount} type="text"/>
                        <Button onClick={()=>{props.addOne(props.productId)}} className="quantity__btn btn"><i
                            className="fa fa-plus"/></Button>
                        <Button onClick={()=>{props.removeProduct(props.productId)}} className="quantity__btn btn" type="button"><i
                            className="fa fa-times"/></Button>
                    </div>
                </div>
            </div>
        </li>
    )
};

BasketProductItem.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    image: PropTypes.string,

    addOne: PropTypes.func,
    deleteOne: PropTypes.func,
    removeProduct: PropTypes.func,
};