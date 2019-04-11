import React  from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Loader } from 'src/views/_blocks/index';
import './styles.scss';

export default class SingIn extends React.Component {
    static propTypes = {
        onSignIn: PropTypes.func.isRequired,
        history: PropTypes.shape({ replace: PropTypes.func }),
        status: PropTypes.oneOf([ 'request', 'success', 'failure' ]),
    };

    state = {
        status: this.props.status,
    };

    componentWillReceiveProps(nextProps) {
        const { status } = nextProps;
        if (status !== this.props.status) this.setState({ status });
    }

    handleSignIn = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.onSignIn({ email, password }).then(({ error }) => !error && this.props.history.replace('/user/me'));
    };

    handleChange = ({ value, name }) => this.setState({ [name]: value, status: 'waiting' });

    render() {
        const { status, password, email } = this.state;
        return (
            <div className="page-signin">
                <Loader hidden={status !== 'request'}/>
                <form onSubmit={this.handleSignIn}>
                    <Input type="text" name="email" title="E-mail" placeholder="E-mail" onChange={this.handleChange} />
                    <Input type="password" name="password" title="Пароль" placeholder="Пароль" onChange={this.handleChange} />
                    {status === 'failure' && <p className="error">E-mail или пароль введены неверно!<br />Попробуйте ввести заново!</p>}
                    <Button type="submit" name="submit" disabled={!password || !email} green>Войти</Button>
                </form>
            </div>
        );
    }
}
