# Lightspeed Market

Live demo is available at:
https://vladimirmilenko.github.io/lightspeed/

## Used techs

1. React(react, react-router v2, hashHistory for github.io urls support)
2. Redux(with redux-thunk, react-redux-router)
3. Axios(fetching data)

## Decisions

1. Products are stored in a flatten structure, so, that products array contains only id's and ```products``` map contains mapping ```id -> product```
2. Cart reducer is separated into two reducers, one is responsible for cart product array and second one for product count.

## Browser support
 
Actual support starts with flexbox, so, basically IE11 and higher.
Also, there is a responsive design.

### Warnings

In development mode you will see PropTypes warnings from react-dev-tools, due to version of React 0.14.8, which uses PropTypes from react package.

### CSS

The CSS is based on BEM methodology, but due to some reusable classes there might be some duplications of code.
