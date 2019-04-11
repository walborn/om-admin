import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'src/actions/auth';
import Template from './template';

const mapStateToProps = ({ auth }) => ({ me: auth.get('me').toJS() });
const mapDispatchToProps = dispatch => ({
    fetchMe: () => dispatch(actions.me()),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Template));
