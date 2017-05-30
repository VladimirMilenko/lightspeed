/**
 * Created by netre on 30.05.2017.
 */
import React, {Component} from 'react';

import './Modal.css';
import {connect} from "react-redux";
import {push} from 'react-router-redux';

import {addToCart, setCartAmount} from '../../redux/modules/cart';
import {setStock} from '../../redux/modules/products';

export class Modal extends Component {
    handleClickClose = () => {
        this.props.push('/');
    };

    handleBgClose = (event) => {
        if (event.target === this.$modalBody) {
            this.props.push('/');
        }
    };

    handleBuyClick = (event) => {
        const {products, cart, addToCart, setStock, setCartAmount} = this.props;
        const productId = this.props.params.productId;

        let amount = parseInt(this.$qnt.value);
        if (amount < 0) {
            alert('Graces! You have found an easter egg!');
        } else {
            if (products[productId].stock.initialRemaining >= (cart.productQuantity[productId] || 0) + amount) {
                addToCart(productId);
                setCartAmount(productId,(cart.productQuantity[productId] || 0) + amount);
                setStock(productId, products[productId].stock.remaining - amount);
            }
        }

        this.$qnt.value = 0;
    };

    handleAddClick = ()=> {
          this.$qnt.value = parseInt(this.$qnt.value) +1;
    };
    handleDelClick = ()=> {
        this.$qnt.value = (parseInt(this.$qnt.value) - 1) || 0;

    };
    render() {
        const {products} = this.props,
            productId = this.props.params.productId,
            product = products[productId];
        return (
            <div onClick={this.handleBgClose} className="modal" ref={body => this.$modalBody = body}>
                <div className="modal__body">
                    <div className="modal__close" onClick={this.handleClickClose}><i className="fa fa-times-circle-o"/>
                    </div>
                    <div className="product product_view_detail">
                        <div className="product__preview">
                            <img className="product__photo"
                                 src={product.image}/>
                        </div>
                        <div className="product__info">
                            <h4 className="product__title">{product.title}</h4>
                            <div className="product__description">{product.description}
                            </div>
                            <div className="product__price">Price: {product.price}</div>
                            <div className="product__color">Color: {product.color}</div>
                            <div className="product__qnt">Quantity: {product.stock.remaining}</div>
                            <div className="product__actions">
                                <div className="quantity">
                                    <button onClick={this.handleDelClick} className="quantity__btn btn"><i className="fa fa-minus"/></button>
                                    <input ref={input => this.$qnt = input} className="quantity__input input"
                                           defaultValue={0} type="text"/>
                                    <button onClick={this.handleAddClick} className="quantity__btn btn"><i className="fa fa-plus"/></button>
                                </div>
                                <button className="btn" type="button" onClick={this.handleBuyClick}><i
                                    className="fa fa-shopping-basket"/>Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
        products: state.products.products,
        cart: state.cart
    }),
    {
        setCartAmount, addToCart, setStock, push
    })(Modal);
