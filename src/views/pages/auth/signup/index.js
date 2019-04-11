import { connect } from 'react-redux';
import * as actions from 'actions/user';
import Template from './template';

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
    // onSignUp: ({ email, password }) => dispatch(actions.signUp({ email, password })),
});


export default connect(mapStateToProps, mapDispatchToProps)(Template);

