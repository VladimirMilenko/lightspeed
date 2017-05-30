/**
 * Created by netre on 30.05.2017.
 */

import {createStore as _createStore, applyMiddleware} from 'redux';
import createMiddleware from './middleware/asyncClientMiddleware';
import thunk from 'redux-thunk';
import {routerMiddleware} from "react-router-redux";

export default function createStore(history, client, data) {
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];
    let finalCreateStore = applyMiddleware(...middleware)(_createStore);

    const reducer = require('./modules/reducer').default;

    return finalCreateStore(reducer, data);
}