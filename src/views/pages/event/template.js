import React  from 'react';
import DatePicker from 'react-datepicker';
import { Input, Button } from 'src/views/_blocks/index';
import isEqual from 'lodash.isequal';
import { ReactComponent as DeleteSVG } from 'src/assets/svg/trash.svg';
import { ReactComponent as CreateSVG } from 'src/assets/svg/plus.svg';
import { ReactComponent as DuplicateSVG } from 'src/assets/svg/duplicate.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const toDate = x => new Date(...(([ d, m, y ]) => [ +y, +m-1, +d ])(x.split('.')));
const compare = (a, b) => {
    const [ dA, mA, yA ] = a.date.split('.');
    const [ dB, mB, yB ] = b.date.split('.');
    if (yA < yB) return -1;
    if (yA > yB) return 1;
    if (mA < mB) return 1;
    if (mA > mB) return 1;
    if (dA < dB) return -1;
    if (dA > dB) return 1;
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    if (a.duration > b.duration) return -1;
    if (a.duration < b.duration) return 1;
    return 0;
};

export default class Event extends React.Component {
    state = {
        list: this.props.list,
        fakeId: 0,
    };
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchList();
    }
    componentWillReceiveProps(nextProps) {
        const { list } = nextProps;
        if (Array.isArray(list) && !isEqual(list, this.props.list)) {
            this.setState({ list: list.sort(compare) });
        }
    }
    handleChange = id => name => ({ value }) => {
        const {list} = this.state;
        const i = list.findIndex(item => item.id === id);
        this.setState({
            list:
                [
                    ...list.slice(0, i),
                    {...list[i], [name]: value},
                    ...list.slice(i + 1),
                ]
        }, () => console.log(this.state.list));
    };

    handleSubmit = () => {
        console.log('submit');
        const { list } = this.state;
        this.props.list.map(item => {
            const newItem = list.find(({ id }) => item.id === id);
            if (!newItem) return this.props.deleteItem(item.id);
            if (!isEqual(newItem, item)) return this.props.updateItem(newItem);
        });
        list.filter(i => typeof i.id === 'number').forEach(item => this.props.createItem(item));
    };
    handleCreate = () => {
        const { list, fakeId } = this.state;
        const emptyItem = { date: new Date().toLocaleDateString('ru'), type: '', time: '', duration: '', name: '', alternate: '', master: '', level: '', room: '', disabled: false, id: fakeId + 1 };
        this.setState({ fakeId: fakeId + 1, list: [ ...list, emptyItem ]});
    };
    handleDelete = id => () => {
        const { list } = this.state;
        const i = list.findIndex(item => item.id === id);
        this.setState({ list: [ ...list.slice(0, i), ...list.slice(i + 1) ] }); //, () => this.props.deleteItem(id));
    };
    handleDuplicate = item => () => {
        const { list, fakeId } = this.state;
        const i = list.findIndex(({ id }) => item.id === id);
        const newList = [ ...list.slice(0, i + 1), { ...item, id: fakeId + 1 }, ...list.slice(i + 1) ];
        this.setState({ fakeId: fakeId + 1, list: newList });
    };

    render() {
        const { list } = this.state;
        return (
            <div id="event-list">
                {
                    list.map((i) => (
                        <div key={i.id} className="item">
                            <div className="card">
                                <DeleteSVG className="delete" onClick={this.handleDelete(i.id)} />
                                <DuplicateSVG className="duplicate" onClick={this.handleDuplicate(i)} />
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
                <div className="submit"><Button onClick={this.handleSubmit} green disabled={isEqual(list, this.props.list)}>Submit</Button></div>
            </div>
        );
    }
}
