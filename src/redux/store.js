import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const reducer =  combineReducers({
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState,/* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;