import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as LoadignSVG } from './loading.svg';
import './styles.scss';


export default class Loader extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
    };

    render() {
        const { className, label, ...props } = this.props;

        return (
            <div {...props} className={[ className, 'loader' ]}>
                <div>
                    <div>
                        <LoadignSVG id="loader-circle" />
                        {label && <p children={label} />}
                    </div>
                </div>
            </div>
        );
    }
}
