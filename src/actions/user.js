import { RSAA } from 'redux-api-middleware';


export const LIST_REQUEST = '@@user/LIST_REQUEST';
export const LIST_SUCCESS = '@@user/LIST_SUCCESS';
export const LIST_FAILURE = '@@user/LIST_FAILURE';

export const ITEM_REQUEST = '@@user/ITEM_REQUEST';
export const ITEM_SUCCESS = '@@user/ITEM_SUCCESS';
export const ITEM_FAILURE = '@@user/ITEM_FAILURE';

export const ADD_REQUEST = '@@user/ADD_REQUEST';
export const ADD_SUCCESS = '@@user/ADD_SUCCESS';
export const ADD_FAILURE = '@@user/ADD_FAILURE';

export const DEL_REQUEST = '@@user/DEL_REQUEST';
export const DEL_SUCCESS = '@@user/DEL_SUCCESS';
export const DEL_FAILURE = '@@user/DEL_FAILURE';


export const list = params => ({
    [RSAA]: {
        endpoint: '/users',
        method: 'GET',
        types: [ LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE ],
    },
});

export const item = id => ({
    [RSAA]: {
        endpoint: `/users/${id}`,
        method: 'GET',
        types: [ ITEM_REQUEST, ITEM_SUCCESS, ITEM_FAILURE ],
    },
});

export const add = (email, password) => ({
    [RSAA]: {
        endpoint: `/users?email=${email}&password=${password}`,
        method: 'POST',
        types: [ ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE ],
    },
});

export const del = id => ({
    [RSAA]: {
        endpoint: `/users/${id}`,
        method: 'DELETE',
        types: [ DEL_REQUEST, DEL_SUCCESS, DEL_FAILURE ],
    },
});
