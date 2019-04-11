import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'src/views/_blocks/index';
import { ReactComponent as RipSVG } from './rip.svg';
import './styles.scss';


export default class NotFound extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Row id="nf-page">
                <div className="nf__code">404</div>
                <div className="nf__title">Вы попали на несуществующую страницу</div>
                <div className="nf__tip">Используйте кнопку меню вверху слева для навигации
                    или перейдите на <Link to="/" >главную страницу</Link></div>
                <RipSVG className="nf__icon" />
            </Row>
        );
    }
}
