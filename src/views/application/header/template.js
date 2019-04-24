import React from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import { Row, Loader } from 'src/views/_blocks';
import './styles.scss';
import {Link} from 'react-router-dom';


export default class Header extends React.Component {
    static propTypes = {
        me: PropTypes.shape({ id: PropTypes.string }),
        meStatus: PropTypes.string,
        signOut: PropTypes.func,
        location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
        // history: PropTypes.shape({ push: PropTypes.func }).isRequired,
        // fetchMe: PropTypes.func,
    };

    state = {
        open: false,
        active: this.props.location.pathname.slice(1).split('/', 2).join('/'),
    };

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        const active = location.pathname.slice(1).split('/', 2).join('/');
        if (active !== this.state.active) {
            this.setState({ active });
        }
    }

    handleToggleMenu = (open) => this.setState({ open });


    render() {
        const { me, meStatus, signOut } = this.props;
        const { active } = this.state;

        const menu = [
            { key: 'lesson', to: '/lesson', name: 'Lesson' },
            { key: 'feedback', to: '/feedback', name: 'Feedbacks' },
            { key: 'signin', to: '/auth/signin', name: 'Sign In', hidden: me.id },
            { key: 'signout', to: '/auth/signin', name: 'Sign Out', onClick: signOut, hidden: !me.id },
        ];
        return (
            <Headroom id="header">
                {/*<Loader hidden={meStatus !== 'request'}/>*/}
                <div className="menu">
                    {
                        menu.filter(i => !i.hidden).map(i => (
                            <div key={i.key} className={[ 'menu__item', `menu__item--${i.key}`, active === i.key && 'menu__item--active' ]}>
                                <Link
                                    to={i.to}
                                    onClick={typeof i.onClick === 'function' ? i.onClick : () => {}}
                                    children={i.name}
                                />
                            </div>
                        ))
                    }
                </div>
                {/*{ me.id && <li key="users" className="header__item"><MenuItem to="/user/list" active={active === 'user/list'}>Пользователи</MenuItem></li>}*/}
                {/*{ me.id && <li key="profile" className="header__item header__item--user"><MenuItem to="/user/me" active={active === 'user/me'}>Профиль</MenuItem></li>}*/}
                {/*{ me.id && <li key="signout" className="header__item header__item--auth"><MenuItem to="/auth/signin" onClick={signOut}>Выход</MenuItem></li>}*/}
                {/*{ !me.id && <li key="signin" className="header__item header__item--auth"><MenuItem to="/auth/signin" active={active === 'auth/signin'}>Войти</MenuItem></li>}*/}

            </Headroom>
        );
    }
}
