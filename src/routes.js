/**
 * Created by netre on 30.05.2017.
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';

import {isLoaded as isProductsLoaded, load as loadProducts} from './redux/modules/products';

import App from "./containers/App/App";
import Modal from "./containers/Modal/Modal";

export default (store) => {
    const requireProductsLoad = (nextState, replace, cb) => {

        function checkProducts() {
            const {products: {loaded, loading}} = store.getState();
            if(!loaded && !loading) {
                replace('/');
            }
            cb();
        }

        if (!isProductsLoaded(store.getState())) {
            store.dispatch(loadProducts()).then(checkProducts);
        } else {
            checkProducts();
        }
    };

    return (
        <Route path="/" components={App} onEnter={requireProductsLoad}>
            <Route path="product/:productId" component={Modal} />
        </Route>
    )
}
