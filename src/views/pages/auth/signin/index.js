import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from 'src/actions/auth';
import Template from './template';

const mapStateToProps = ({ auth }) => ({
    status: auth.getIn([ 'status', 'signIn' ]),
});

const mapDispatchToProps = dispatch => ({
    onSignIn: ({ email, password }) => dispatch(actions.signIn({ email, password })),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Template));
