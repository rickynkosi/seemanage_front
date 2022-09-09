import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class CashFuneralTable extends Component {
    columns = [
        { path: 'fullname', label: 'Fullname' },
        { path: 'idnumber', label: 'ID Number', content: cashfuneral => <Link to={`/cashfunerals/${cashfuneral._id}`} >{cashfuneral.idnumber}</Link>  },
        { path: 'phonenumber', label: 'Phone Number' },
        { path: 'amount', label: 'Amount' },
        { path: 'services', label: 'Services' },
        // { key: 'like', content: member => (<Like liked={member.liked} onClick={() => this.props.onLike(member)} />) },
        { key: 'delete', content: cashfuneral => (<button onClick={() => this.props.onDelete(cashfuneral)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { cashfunerals,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={cashfunerals} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default CashFuneralTable;