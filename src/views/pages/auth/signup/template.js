import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default class SingUp extends Component {
    static propTypes = {
        onSignUp: PropTypes.func.isRequired,
    };
    handleSignUp = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.onSignUp({ email, password });
    };
    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });
    render() {
        return (
            <div className="page-signup">
                <form onSubmit={this.handleSignUp}>
                    <input type="text" name="email" placeholder="e-mail" onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}
