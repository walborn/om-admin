import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default class Row extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
    };

    render() {
        const { className, children, ...props } = this.props;
        return <div {...props} className={[ 'row', className ]}>{children}</div>;
    }
}
