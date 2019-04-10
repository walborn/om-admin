import { Map } from 'immutable';
import * as constant from '../../actions/auth';

export const initialState = Map({
    me: Map(),
    status: Map({
        me: 'waiting',
        signIn: 'waiting',
        signUp: 'waiting',
    }),
});

export default (state = initialState, action) => {
    switch (action.type) {
        // ME
        case constant.ME_REQUEST:
            return state.setIn([ 'status', 'me' ], 'request');

        case constant.ME_SUCCESS:
            return state
                .setIn([ 'status', 'me' ], 'success')
                .set('me', Map(action.payload));

        case constant.ME_FAILURE:
            return state.setIn([ 'status', 'me' ], 'failure');

        // SIGN IN
        case constant.SIGNIN_REQUEST:
            return state.setIn([ 'status', 'signIn' ], 'request');

        case constant.SIGNIN_SUCCESS:
            window.localStorage.setItem('access_token', action.payload.token);
            return state
                .set('me', Map(action.payload.user))
                .setIn([ 'status', 'signIn' ], 'success');

        case constant.SIGNIN_FAILURE:
            return state.setIn([ 'status', 'signIn' ], 'failure');

        // SIGN UP
        case constant.SIGNUP_REQUEST:
            return state.setIn([ 'status', 'signUp' ], 'request');

        case constant.SIGNUP_SUCCESS:
            window.localStorage.setItem('access_token', action.payload.token);
            return state.setIn([ 'status', 'signUp' ], 'success');

        case constant.SIGNUP_FAILURE:
            return state.setIn([ 'status', 'signUp' ], 'failure');

        // SIGN OUT
        case constant.SIGNOUT:
            window.localStorage.removeItem('access_token');
            return initialState;


        default:
            return state;
    }
};
