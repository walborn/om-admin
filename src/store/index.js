import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from '../reducers';
import apiMiddlewareBefore from './middlewares/api';
import logger from './middlewares/logger';

const reduxTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const middleWares = [ apiMiddlewareBefore, apiMiddleware, process.env.NODE_ENV === 'development' && logger ].filter(Boolean);

export default initialState => applyMiddleware(...middleWares)(createStore)(reducers, initialState, reduxTools);
