import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { ReactComponent as TimeSVG } from 'src/assets/svg/time.svg';
import './styles.scss';


const minutes = function(props, propName, componentName) {
    const value = props[propName];
    if (typeof value !== 'string') return new Error(`Invalid TYPE of prop \`${propName}\` supplied to \`${componentName}\`. Validation failed. Value is ${value} [${typeof value}]`);
    if (!/^\d+&/.test(value)) return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value is not \\d+. Value is ${value} [${typeof value}]`);
    if (+value < 0 || +value > 1680) return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value is out of range. Value is ${value} [${typeof value}]`);
};

export default class TimeInput extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        value: minutes.isRequired,
        onChange: PropTypes.func.isRequired,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    static minutes = value => (([ h, m ]) => `${h * 60 + m}`)(value);
    static timify = value => `${`0${+value / 60 | 0}`.slice(-2)}:${`0${+value % 60}`.slice(-2)}`;

    state = {
        value: TimeInput.timify(this.props.value),
    };

    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        if (value && !isEqual(this.props.value, value)) {
            this.setState({ value: TimeInput.timify(value) });
        }
    }

    parse = (value) => {
        if (typeof value !== 'string' || !value || !/^\d{0,2}:?\d{0,2}$/.test(value)) return [];
        const normalize = ([ h, m ]) => [ Math.min(+h, 23),  Math.min(+m, 59) ];

        const [ a, b ] = (x => ~x ? [ x, x + 1 ] : [ 2, 2 ])(value.indexOf(':'));
        return normalize([ value.slice(0, a), value.slice(b)]);
    };



    handleBlur = () => {
        const [ hours, minutes ] = this.parse(this.state.value);
        if (hours === undefined) return this.props.onChange({ value: '' });

        const value = `${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}`;
        this.setState({ value }, () => this.props.onChange({ value: TimeInput.minutes([ hours, minutes ]) }));
    };

    handleFocus = () => this.$input.setSelectionRange(0, 5);

    handleKeyDown = (e) => {
        if ([ 37, 39 ].includes(e.keyCode)) return;

        e.preventDefault();
        const { value } = this.state;
        let { selectionStart } = this.$input;
        const { selectionEnd } = this.$input;

        // BACKSPACE
        if (e.keyCode === 8) {
            const nextValue = selectionStart === selectionEnd && selectionStart
                ? value.slice(0, --selectionStart) + value.slice(selectionEnd) // Убираем один символ перед кареткой
                : value.slice(0, selectionStart) + value.slice(selectionEnd); // Убираем интервал символов

            console.log(nextValue);
            this.setState({ value: nextValue }, () => this.$input.setSelectionRange(selectionStart, selectionStart));
            //, () => this.props.onChange(TimeInput.minutes(this.parse(nextValue))));
            return;
        }

        if ('1234567890:'.indexOf(e.key) === -1 || (~value.indexOf(':') && e.key === ':')) return;

        const valueBegin = value.slice(0, selectionStart);
        const valueEnd = value.slice(selectionEnd + 1);
        let nextValue = `${valueBegin}${e.key}${valueEnd}`;

        if (nextValue.length >= 3 && nextValue.indexOf(':') === -1) {
            nextValue = `${nextValue.slice(0, 2)}:${nextValue.slice(2)}`;
            ++selectionStart;
        }
        this.setState({ value: nextValue.slice(0, 5) }, () => this.$input.setSelectionRange(selectionStart + 1, selectionStart + 1));
        // , () => this.props.onChange(TimeInput.minutes(this.parse(nextValue))));
    };

    render() {
        const { className, placeholder, readOnly, disabled } = this.props;
        const { value } = this.state;
        return (
            <div className={`time-input ${className}`}>
                <input
                    ref={(r) => { this.$input = r; }}
                    value={value}
                    onBlur={readOnly ? undefined : this.handleBlur}
                    onFocus={readOnly ? undefined : this.handleFocus}
                    onKeyDown={readOnly ? undefined : this.handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={5}
                />
                <TimeSVG className="time-input__icon" />
            </div>
        );
    }
}
