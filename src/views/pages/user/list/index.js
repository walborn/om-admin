import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'src/actions/user';
import Template from './template';

const mapStateToProps = ({ auth, user }) => ({
    me: auth.get('me').toJS(),
    list: user.get('list').toJS(),
    count: user.getIn([ 'count', 'list' ]),
});

const mapDispatchToProps = dispatch => ({
    fetchList: params => dispatch(actions.list(params)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Template));
