import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class ManageCarTable extends Component {
    columns = [
        { path: '', label: 'District Code', content: district => <Link to={`/districts/${district._id}`} >{district.districtcode}</Link> },
        { path: 'districtname', label: 'District Name' },
        { path: 'districtname', label: 'District Name' },
        { key: 'delete', content: district => (<button onClick={() => this.props.onDelete(district)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { districts,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={districts} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default ManageCarTable;