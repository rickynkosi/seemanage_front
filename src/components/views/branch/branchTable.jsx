import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class BranchTable extends Component {
    columns = [
        { path: 'branchid', label: 'DBranch Id', content: branch => <Link to={`/branch/${branch._id}`} >{branch.branchid}</Link> },
        { path: 'branchname', label: 'Branch Name' },
        { key: 'delete', content: branch => (<button onClick={() => this.props.onDelete(branch)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { branches,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={branches} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default BranchTable;