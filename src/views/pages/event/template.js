import React  from 'react';
import DatePicker from 'react-datepicker';
import { Input, Button, TimeInput } from 'src/views/_blocks/index';
import isEqual from 'lodash.isequal';
import { ReactComponent as DeleteSVG } from 'src/assets/svg/trash.svg';
import { ReactComponent as CreateSVG } from 'src/assets/svg/plus.svg';
import { ReactComponent as DuplicateSVG } from 'src/assets/svg/duplicate.svg';
import { ReactComponent as DisableSVG } from 'src/assets/svg/disabled.svg';
import { ReactComponent as UnDisableSVG } from 'src/assets/svg/undisabled.svg';
import { ReactComponent as SubmitSVG } from 'src/assets/svg/submit.svg';
import { ReactComponent as ArrowSVG } from 'src/assets/svg/arrow.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const WEEKDAYS = [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ];
const toDate = x => new Date(...(([ d, m, y ]) => [ +y, +m-1, +d ])(x.split('.')));
const compare = (a, b) => {
    const A = +a.date.split('.').reverse().join('');
    const B = +b.date.split('.').reverse().join('');

    if (A < B) return -1;
    if (A > B) return 1;
    if (+a.time < +b.time) return -1;
    if (+a.time > +b.time) return 1;
    if (+a.duration < +b.duration) return -1;
    if (+a.duration > +b.duration) return 1;
    return 0;
};

export default class Event extends React.Component {
    state = {
        list: [],
        matrix: {},
        opened: {},
        disabled: true,
        fakeId: 0,
    };
    componentWillMount() {
        this.setStateWithList({ list: this.props.list.sort(compare) })
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchList();
    }
    componentWillReceiveProps(nextProps) {
        const { list } = nextProps;
        if (Array.isArray(list) && !isEqual(list, this.props.list)) {
            this.setStateWithList({ list: list.sort(compare), disabled: true })
        }
    }
    setStateWithList = (newState) => {
        if (!Array.isArray(newState.list)) return this.setState(newState);
        const matrix = newState.list.reduce((res, i) => ({ ...res, [i.date]: [ ...(res[i.date] || []), i ] }), {});
        this.setState({ matrix, ...newState });
    };

    handleChange = id => name => ({ value }) => {
        const { list } = this.state;
        const i = list.findIndex(item => item.id === id);
        const nextList = [ ...list.slice(0, i), { ...list[i], [name]: value }, ...list.slice(i + 1) ];
        const disabled = isEqual(nextList, this.props.list);
        this.setStateWithList({ list: nextList, disabled });
    };

    handleCreate = () => {
        const { list, fakeId } = this.state;
        const emptyItem = {
            date: new Date().toLocaleDateString('ru'),
            id: fakeId + 1,
            disabled: 'false',
            type: '', time: '', duration: '', name: '', alternate: '', master: '', level: '', room: '', };
        this.setStateWithList({ fakeId: fakeId + 1, list: [ ...list, emptyItem ], disabled: false });
    };

    handleDelete = id => () => {
        const { list } = this.state;
        const i = list.findIndex(item => item.id === id);
        const nextList = [ ...list.slice(0, i), ...list.slice(i + 1) ];
        const disabled = isEqual(nextList, this.props.list);

        this.setStateWithList({ list: nextList, disabled });
    };

    handleDuplicate = item => () => {
        const { list, fakeId } = this.state;
        const i = list.findIndex(({ id }) => item.id === id);
        const nextList = [ ...list.slice(0, i + 1), { ...item, id: fakeId + 1 }, ...list.slice(i + 1) ];
        const disabled = isEqual(nextList, this.props.list);

        this.setStateWithList({ fakeId: fakeId + 1, list: nextList, disabled });
    };

    handleSubmit = () => {
        this.setStateWithList({ disabled: true });
        const prevList = this.props.list.reduce((res, i) => ({ ...res, [i.id]: i }), {});
        const nextList = this.state.list.reduce((res, i) => ({ ...res, [i.id]: i }), {});
        const del = Object.keys(prevList).filter(id => !nextList[id]);
        const upd = Object.keys(prevList).filter(id => nextList[id] && !isEqual(nextList[id], prevList[id]));
        const crt = Object.keys(nextList).filter(id => !prevList[id]);

        Promise.all(
            [
                ...del.map(id => this.props.deleteItem(id)),
                ...upd.map(id => this.props.updateItem(nextList[id])),
                ...crt.map(id => this.props.createItem(nextList[id])),
            ]
        ).then(this.props.fetchList);
    };

    handleOpenDate = date => () => this.setState({ opened: { ...this.state.opened, [date]: !this.state.opened[date] } });

    render() {
        const { matrix, opened, disabled } = this.state;

        return (
            <div id="event-list">
                {
                    Object.entries(matrix).map(([ date, classes ]) => (
                        <div key={date} className={[ 'wrapper', opened[date] && 'opened'].filter(Boolean).join(' ')}>
                            <div className="date" onClick={this.handleOpenDate(date)}>
                                <span className="date__weekday">{WEEKDAYS[toDate(date).getDay()]}</span>
                                <span className="date__date">{date}</span>
                                <span className="date__length">{classes.length}</span>
                                <ArrowSVG className="arrow" />
                            </div>

                            <div className="list">
                                {
                                    classes.map((i) => (
                                        <div key={i.id} className={`item${i.disabled === 'true' ? ' disabled' : ''}`}>
                                            <div className="card">
                                                <DeleteSVG className="delete" onClick={this.handleDelete(i.id)} />
                                                <DuplicateSVG className="duplicate" onClick={this.handleDuplicate(i)} />
                                                {
                                                    i.disabled === 'true'
                                                        ? <DisableSVG className="disable" onClick={() => this.handleChange(i.id)('disabled')({ value: 'false' })}/>
                                                        : <UnDisableSVG className="disable" onClick={() => this.handleChange(i.id)('disabled')({ value: 'true' })}/>
                                                }
                                                <div className="card__field card__field--date">
                                                    <DatePicker
                                                        selected={toDate(i.date)}
                                                        onChange={(date) => {
                                                            if (!date) return;
                                                            const value = date.toLocaleDateString('ru');
                                                            this.handleChange(i.id)('date')({ value });
                                                        }}
                                                        dateFormat="dd.MM.yy"
                                                    />
                                                </div>
                                                <TimeInput className="card__field card__field--time" placeholder="Time" title="time" value={i.time} onChange={this.handleChange(i.id)('time')}/>
                                                <Input className="card__field card__field--duration" placeholder="min" title="" value={i.duration} onChange={this.handleChange(i.id)('duration')} maxLength={3}/>
                                                <Input className="card__field" placeholder="Type" title="type" value={i.type} onChange={this.handleChange(i.id)('type')}/>
                                                <Input className="card__field" placeholder="Title" title="title" value={i.name} onChange={this.handleChange(i.id)('name')}/>
                                                <Input className="card__field" placeholder="Alternate" title="alternate" value={i.alternate} onChange={this.handleChange(i.id)('alternate')}/>
                                                <Input className="card__field" placeholder="Master" title="master" value={i.master} onChange={this.handleChange(i.id)('master')}/>
                                                <Input className="card__field" placeholder="Level" title="level" value={i.level} onChange={this.handleChange(i.id)('level')}/>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <div className="create">
                    <div onClick={this.handleCreate}><CreateSVG/></div>
                </div>
                <div className="submit"><button onClick={this.handleSubmit} disabled={disabled}><SubmitSVG /></button></div>
            </div>
        );
    }
}
