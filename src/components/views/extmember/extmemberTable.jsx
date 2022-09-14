import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class ExtMemberTable extends Component {
    columns = [
        { path: 'firtstname', label: 'Firstname' , content: extmember => <Link to={`/extmember/${extmember._id}`} >{extmember.firstname}</Link>  },
        { path: 'surname', label: 'Surname'},
        { path: 'mmidnumber', label: 'Main member ID Number' },
        { path: 'idnumber', label: 'ID Number' },
        { path: 'membertype', label: 'Member Type' },
        { path: 'memberrelation', label: 'Member Relation' },
        // { key: 'like', content: member => (<Like liked={member.liked} onClick={() => this.props.onLike(member)} />) },
        { key: 'delete', content: member => (<button onClick={() => this.props.onDelete(member)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { extmembers,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={extmembers} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default ExtMemberTable;