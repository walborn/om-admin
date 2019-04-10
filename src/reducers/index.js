import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import event from './event';
import feedback from './feedback';

export default combineReducers({
    user,
    auth,
    event,
    feedback,
});
