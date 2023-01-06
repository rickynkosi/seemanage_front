import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from './common/like';
import Table from '../../common/table';


class UsersTable extends Component {
    columns = [
        { path: 'fullname', label: 'Fullname', content: user => <Link to={`/users/${user._id}`} >{user.fullname}</Link> },
        { path: 'email', label: 'Email' },
        { path: 'phonenumber', label: 'Phone Number' },
        { path: 'username', label: 'Username'},
        { path: 'isAdmin', label: 'isAdmin' },
        // { key: 'like', content: movie => (<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />) },
        { key: 'delete', content: user => (<button onClick={() => this.props.onDelete(user)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { users,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={users} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default UsersTable;