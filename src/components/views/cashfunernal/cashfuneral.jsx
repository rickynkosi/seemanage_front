import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link, Outlet } from 'react-router-dom';
import { getCashFunerals, deleteCashFuneral  } from '../../../services/cashfuneralService'; 
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';
import { toast } from 'react-toastify';
import CashFuneralTable from './cashfuneralTable';



class CashFuneral extends Component {
    state = { 
        cashfunerals: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'fullname', order: 'asc' }
    } 

    async componentDidMount() {
    //     const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
    //     this.setState({ movies: getPolicies(), genres });

        const { data: cashfunerals } = await getCashFunerals();
        this.setState({ cashfunerals });
    }

    handleDelete = async (cashfuneral) => {
        const originalCashFunerals = this.state.cashfunerals;
        const cashfunerals = originalCashFunerals.filter(d => d._id !== cashfuneral._id);
        this.setState({cashfunerals});

        try{
            await deleteCashFuneral(cashfuneral._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This cashfuneral has already been deleted.');
            }
            this.setState({ cashfunerals: originalCashFunerals })
        }
    }

    // handleLike = (movie) => {
    //     const members = [...this.state.members];
    //     const index = members.indexOf(movie);
    //     members[index] = {...members[index]};
    //     members[index].liked = !members[index].liked;
    //     this.setState({ members })
    // }

    handlePageChange =  (page) => {
        this.setState({ currentPage: page });
    }

    // handleGenreSelect = (genre) => {
    //     this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
    // };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    // handleSearch = (query) => {
    //     this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    // };

    getPagedData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, cashfunerals: allCashFunerals } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allCashFunerals.filter(m => m.genre._id === selectedGenre._id) : allCashFunerals;

        let filtered = allCashFunerals;
        if (searchQuery){
            filtered = allCashFunerals.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allCashFunerals.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const cashfunerals = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: cashfunerals }
    };

    render() { 
        const {length: count} = this.state.cashfunerals
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        if (count === 0) {
            <p>There are no cashfunerals in the database.</p>;
            <Link to="/cashfuneralform" className="btn btn-primary" style={{ marginBottom: 20 }}>New Member</Link>;
            <Link to="/cashfunerals/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Existing Member</Link>;
            <Link to="/cashfunerals/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Manage</Link>;
        } 


        const { totalCount, data: cashfunerals } = this.getPagedData();

        return (
            <div className='row'>
                <div className="col-3">
                    {/* <ListGroup 
                        items={this.state.genres} 
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    /> */}
                    <Outlet/>
                </div>
                <div className="col">
                    <Link to="newcashfuneral" className="btn btn-primary" style={{ marginBottom: 20 }}>New CashFuneral</Link>
                    {/* <Link to="new" className="btn btn-primary" style={{ marginBottom: 20 }}>Manage</Link> */}
                    <p>Showing {totalCount} cashfunerals in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <CashFuneralTable 
                        cashfunerals={cashfunerals} 
                        sortColumn={sortColumn}
                        // onlike={this.handleLike}
                        onSort={this.handleSort} 
                        onDelete={this.handleDelete}
                    />
                    <Pagination 
                        itemsCount={totalCount} 
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}
 
export default CashFuneral;