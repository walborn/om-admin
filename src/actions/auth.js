import { RSAA } from 'redux-api-middleware';

export const ME_REQUEST = '@@auth/ME_REQUEST';
export const ME_SUCCESS = '@@auth/ME_SUCCESS';
export const ME_FAILURE = '@@auth/ME_FAILURE';

export const SIGNIN_REQUEST = '@@auth/SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = '@@auth/SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = '@@auth/SIGNIN_FAILURE';

export const SIGNUP_REQUEST = '@@auth/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = '@@auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = '@@auth/SIGNUP_FAILURE';

export const SIGNOUT = '@@auth/SIGNOUT';


export const me = () => ({
    [RSAA]: {
        endpoint: '/users/me',
        method: 'GET',
        types: [ ME_REQUEST, ME_SUCCESS, ME_FAILURE ],
    },
});

export const signIn = ({ email, password }) => ({
    [RSAA]: {
        endpoint: '/auth',
        method: 'POST',
        body: { access_token: process.env.REACT_APP_MASTER_KEY },
        headers: { Authorization: `Basic ${btoa(`${email}:${password}`)}` },
        types: [ SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE ],
    },
});

export const signUp = body => ({
    [RSAA]: {
        endpoint: '/user/register',
        method: 'POST',
        types: [ SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE ],
        body,
    },
});

export const signOut = () => ({
    type: SIGNOUT,
});
