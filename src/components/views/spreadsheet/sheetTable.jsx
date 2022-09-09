import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Like from '../common/like';
import Table from '../../common/table';


class SheetTable extends Component {
    columns = [
        { path: 'branchid', label: 'BranchId', content: sheet => <Link to={`/sheet/${sheet._id}`} >{sheet.sheetname}</Link>},
        { path: 'branchname', label: 'BranchName' },
        { path: 'memberid', label: 'MemberId'},
        { path: 'policynumber', label: 'PolicyNumber' },
        { path: 'inceptiondate', label: 'InceptionDate'},
        { path: 'datecaptured', label: 'DateCaptured' },
        { path: 'membertype', label: 'MemberType'},
        { path: 'memberrelation', label: 'MemberRelation' },
        { path: 'membertypeint', label: 'MemberTypeInt'},
        { path: 'membertypebool', label: 'MemberTypeBool' },
        { path: 'fullname', label: 'Fullname'},
        { path: 'firstname', label: 'Firstname' },
        { path: 'surname', label: 'Surname'},
        { path: 'idnumber', label: 'IDnumber' },
        { path: 'passportnumber', label: 'PassportNumber'},
        { path: 'birthdate', label: 'BirthDate' },
        { path: 'product', label: 'Product'},
        { path: 'premium', label: 'Premium' },
        { path: 'upremium', label: 'uPremium'},
        { path: 'escalatedcover', label: 'EscalatedCover' },
        { path: 'debitday', label: 'DebitDay'},
        { path: 'reference', label: 'Reference' },
        { path: 'physicaladdress', label: 'physicalAddress'},
        { path: 'postaladdress', label: 'PostalAddress' },
        { path: 'cell', label: 'Cell'},
        { path: 'email', label: 'Email' },
        { path: 'claimable', label: 'Claimable'},
        { path: 'notes', label: 'Notes' },
        { path: 'currentstatus', label: 'CurrentStatus'},
        { path: 'paymentmethod', label: 'PaymentMethod' },
        { path: 'agentname', label: 'Agentname'},
        { path: 'maturityterm', label: 'MaturityTerm' },
        { path: 'underwriter', label: 'UnderWriter'},
        { path: 'mainmemberidnumber', label: 'MainMemberIDNumber' },
        { path: 'subgroup', label: 'SubGroup'},
        { path: 'preferredlanguage', label: 'PreferredLanguage' },
        { path: 'actualpersonid', label: 'ActualPersonId'},
        { path: 'hometel', label: 'HomeTel' },
        { key: 'delete', content: sheet => (<button onClick={() => this.props.onDelete(sheet)} className="btn btn-danger btn-sm">Delete</button>) }
    ];

    render() { 
     const { sheets,  onSort, sortColumn } = this.props;

    return ( 
        <Table 
            columns={this.columns} 
            data={sheets} 
            sortColumn={sortColumn} 
            onSort={onSort}
        />
        );
    }
}
 
export default SheetTable;