import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'src/actions/auth';
import Template from './template';

const mapStateToProps = ({ auth }) => ({
    me: auth.get('me').toJS(),
    meStatus: auth.getIn([ 'status', 'me' ])
});

const mapDispatchToProps = dispatch => ({
    fetchMe: () => dispatch(actions.me()),
    signOut: () => dispatch(actions.signOut()),
});


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Template));
