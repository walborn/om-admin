import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';

const toJS = i => (Iterable.isIterable(i) ? i.toJS() : i);

export default createLogger({
    stateTransformer: state =>
        Object.keys(state).reduce((res, i) => ({ ...res, [i]: toJS(state[i]) }), {}),
    // titleFormatter: (action, time, took) => `action @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`,
    collapsed: true,
});
