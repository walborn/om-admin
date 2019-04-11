import React  from 'react';
import DatePicker from 'react-datepicker';
import { Input, Button } from 'src/views/_blocks/index';
import isEqual from 'lodash.isequal';
import { ReactComponent as DeleteSVG } from 'src/assets/svg/trash.svg';
import { ReactComponent as CreateSVG } from 'src/assets/svg/plus.svg';
import { ReactComponent as DuplicateSVG } from 'src/assets/svg/duplicate.svg';
import { ReactComponent as DisableSVG } from 'src/assets/svg/disabled.svg';
import { ReactComponent as UnDisableSVG } from 'src/assets/svg/undisabled.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const toDate = x => new Date(...(([ d, m, y ]) => [ +y, +m-1, +d ])(x.split('.')));
const compare = (a, b) => {
    const A = +a.date.split('.').reverse().join('');
    const B = +b.date.split('.').reverse().join('');

    if (A < B) return -1;
    if (A > B) return 1;
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    if (a.duration > b.duration) return -1;
    if (a.duration < b.duration) return 1;
    return 0;
};

export default class Event extends React.Component {
    state = {
        list: this.props.list.sort(compare),
        disabled: true,
        fakeId: 0,
    };
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchList();
    }
    componentWillReceiveProps(nextProps) {
        const { list } = nextProps;
        if (Array.isArray(list) && !isEqual(list, this.props.list)) {
            this.setState({ list: list.sort(compare), disabled: true });
        }
    }
    handleChange = id => name => ({ value }) => {
        const { list } = this.state;
        const i = list.findIndex(item => item.id === id);
        const nextList = [ ...list.slice(0, i), { ...list[i], [name]: value }, ...list.slice(i + 1) ];
        const disabled = isEqual(nextList, this.props.list);
        this.setState({ list: nextList, disabled });
    };

    handleCreate = () => {
        const { list, fakeId } = this.state;
        const emptyItem = {
            date: new Date().toLocaleDateString('ru'),
            id: fakeId + 1,
            disabled: 'false',
            type: '', time: '', duration: '', name: '', alternate: '', master: '', level: '', room: '', };
        this.setState({ fakeId: fakeId + 1, list: [ ...list, emptyItem ], disabled: false });
    };

    handleDelete = id => () => {
        const { list } = this.state;
        const i = list.findIndex(item => item.id === id);
        const nextList = [ ...list.slice(0, i), ...list.slice(i + 1) ];
        const disabled = isEqual(nextList, this.props.list);

        this.setState({ list: nextList, disabled });
    };

    handleDuplicate = item => () => {
        const { list, fakeId } = this.state;
        const i = list.findIndex(({ id }) => item.id === id);
        const nextList = [ ...list.slice(0, i + 1), { ...item, id: fakeId + 1 }, ...list.slice(i + 1) ];
        const disabled = isEqual(nextList, this.props.list);

        this.setState({ fakeId: fakeId + 1, list: nextList, disabled });
    };

    handleSubmit = () => {
        const prevList = this.props.list.reduce((res, i) => ({ ...res, [i.id]: i }), {});
        const nextList = this.state.list.reduce((res, i) => ({ ...res, [i.id]: i }), {});
        this.setState({ disabled: true });
        Promise.all(
            [
                ...Object.keys(prevList).map(id => {
                    const nextItem = nextList[id];
                    if (!nextItem) return this.props.deleteItem(id);
                    if (!isEqual(nextItem, prevList[id])) this.props.updateItem(nextItem);
                }),
                ...Object.keys(nextList).filter(id => !prevList[id]).map(id => this.props.createItem(nextList[id])),
            ]
        ).then(this.props.fetchList);
    };

    render() {
        const { list, disabled } = this.state;
        return (
            <div id="event-list">
                {
                    list.map((i) => (
                        <div key={i.id} className={`item${i.disabled === 'true' ? ' disabled' : ''}`}>
                            <div className="card">
                                <DeleteSVG className="delete" onClick={this.handleDelete(i.id)} />
                                <DuplicateSVG className="duplicate" onClick={this.handleDuplicate(i)} />
                                {
                                    i.disabled === 'true'
                                        ? <DisableSVG className="disable" onClick={() => this.handleChange(i.id)('disabled')({ value: 'false' })}/>
                                        : <UnDisableSVG className="disable" onClick={() => this.handleChange(i.id)('disabled')({ value: 'true' })}/>
                                }
                                <div className="card__field">
                                    <DatePicker
                                        selected={toDate(i.date)}
                                        onChange={(date) => {
                                            console.log(date);
                                            if (!date) return;
                                            const value = date.toLocaleDateString('ru');
                                            this.handleChange(i.id)('date')({ value });
                                        }}
                                        dateFormat="dd.MM.yy"
                                    />
                                </div>
                                <Input className="card__field" placeholder="Type" title="type" value={i.type} onChange={this.handleChange(i.id)('type')}/>
                                <Input className="card__field" placeholder="Time" title="time" value={i.time} onChange={this.handleChange(i.id)('time')}/>
                                <Input className="card__field" placeholder="Duration" title="duration" value={i.duration} onChange={this.handleChange(i.id)('duration')}/>
                                <Input className="card__field" placeholder="Title" title="title" value={i.name} onChange={this.handleChange(i.id)('name')}/>
                                <Input className="card__field" placeholder="Alternate" title="alternate" value={i.alternate} onChange={this.handleChange(i.id)('alternate')}/>
                                <Input className="card__field" placeholder="Master" title="master" value={i.master} onChange={this.handleChange(i.id)('master')}/>
                                <Input className="card__field" placeholder="Level" title="level" value={i.level} onChange={this.handleChange(i.id)('level')}/>
                            </div>
                        </div>
                    ))
                }
                <div className="create">
                    <div onClick={this.handleCreate}><CreateSVG/></div>
                </div>
                <div className="submit"><Button onClick={this.handleSubmit} green disabled={disabled}>Submit</Button></div>
            </div>
        );
    }
}
