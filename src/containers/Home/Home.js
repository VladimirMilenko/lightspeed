/**
 * Created by netre on 30.05.2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {setStock} from '../../redux/modules/products';
import {addToCart, setCartAmount} from '../../redux/modules/cart';
import {Button} from "../../components/Button/Button";
import {ProductList} from "../../components/ProductList/ProductList";

import './Home.css';

export const Home = connect(
    state => ({
        productList: state.products.productList,
        products: state.products.products,
        cart: {
            productList: state.cart.productList,
            productQuantity: state.cart.productQuantity
        }
    }),
    {setStock, addToCart, setCartAmount, push})(
    class Home extends Component {
        static propTypes = {
            productList: PropTypes.arrayOf(PropTypes.string),
            products: PropTypes.object,
            cart: PropTypes.shape({
                productList: PropTypes.arrayOf(PropTypes.string),
                productQuantity: PropTypes.object
            }),
            setStock: PropTypes.func,
            addToCart: PropTypes.func,
            setCartAmount: PropTypes.func
        };

        handleBuyClick = (productId) => {
            const {products, cart, addToCart, setStock} = this.props;
            if (products[productId].stock.initialRemaining >= (cart.productQuantity[productId] || 0) + 1) {
                addToCart(productId);
                setStock(productId, products[productId].stock.remaining - 1);
            }
        };

        handleCartClick = (productId) => {
            this.props.push('/product/' + productId);
        };

        render() {
            const {products, productList, cart} = this.props;
            return (<div className="content">
                <h1 className="title">Products' catalog</h1>

                <section className="catalog">
                    <header className="catalog__header">
                        <div className="catalog__info">
                            {productList.length} items were found
                        </div>
                    </header>

                    <div className="catalog__content">
                        <ProductList
                            onProductBuyClick={this.handleBuyClick}
                            onProductClick={this.handleCartClick}
                            productList={productList}
                            products={products}/>
                    </div>

                </section>
            </div>);
        }
    });

