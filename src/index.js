import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/index';
import Application from './views/application/index';
import { me } from './actions/auth';
import * as serviceWorker from './serviceWorker';
import './react.magic';

const defaultState = {};
const store = configureStore(defaultState);
const root = document.getElementById('root');

const access_token = localStorage.getItem('access_token');
if (access_token) store.dispatch(me());

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Application />
        </Provider>
    </BrowserRouter>,
    root
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
