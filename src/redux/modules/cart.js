/**
 * Created by netre on 30.05.2017.
 */
export const ADD_TO_CART = 'lightspeed/cart/ADD_TO_CART';
export const SET_AMOUNT = 'lightspeed/cart/SET_AMOUNT';
export const CHECKOUT = 'lightspeed/cart/CHECKOUT';

const initialState = {
    productList: [],
    productQuantity: {}
};

const productListReducer = (state = initialState.productList, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.indexOf(action.productId) === -1) {
                return [...state, action.productId];
            }
            return state;
        case SET_AMOUNT:
            if (action.amount <= 0) {
                state.splice(state.indexOf(action.productId), 1);
                return [...state];
            }
            return state;
        case CHECKOUT:
            return initialState.productList;
        default:
            return state;
    }
};

const productQuantityReducer = (state = initialState.productQuantity, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                [action.productId]: (state[action.productId] || 0) + 1
            };
        case SET_AMOUNT:
            if (action.amount <= 0) {
                delete state[action.productId];

                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    [action.productId]: action.amount
                }
            }
        case CHECKOUT:
            return initialState.productQuantity;
        default:
            return state;
    }
};


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        default:
            return {
                productList: productListReducer(state.productList, action),
                productQuantity: productQuantityReducer(state.productQuantity, action)
            };
    }
}

export function addToCart(productId) {
    return {
        type: ADD_TO_CART,
        productId
    }
}

export function setCartAmount(productId, amount) {
    return {
        type: SET_AMOUNT,
        productId,
        amount
    }
}

export function checkout() {
    return {
        type: CHECKOUT
    }
}