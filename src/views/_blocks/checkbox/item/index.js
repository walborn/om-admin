import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as IconOk } from './ok.svg';
import './styles.scss';


export default class CheckBoxItem extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        value: PropTypes.bool,
        readonly: PropTypes.bool,
        onClick: PropTypes.func,
        type: PropTypes.oneOf([ 'check', 'radio' ]),
    };

    static defaultProps = {
        type: 'check',
        value: false,
        readonly: false,
    };

    render() {
        const { className, type, children, readonly, value, onClick } = this.props;
        return (
            <fieldset
                className={[ 'checkbox-item', className, readonly && 'checkbox-item__readonly' ]}
                onClick={onClick}
            >
                <div className={[ `checkbox-item__${type}`, value && 'checkbox-item__selected' ]}>
                    <IconOk />
                </div>
                <span className="checkbox-item__children">{children}</span>
            </fieldset>
        );
    }
}
