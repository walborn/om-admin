import { RSAA } from 'redux-api-middleware';

export const LIST_REQUEST = '@@lesson/LIST_REQUEST';
export const LIST_SUCCESS = '@@lesson/LIST_SUCCESS';
export const LIST_FAILURE = '@@lesson/LIST_FAILURE';

export const ITEM_REQUEST = '@@lesson/ITEM_REQUEST';
export const ITEM_SUCCESS = '@@lesson/ITEM_SUCCESS';
export const ITEM_FAILURE = '@@lesson/ITEM_FAILURE';

export const CREATE_REQUEST = '@@lesson/CREATE_REQUEST';
export const CREATE_SUCCESS = '@@lesson/CREATE_SUCCESS';
export const CREATE_FAILURE = '@@lesson/CREATE_FAILURE';

export const UPDATE_REQUEST = '@@lesson/UPDATE_REQUEST';
export const UPDATE_SUCCESS = '@@lesson/UPDATE_SUCCESS';
export const UPDATE_FAILURE = '@@lesson/UPDATE_FAILURE';

export const DEL_REQUEST = '@@lesson/DEL_REQUEST';
export const DEL_SUCCESS = '@@lesson/DEL_SUCCESS';
export const DEL_FAILURE = '@@lesson/DEL_FAILURE';


export const list = options => ({
    [RSAA]: {
        endpoint: '/lessons',
        method: 'GET',
        options,
        types: [ LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE ],
    },
});

export const item = id => ({
    [RSAA]: {
        endpoint: `/lessons/${id}`,
        method: 'GET',
        types: [ ITEM_REQUEST, ITEM_SUCCESS, ITEM_FAILURE ],
    },
});

export const create = params => ({
    [RSAA]: {
        endpoint: '/lessons',
        method: 'POST',
        body: params,
        types: [ CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE ],
    },
});


export const update = params => ({
    [RSAA]: {
        endpoint: `/lessons/${params.id}`,
        method: 'PUT',
        body: params,
        types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    },
});

export const del = id => ({
    [RSAA]: {
        endpoint: `/lessons/${id}`,
        method: 'DELETE',
        types: [ DEL_REQUEST, DEL_SUCCESS, DEL_FAILURE ],
    },
});
