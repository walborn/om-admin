import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';


export default class UserList extends React.Component {
    static propTypes = {
        fetchList: PropTypes.func.isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            avatar: PropTypes.string,
            description: PropTypes.string,
        })).isRequired,
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchList({ offset: 0, limit: 5, sort: 'created_at desc' });
    }

    render() {
        const { list } = this.props;

        return (
            <ul className="user-list">
                {
                    list.map(item => (
                        <li key={item.id} className="user-list__item">
                            <Link to={`/user/item/${item.id}`}>
                                {/*<pre>{JSON.stringify(item, null, 4)}</pre>*/}
                                <img className="user-list__picture" src={item.picture} alt="" />
                                <div className="user-list__name">{item.name}</div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
