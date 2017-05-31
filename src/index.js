import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import createStore from './redux/create';
import {DumbApi} from "./api/DumbApi";
import getRoutes from './routes';

const client = new DumbApi();
const store = createStore(hashHistory, client);
const history = syncHistoryWithStore(hashHistory, store);

const component = (
    <Router history={history}>
        {getRoutes(store)}
    </Router>
);

ReactDOM.render(<Provider store={store}>
        {component}
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
