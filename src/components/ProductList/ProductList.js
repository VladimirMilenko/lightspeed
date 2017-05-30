/**
 * Created by netre on 30.05.2017.
 */
import React from 'react';
import {ProductItem} from '../ProductItem/ProductItem';

import './ProductList.css';

export const ProductList = (props) => {
    const {productList, products} = props;
    return (<div className="layout layout-3-2">
            {productList.filter(id => products[id].stock.remaining > 0).map(id => {
                const {title, price, stock, image} = products[id];
                return <div key={id} className="layout__cell">
                    <ProductItem image={image} title={title} price={price} stock={stock} />
                </div>
            })}
        </div>)
};