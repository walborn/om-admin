import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import CloseSVG from './close.svg';
import './styles.scss';


export default class Input extends Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        placeholder: PropTypes.string,
        title: PropTypes.string,
        disabled: PropTypes.bool,
        failure: PropTypes.bool,
        readOnly: PropTypes.bool,
        cleaning: PropTypes.bool,
        onChange: PropTypes.func,
        onClear: PropTypes.func,
        onDocumentClick: PropTypes.func,
    };
    static defaultProps = {
        type: 'text',
        cleaning: true,
        onChange: () => {},
    };
    state = {
        value: this.props.value,
    };
    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        if (value !== this.props.value) this.setState({ value });
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }
    get value() {
        return this.state.value;
    }
    set value(value) {
        this.setState({ value });
    }
    handleChange = ({ value }) => {
        this.setState({ value }, () => this.props.onChange({ value, name: this.props.name }));
    };
    handleClear = (event) => {
        event.preventDefault();
        this.handleChange({ value: '' });
    };
    handleDocumentClick = (event) => {
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        const $parent = this.$input;
        const hitting = closest(event.target, el => el === $parent);
        if (hitting && typeof this.$input.focus === 'function') this.$input.focus();
    };
    render() {
        const { className, title, placeholder, readOnly, disabled, cleaning, failure, onDocumentClick, ...props } = this.props;
        const { value } = this.state;
        const cleaner = value && cleaning && !readOnly && !disabled;
        return (
            <div
                ref={(r) => { this.$input = r; }}
                className={[
                    'input',
                    className,
                    disabled && 'disabled',
                    readOnly && 'readonly',
                    failure && 'failure',
                    value && title && 'with-title',
                    cleaner && 'with-cleaner',
                ]}

            >
                <input
                    {...props}
                    ref={(r) => { this.$input = r; }}
                    value={value}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    onChange={e => this.handleChange(e.target)}
                />
                <div className="input__title">
                    {value && title}
                </div>
                {/*<CloseSVG*/}
                    {/*className="input__cleaner"*/}
                    {/*onClick={this.handleClear}*/}
                {/*/>*/}
            </div>
        );
    }
}
