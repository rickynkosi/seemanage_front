import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class PolicyTable extends Component {
    columns = [
        { path: 'policynumber', label: 'Policy Number', content: policy => <Link to={`/policy/${policy._id}`} >{policy.policynumber}</Link> },
        { path: 'policyname', label: 'Policy Name' },
        { path: 'cover', label: 'Cover' },
        { path: 'premium', label: 'Premium' },
        { path: 'benefits', label: 'Benefits' },
        { path: 'extras', label: 'Extras' },
        // { key: 'like', content: policy => (<Like liked={policy.liked} onClick={() => this.props.onLike(policy)} />) },
        { key: 'delete', content: policy => (<button onClick={() => this.props.onDelete(policy)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { policies,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={policies} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default PolicyTable;