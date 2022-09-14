import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class MemberTable extends Component {
    columns = [
        { path: 'title', label: 'Title' },
        { path: 'firstname', label: 'Firstname', content: member => <Link to={`/members/${member._id}`} >{member.firstname}</Link>  },
        { path: 'lastname', label: 'Lastname' },
        { path: 'idnumber', label: 'ID Number' },
        { path: 'policy', label: 'Policy' },
        { path: 'birthdate', label: 'Birth Date' },
        { path: 'passportnumber', label: 'Passport Number' },
        { path: 'premium', label: 'Premium'},
        { path: 'postaladdress', label: 'Postal Address'},
        { path: 'physicaladdress', label: 'Physical Address' },
        { path: 'phonenumber', label: 'Phone Number' },
        { path: 'email', label: 'Email' },
        { path: 'membertype', label: 'Member Type' },
        // { key: 'like', content: member => (<Like liked={member.liked} onClick={() => this.props.onLike(member)} />) },
        { key: 'delete', content: member => (<button onClick={() => this.props.onDelete(member)} className="btn btn-danger btn-sm">Delete</button>) },
        { key: 'extmember', content: member => (<button className="btn btn-danger btn-sm">Add Ext Member</button>) }
    ];

    render() { 
     const { members,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={members} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default MemberTable;