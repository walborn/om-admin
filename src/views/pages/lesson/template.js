import React  from 'react';
import { Input, DropDown, TimeInput } from 'src/views/_blocks/index';
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
const weekdays = [
    { key: '0', children: 'Вс'},
    { key: '1', children: 'Пн' },
    { key: '2', children: 'Вт' },
    { key: '3', children: 'Ср' },
    { key: '4', children: 'Чт' },
    { key: '5', children: 'Пт' },
    { key: '6', children: 'Сб' },
];
const compare = (a, b) => {
    if (+a.time < +b.time) return -1;
    if (+a.time > +b.time) return 1;
    if (+a.duration < +b.duration) return -1;
    if (+a.duration > +b.duration) return 1;
    return 0;
};

export default class Lesson extends React.Component {
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
        let offset = 0;
        const limit = 100;
        this.props.fetchList({ offset, limit })
    }

    componentWillReceiveProps(nextProps) {
        const { list } = nextProps;
        if (Array.isArray(list) && !isEqual(list, this.props.list)) {
            this.setStateWithList({ list: list.sort(compare), disabled: true })
        }
    }
    setStateWithList = (newState) => {
        if (!Array.isArray(newState.list)) return this.setState(newState);
        const matrix = newState.list.reduce((res, i) => ({ ...res, [i.day]: [ ...(res[i.day] || []), i ] }), {});
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
            day: new Date().getDay(),
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

    handleOpenDate = day => () => this.setState({ opened: { ...this.state.opened, [day]: !this.state.opened[day] } });

    render() {
        const { list, matrix, opened, disabled } = this.state;

        return (
            <div id="lesson-list">
                {
                    Object.entries(matrix).map(([ day, lessons ]) => (
                        <div key={day} className={[ 'wrapper', opened[day] && 'opened'].filter(Boolean).join(' ')}>
                            <div className="day" onClick={this.handleOpenDate(day)}>
                                <span className="day__weekday">{WEEKDAYS[day]}</span>
                                <span className="day__length">{lessons.length}</span>
                                <ArrowSVG className="arrow" />
                            </div>

                            <div className="list">
                                {
                                    lessons.map((i) => (
                                        <div key={i.id} className={[ 'item', i.hidden && 'hidden' ].filter(Boolean).join(' ')}>
                                            <div className="card">
                                                <DeleteSVG className="delete" onClick={this.handleDelete(i.id)} />
                                                <DuplicateSVG className="duplicate" onClick={this.handleDuplicate(i)} />
                                                {
                                                    i.hidden
                                                        ? <DisableSVG className="hidden" onClick={() => this.handleChange(i.id)('hidden')({ value: false })}/>
                                                        : <UnDisableSVG className="hidden" onClick={() => this.handleChange(i.id)('hidden')({ value: true })}/>
                                                }
                                                <div className="card__field card__field--day">
                                                    <DropDown list={weekdays} selected={`${day}`} onChange={({ key }) => this.handleChange(i.id)('day')({ value: +key })} />
                                                </div>
                                                <TimeInput className="card__field card__field--time" placeholder="Time" title="time" value={i.time} onChange={this.handleChange(i.id)('time')}/>
                                                <Input className="card__field card__field--duration" placeholder="min" title="" value={i.duration} onChange={this.handleChange(i.id)('duration')} maxLength={3}/>
                                                <Input className="card__field" placeholder="Category" title="category" value={i.category} onChange={this.handleChange(i.id)('category')}/>
                                                <Input className="card__field" placeholder="Title" title="title" value={i.title} onChange={this.handleChange(i.id)('title')}/>
                                                <Input className="card__field" placeholder="Alternate" title="alternate" value={i.alternate} onChange={this.handleChange(i.id)('alternate')}/>
                                                <Input className="card__field" placeholder="Master" title="master" value={i.master} onChange={this.handleChange(i.id)('master')}/>
                                                <Input className="card__field" placeholder="Level" title="level" value={i.level} onChange={this.handleChange(i.id)('level')}/>
                                                <Input className="card__field" placeholder="Note" title="note" value={i.note} onChange={this.handleChange(i.id)('note')} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                {
                    !list.length && (
                        <div className="create">
                            <div onClick={this.handleCreate}><CreateSVG/></div>
                        </div>
                    )
                }
                <div className="submit"><button onClick={this.handleSubmit} disabled={disabled}><SubmitSVG /></button></div>
            </div>
        );
    }
}
