/**
 * Created by netre on 30.05.2017.
 */
import React, {Component, PropTypes} from 'react';

import {ProductItem} from '../ProductItem/ProductItem';

import './ProductList.css';

export class ProductList extends Component{
    static propTypes = {
        productList: PropTypes.arrayOf(PropTypes.string),
        products: PropTypes.object,
        onProductBuyClick: PropTypes.func,
        onProductClick: PropTypes.func
    };

    productBuyHandler = (productId) => {

          this.props.onProductBuyClick && this.props.onProductBuyClick(productId);
    };

    productClickHandler = (productId) => {
        this.props.onProductClick && this.props.onProductClick(productId);
    };

    render() {
        const {productList, products} = this.props;

        return (
            <div className="layout layout-3-2">
                {productList.filter(id => products[id].stock.remaining > 0).map(id => {
                    const {title, price, stock, image, color} = products[id];
                    return <div key={id} className="layout__cell">
                        <ProductItem
                            onProductBuyClick={this.productBuyHandler}
                            onProductClick={this.productClickHandler}

                            productId={id}
                            image={image}
                            title={title}
                            color={color}
                            price={price}
                            stock={stock} />
                    </div>
                })}
            </div>
        )

    }
}
