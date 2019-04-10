import { RSAA } from 'redux-api-middleware';

export const LIST_REQUEST = '@@event/LIST_REQUEST';
export const LIST_SUCCESS = '@@event/LIST_SUCCESS';
export const LIST_FAILURE = '@@event/LIST_FAILURE';

export const ITEM_REQUEST = '@@event/ITEM_REQUEST';
export const ITEM_SUCCESS = '@@event/ITEM_SUCCESS';
export const ITEM_FAILURE = '@@event/ITEM_FAILURE';

export const CREATE_REQUEST = '@@event/CREATE_REQUEST';
export const CREATE_SUCCESS = '@@event/CREATE_SUCCESS';
export const CREATE_FAILURE = '@@event/CREATE_FAILURE';

export const UPDATE_REQUEST = '@@event/UPDATE_REQUEST';
export const UPDATE_SUCCESS = '@@event/UPDATE_SUCCESS';
export const UPDATE_FAILURE = '@@event/UPDATE_FAILURE';

export const DEL_REQUEST = '@@event/DEL_REQUEST';
export const DEL_SUCCESS = '@@event/DEL_SUCCESS';
export const DEL_FAILURE = '@@event/DEL_FAILURE';


export const list = params => ({
    [RSAA]: {
        endpoint: '/events',
        method: 'GET',
        types: [ LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE ],
    },
});

export const item = id => ({
    [RSAA]: {
        endpoint: `/events/${id}`,
        method: 'GET',
        types: [ ITEM_REQUEST, ITEM_SUCCESS, ITEM_FAILURE ],
    },
});

export const create = params => ({
    [RSAA]: {
        endpoint: '/events',
        method: 'POST',
        body: params,
        types: [ CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE ],
    },
});


export const update = params => ({
    [RSAA]: {
        endpoint: `/events/${params.id}`,
        method: 'PUT',
        body: params,
        types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    },
});

export const del = id => ({
    [RSAA]: {
        endpoint: `/events/${id}`,
        method: 'DELETE',
        types: [ DEL_REQUEST, DEL_SUCCESS, DEL_FAILURE ],
    },
});
