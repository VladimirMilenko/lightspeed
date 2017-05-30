/**
 * Created by netre on 30.05.2017.
 */
import React, {PropTypes} from 'react';
import {Button} from "../Button/Button";

import './ProductItem.css';

export const ProductItem = (props) => {
    return <div className="product product_view_catalog"  onClick={()=>{props.onProductClick(props.productId)}}>
        <div className="product__preview">
            <img className="product__photo" src={props.image} alt="Product"/>
            <Button type="button" className="btn product__btn"
                    onClick={(event) => {
                        event.stopPropagation();

                        props.onProductBuyClick(props.productId);
                    }}>
                <i className="fa fa-shopping-basket"/>Buy
            </Button>
        </div>
        <div className="product__info">
            <h4 className="product__title">{props.title}</h4>
            <div className="product__price">Price: {props.price}</div>
            <div className="product__color">Color: {props.color}</div>
            <div className="product__qnt">Quantity: {props.stock.remaining}</div>
        </div>
    </div>
};

ProductItem.propTypes = {
    title: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    stock: PropTypes.shape({
        remaining: PropTypes.number.isRequired
    }).isRequired,
    onProductBuyClick: PropTypes.func.isRequired,
    onProductClick: PropTypes.func.isRequired
};