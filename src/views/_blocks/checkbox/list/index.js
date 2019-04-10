import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import CheckBoxItem from '../item';
import './styles.scss';


export default class CheckBoxList extends Component {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.oneOf([ 'check', 'radio' ]),
        list: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.bool,
            children: PropTypes.node,
        })).isRequired,
        readonly: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        type: 'check',
        readonly: false,
    };

    state = {
        list: this.props.list,
    };

    componentWillReceiveProps(nextProps) {
        const { list } = nextProps;
        if (!isEqual(list, this.props.list)) this.setState({ list });
    }

    get value() {
        return this.props.list;
    }

    set value(list) {
        this.setState({ list }, () => this.props.onChange(list, isEqual(this.props.list, list)));
    }

    handleChange = key => () => {
        const { type } = this.props;
        const { list } = this.state;
        const index = list.findIndex(i => i.key === key);

        let newList = [ ...list ];
        let newItem = {};

        if (type === 'check') {
            newItem = { ...list[index], value: !list[index].value };
            newList = [ ...list.slice(0, index), newItem, ...list.slice(index + 1) ];
        }
        if (type === 'radio' && !list[index].value) {
            newItem = { ...list[index], value: true };
            newList = list.map(i => ({ ...i, value: i.key === key }));
        }

        this.setState({ list: newList }, () => this.props.onChange(newList, isEqual(this.props.list, newList), newItem));
    };

    render() {
        const { className, type, readonly } = this.props;
        const { list } = this.state;
        return (
            <ul className={[ 'checkbox-list', className ]}>
                {
                    list.map(item => (
                        <li key={item.key}>
                            <CheckBoxItem
                                type={type}
                                readonly={readonly}
                                value={item.value}
                                onClick={this.handleChange(item.key)}
                            >
                                {item.children}
                            </CheckBoxItem>
                        </li>
                    ))}
            </ul>
        );
    }
}
