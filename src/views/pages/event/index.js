import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'src/actions/event';
import Template from './template';

const mapStateToProps = ({ auth, event }) => ({
    me: auth.get('me').toJS(),
    list: event.get('list').toJS(),
});

const mapDispatchToProps = dispatch => ({
    fetchList: params => dispatch(actions.list(params)),
    createItem: params => dispatch(actions.create(params)),
    updateItem: params => dispatch(actions.update(params)),
    deleteItem: id => dispatch(actions.del(id)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Template));
