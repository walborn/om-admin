import { Map, List } from 'immutable';
import * as constant from '../../actions/user';

export const initialState = Map({
    list: List(),
    item: Map(),
    status: Map({
        list: 'waiting',
        item: 'waiting',
    }),
    count: Map({
        list: null,
    }),
});

export default (state = initialState, { type, payload }) => {
    switch (type) {
        // LIST
        case constant.LIST_REQUEST:
            return state.setIn([ 'status', 'list' ], 'request');

        case constant.LIST_SUCCESS:
            return state.set('list', List(payload))
                .setIn([ 'count', 'list' ], payload.count)
                .setIn([ 'status', 'list' ], 'success');

        case constant.LIST_FAILURE:
            return state.setIn([ 'status', 'list' ], 'failure');

        // ITEM
        case constant.ITEM_REQUEST:
            return state.setIn([ 'status', 'item' ], 'request');

        case constant.ITEM_SUCCESS:
            return state
                .set('item', Map(payload))
                .setIn([ 'status', 'item' ], 'success');

        case constant.ITEM_FAILURE:
            return state.setIn([ 'status', 'item' ], 'failure');


        default:
            return state;
    }
};
