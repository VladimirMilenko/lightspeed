/**
 * Created by netre on 30.05.2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";

import './Basket.css';
import {Button} from "../../components/Button/Button";
import {BasketProductItem} from "../../components/BasketProductItem/BasketProductItem";
import {addToCart, setCartAmount, checkout} from '../../redux/modules/cart';
import {setStock} from '../../redux/modules/products';

class Basket extends Component {
    static propTypes = {
        cart: PropTypes.shape({
            productList: PropTypes.arrayOf(PropTypes.string),
            productQuantity: PropTypes.object
        }),
        products: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            opened: false
        }
    }

    handleProductAddOne = (productId) => {
        const {products, cart, addToCart, setStock} = this.props;
        if (products[productId].stock.initialRemaining >= (cart.productQuantity[productId] || 0) + 1) {
            addToCart(productId);
            setStock(productId, products[productId].stock.remaining - 1);
        }
    };

    handleProductDeleteOne = (productId) => {
        const {products, cart, setCartAmount, setStock} = this.props;
        if (cart.productQuantity[productId] > 0) {
            setCartAmount(productId, cart.productQuantity[productId] - 1);
            setStock(productId, products[productId].stock.remaining + 1);
        }
    };

    handleProductRemove = (productId) => {
        const {products, cart, setCartAmount, setStock} = this.props;
        if (cart.productQuantity[productId] > 0) {
            setStock(productId, products[productId].stock.remaining + cart.productQuantity[productId]);
            setCartAmount(productId, 0);
        }
    };

    handleCheckout = () => {
        const {checkout} = this.props;
        checkout();
    };


    render() {
        const {cart, products} = this.props;
        let summ = 0,
            amount = 0;
        for (let product of cart.productList) {
            summ += parseFloat(products[product].price.substr(1).replace(',', '')) * cart.productQuantity[product];
            amount += cart.productQuantity[product];
        }
        if (this.state.opened) {
            return (
                <div className="shopping-cart shopping-cart_state_opened">
                    <button className="shopping-cart__switcher"
                            onClick={() => {
                                this.setState({opened: false});
                            }}>
                        <i className="fa fa-shopping-basket shopping-cart__icon"/>
                        <span className="shopping-cart__title">CART</span>
                        <span className="shopping-cart__summary">{amount} / ${summ.toFixed(2)}</span>
                    </button>
                    <div className="shopping-cart__content">
                        <ul className="cart-list">
                            {
                                cart.productList.map(productId => {
                                    let product = products[productId];
                                    return <BasketProductItem key={productId} amount={cart.productQuantity[productId]}
                                                              title={product.title} image={product.image}
                                                              price={product.price}
                                                              productId={productId}
                                                              addOne={this.handleProductAddOne}
                                                              deleteOne={this.handleProductDeleteOne}
                                                              removeProduct={this.handleProductRemove}
                                    />
                                })
                            }

                        </ul>
                        <div className="shopping-cart__total">
                            <span className="shopping-cart__summ">Total: ${summ.toFixed(2)}</span>
                            <Button onClick={()=>{this.handleCheckout()}} className="shopping-cart__btn btn">Check
                                OUT</Button>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="shopping-cart">
                <button className="shopping-cart__switcher" onClick={() => {
                    this.setState({opened: true})
                }}>
                    <i className="fa fa-shopping-basket shopping-cart__icon"/>
                    <span className="shopping-cart__title">CART</span>
                    <span className="shopping-cart__summary">{amount} / ${summ.toFixed(2)}</span>
                </button>
            </div>
        )

    }
}

export default connect(state => ({
    cart: state.cart,
    products: state.products.products
}), {setStock, addToCart, setCartAmount, checkout})(Basket);