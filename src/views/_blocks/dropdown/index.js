import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import isEqual from 'lodash.isequal';
import { ReactComponent as CloseSVG } from './close.svg';
import './styles.scss';


export default class DropDown extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, children: PropTypes.any })),
        hidden: PropTypes.arrayOf(PropTypes.string),
        selected: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        cleaning: PropTypes.bool,
        onChange: PropTypes.func,
        onOpen: PropTypes.func,
    };

    static defaultProps = {
        list: [],
        hidden: [],
        cleaning: false,
    };

    state = {
        open: false,
        list: this.props.list,
        selected: this.props.selected,
        position: null,
    };

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { selected, list } = nextProps;
        const newState = {};
        if (selected !== this.props.selected) newState.selected = selected;
        if (!isEqual(list, this.props.list)) newState.list = list;
        if (Object.keys(newState).length) this.setState(newState);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    get value() {
        return this.state.selected;
    }

    $items = {};

    handleDocumentClick = (e) => {
        if (this.props.disabled && !this.state.open) return null;
        const closest = (el, fn) => el && (fn(el) ? el : closest(el.parentNode, fn));
        const $parent = findDOMNode(this);
        const open = closest(e.target, el => el === $parent);
        return !open && this.setState({ open });
    };

    handleChange = (search = '', list = this.props.list) => {
        const re = new RegExp(search, 'i');
        const filtered = list.filter(item => re.test(item.value));
        this.setState({ list: filtered, open: true });
    };

    handleItemClick = ({ key, readOnly }, position = null) => {
        if (typeof key === 'undefined' || readOnly) return null;
        this.setState({ selected: key, position, open: false });
        return this.props.onChange({ key, value: this.props.list.find(i => i.key === key) });
    };

    handleMouseOver = position => this.state.position === null && this.setState({ position });

    handleKeyDown = (e) => {
        const { list, selected } = this.state;
        let { position } = this.state;
        const len = list.length;
        this.$input.focus();
        if (position === null && typeof selected !== 'undefined') {
            position = list.findIndex(item => item.key === selected);
        }

        const scroll = (pos) => {
            const parent = this.$list.getBoundingClientRect();
            const element = this.$items[pos].getBoundingClientRect();
            if (parent.bottom < element.bottom) return this.$list.scrollBy(0, element.bottom - parent.bottom);
            if (parent.top > element.top) return this.$list.scrollBy(0, element.top - parent.top);
        };
        switch (e.key) {
            case 'ArrowUp': position = (position === null) ? len - 1 : (position + len - 1) % len; scroll(position); e.preventDefault(); break;
            case 'ArrowDown': position = (position === null) ? 0 : (position + 1) % len; scroll(position); e.preventDefault(); break;
            case 'Tab': return this.handleToggle(false);
            case 'Enter': if (position !== null) this.handleItemClick(list[position], true); break;
            case 'Escape': this.handleToggle(false); return this.$input.blur();
            default: return null;
        }
        return this.setState({ position });
    };

    handleToggle = (open = !this.state.open) => {
        const { onOpen, disabled } = this.props;
        if (disabled) return;
        this.setState({ open }, () => open && typeof onOpen === 'function' && onOpen());
    };

    render() {
        const { className, hidden, disabled, cleaning, placeholder } = this.props;
        const { open, list, selected, position } = this.state;

        const value = selected && this.props.list.find(i => i.key === selected);

        return (
            <div
                className={[ className, 'dropdown', disabled && 'dropdown--disabled', open && 'dropdown--open' ]}
                onKeyDown={this.handleKeyDown}
            >
                <div className="dropdown__panel" onClick={() => this.handleToggle(true)}>
                    <div className="panel__selected">
                        { value && value.children || <span className="panel__placeholder">{placeholder}</span> }
                    </div>
                    <span
                        className={[ 'panel__caret', `panel__caret--${open ? 'top' : 'bottom'}` ]}
                        onClick={() => this.handleToggle()}
                    />
                    <span
                        className={[ 'panel__cleaner', (!value || !cleaning || disabled) && 'hidden' ]}
                        onClick={() => this.handleItemClick({ key: null })}
                    >
                        <CloseSVG />
                    </span>
                </div>

                <ul className="dropdown__list" ref={(r) => { this.$list = r; }}>
                    {
                        list.filter(i => !hidden.includes(i.key)).map((i, index) => (
                            <li
                                key={i.key}
                                ref={(r) => { this.$items[index] = r; }}
                                className={[
                                    'dropdown__item',
                                    i.readOnly && 'dropdown__item--disabled',
                                    i.key === selected && 'dropdown__item--selected',
                                    position === index && 'dropdown__item--position',
                                ]}
                                onClick={() => this.handleItemClick(i, index)}
                                children={i.children}
                                onMouseOver={() => this.handleMouseOver(index)}
                            />
                        ))
                    }
                    {
                        !list.length && (<li className={[ 'dropdown__item', 'dropdown__item--disabled' ]}>Нет совпадений</li>)
                    }
                </ul>
            </div>
        );
    }
}
