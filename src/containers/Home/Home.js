/**
 * Created by netre on 30.05.2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setStock} from '../../redux/modules/products';
import {addToCart, setCartAmount} from '../../redux/modules/cart';

export const Home = connect(
    state => ({
        productList: state.products.productList,
        products: state.products.products,
        cart: {
            productList: state.cart.productList,
            productQuantity: state.cart.productQuantity
        }
    }),
    {setStock, addToCart, setCartAmount})(
    class Home extends Component {
        // eslint-disable-next-line
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

        handleClick = (productId) => {
            const {products, cart, addToCart, setStock} = this.props;
            console.log(products[productId].stock.initialRemaining);
            if (products[productId].stock.initialRemaining >= (cart.productQuantity[productId] || 0) + 1) {
                addToCart(productId);
                setStock(productId, products[productId].stock.remaining-1);
            }
        };

        handleCartClick = (productId) => {
            const {products, cart, setStock, setCartAmount} = this.props;

            if (cart.productQuantity[productId] >= 1) {
                setStock(productId, products[productId].stock.remaining + 1);
                setCartAmount(productId, cart.productQuantity[productId] - 1);
            }

        };

        render() {
            const {products, productList, cart} = this.props;
            console.log(this.props);
            return (<div>
                {productList.filter(x => products[x].stock.remaining > 0).map(x => {
                    return <div key={x} onClick={() => {
                        this.handleClick(x)
                    }}>
                        {products[x].stock.remaining}
                    </div>
                })}

                <div>
                    Cart:
                    {
                        cart.productList.map(x => {
                            return <div key={x} onClick={() => {
                                this.handleCartClick(x);
                            }}>
                                Title: {products[x].title}
                                Amount: {cart.productQuantity[x]}
                            </div>
                        })
                    }
                </div>
            </div>);
        }
    });

