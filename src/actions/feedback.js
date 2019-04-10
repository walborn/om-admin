import { RSAA } from 'redux-api-middleware';

export const LIST_REQUEST = '@@feedback/LIST_REQUEST';
export const LIST_SUCCESS = '@@feedback/LIST_SUCCESS';
export const LIST_FAILURE = '@@feedback/LIST_FAILURE';

export const ITEM_REQUEST = '@@feedback/ITEM_REQUEST';
export const ITEM_SUCCESS = '@@feedback/ITEM_SUCCESS';
export const ITEM_FAILURE = '@@feedback/ITEM_FAILURE';

export const CREATE_REQUEST = '@@feedback/CREATE_REQUEST';
export const CREATE_SUCCESS = '@@feedback/CREATE_SUCCESS';
export const CREATE_FAILURE = '@@feedback/CREATE_FAILURE';

export const UPDATE_REQUEST = '@@feedback/UPDATE_REQUEST';
export const UPDATE_SUCCESS = '@@feedback/UPDATE_SUCCESS';
export const UPDATE_FAILURE = '@@feedback/UPDATE_FAILURE';

export const DEL_REQUEST = '@@feedback/DEL_REQUEST';
export const DEL_SUCCESS = '@@feedback/DEL_SUCCESS';
export const DEL_FAILURE = '@@feedback/DEL_FAILURE';


export const list = params => ({
    [RSAA]: {
        endpoint: '/feedbacks',
        method: 'GET',
        types: [ LIST_REQUEST, LIST_SUCCESS, LIST_FAILURE ],
    },
});

export const item = id => ({
    [RSAA]: {
        endpoint: `/feedbacks/${id}`,
        method: 'GET',
        types: [ ITEM_REQUEST, ITEM_SUCCESS, ITEM_FAILURE ],
    },
});

export const create = params => ({
    [RSAA]: {
        endpoint: '/feedbacks',
        method: 'POST',
        body: params,
        types: [ CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE ],
    },
});


export const update = params => ({
    [RSAA]: {
        endpoint: `/feedbacks/${params.id}`,
        method: 'PUT',
        body: params,
        types: [ UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE ],
    },
});

export const del = id => ({
    [RSAA]: {
        endpoint: `/feedbacks/${id}`,
        method: 'DELETE',
        types: [ DEL_REQUEST, DEL_SUCCESS, DEL_FAILURE ],
    },
});
