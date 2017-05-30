/**
 * Created by netre on 30.05.2017.
 */
const LOAD = 'lightspeed/products/LOAD';
const LOAD_SUCCESS = 'lightspeed/products/LOAD_SUCCESS';
const LOAD_FAIL = 'lightspeed/products/LOAD_FAIL';

const SET_STOCK = 'lightspeed/products/SET_STOCK';

const initialState = {
    loaded: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            };
        case LOAD_SUCCESS:
            let productList = action.result.map(x => x._id);
            let productsObject = action.result.reduce((result, current) => {
                result[current._id] = {
                    ...current,
                    stock: {
                        ...current.stock,
                        initialRemaining: current.stock.remaining
                    }
                };
                return result;
            }, {});
            return {
                ...state,
                loaded: true,
                loading: false,
                productList,
                products: {
                    ...productsObject
                }
            };
        case LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };

        case SET_STOCK:
            const {productId, remaining} = action;
            return {
                ...state,
                products: {
                    ...state.products,
                    [productId]: {
                        ...state.products[productId],
                        stock: {
                            remaining: remaining,
                            initialRemaining: state.products[productId].stock.initialRemaining
                        }
                    }
                }
            };
        default:
            return state;
    }
}

export function isLoaded(globalState) {
    return globalState.products && globalState.products.loaded
}

export function load() {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.fetchProducts()
    }
}

export function setStock(productId, remaining) {
    return {
        type: SET_STOCK,
        productId,
        remaining
    }
}