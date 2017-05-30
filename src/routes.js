/**
 * Created by netre on 30.05.2017.
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';

import {isLoaded as isProductsLoaded, load as loadProducts} from './redux/modules/products';

import App from "./containers/App/App";
import {Home} from "./containers/Home/Home";

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
        <Route path="/" component={App} onEnter={requireProductsLoad}>
            <IndexRoute component={Home}/>
        </Route>
    )
}
