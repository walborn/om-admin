import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';


export default class MenuItem extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        to: PropTypes.string,
        onClick: PropTypes.func,
        children: PropTypes.node,
        active: PropTypes.bool,
    };

    render() {
        const { className, onClick, active, to, children } = this.props;

        return (
            <Link to={to} className={[ className, 'menu-item', active && 'menu-item--active' ]} onClick={onClick}>
                <div className="menu-item__container">{children}</div>
            </Link>
        );
    }
}
