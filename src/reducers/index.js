import { combineReducers } from 'redux';
import user from './user/index';
import auth from './auth/index';
import event from './event/index';
import lesson from './lesson/index';
import feedback from './feedback/index';

export default combineReducers({
    user,
    auth,
    event,
    lesson,
    feedback,
});
