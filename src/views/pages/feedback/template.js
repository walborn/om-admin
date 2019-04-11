import React  from 'react';
import DatePicker from 'react-datepicker';
import { Input, Button } from 'src/views/_blocks/index';
import isEqual from 'lodash.isequal';
import { ReactComponent as DeleteSVG } from 'src/assets/svg/trash.svg';
import { ReactComponent as CreateSVG } from 'src/assets/svg/plus.svg';
import { ReactComponent as DuplicateSVG } from 'src/assets/svg/duplicate.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';


export default class Feedback extends React.Component {
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
        console.log(list);
        if (Array.isArray(list) && !isEqual(list, this.props.list)) {
            this.setState({ list });
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
        const { list } = this.state;
        this.props.list.map(item => {
            const newItem = list.find(({ id }) => item.id === id);
            if (!newItem) return this.props.deleteItem(item.id);
            if (!isEqual(newItem, item)) return this.props.updateItem(newItem);
        });
        list.filter(i => !i.id).forEach(item => this.props.createItem(item));
    };
    handleCreate = () => {
        const { list, fakeId } = this.state;
        const emptyItem = { phone: '', content: '', disabled: false, id: fakeId + 1 };
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
            <div id="feedback-list">
                {
                    list.map((i) => (
                        <div key={i.id} className="item">
                            <div className="card">
                                <DeleteSVG className="delete" onClick={this.handleDelete(i.id)} />
                                {/*<DuplicateSVG className="duplicate" onClick={this.handleDuplicate(i)} />*/}
                                {/*<div className="card__field">*/}
                                    {/*<DatePicker*/}
                                        {/*selected={new Date(i.createdAt)}*/}
                                        {/*onChange={(date) => {*/}
                                            {/*console.log(date);*/}
                                            {/*if (!date) return;*/}
                                            {/*const value = date.toISOString();*/}
                                            {/*this.handleChange(i.id)('createdAt')({ value });*/}
                                        {/*}}*/}
                                        {/*dateFormat="dd.MM.yy"*/}
                                    {/*/>*/}
                                {/*</div>*/}
                                <Input className="card__field" placeholder="createdAt" title="createdAt" value={new Date(i.createdAt).toLocaleDateString('ru')} readOnly />
                                <div className="card__field"><a className="card__field" href={`tel:${i.phone}`}>{i.phone}</a></div>
                                <Input className="card__field" placeholder="name" title="name" value={i.name} onChange={this.handleChange(i.id)('name')} readOnly/>
                                <Input className="card__field" placeholder="type" title="type" value={i.type} onChange={this.handleChange(i.id)('type')} readOnly/>
                                <Input className="card__field" placeholder="content" title="content" value={i.content} onChange={this.handleChange(i.id)('content')} readOnly/>
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
