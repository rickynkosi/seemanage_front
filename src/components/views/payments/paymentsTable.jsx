import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class PaymentsTable extends Component {
    columns = [
        { path: 'districtcode', label: 'District Code', content: district => <Link to={`/payments/${district._id}`} >{district.districtcode}</Link> },
        { path: 'districtname', label: 'District Name' },
        { key: 'delete', content: district => (<button onClick={() => this.props.onDelete(district)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { payments,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={payments} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default PaymentsTable;