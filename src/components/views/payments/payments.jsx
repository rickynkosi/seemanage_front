import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deletePayment, getPayments } from '../../../services/paymentService'; 
// import { getGenres } from '../services/fakeGenreService';
import PaymentsTable from './paymentsTable';
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';


class Payments extends Component {
    state = { 
        payments: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'paymentdate', order: 'asc' }
    } 

    async componentDidMount() {
        // const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
        // this.setState({ districts: getDistricts(), genres });

        const { data: payments } = await  getPayments();
        this.setState({ payments })
    }

    handleDelete = async (payment) => {
        const originalPayments = this.state.payments;
        const payments = originalPayments.filter(d => d._id !== payment._id);
        this.setState({payments});

        try{
            await deletePayment(payment._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This payment has already been deleted.');
            }
            this.setState({ payments: originalPayments })
        }
    }

    // handleLike = (movie) => {
    //     const movies = [...this.state.movies];
    //     const index = movies.indexOf(movie);
    //     movies[index] = {...movies[index]};
    //     movies[index].liked = !movies[index].liked;
    //     this.setState({ movies })
    // }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    // handleGenreSelect = (genre) => {
    //     this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
    // };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };

    getPagedData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, payments: allPayments } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        let filtered = allPayments;
        if (searchQuery){
            filtered = allPayments.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allPayments.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const payments = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: payments }
    };

    render() { 
        const {length: count} = this.state.payments
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        if (count === 0) return <p>There are no payments in the database.</p>;


        const { totalCount, data: payments } = this.getPagedData();

        return (
            <div className='row'>
                <div className="col-3">
                    {/* <ListGroup 
                        items={this.state.genres} 
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    /> */}
                </div>
                <div className="col">
                    <Link to="/payments/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New District</Link>
                    {/* <Link to="/payments/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New Claim</Link>
                    <Link to="/payments/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Easy Pay Filter</Link> */}
                    <p>Showing {totalCount} payments in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <PaymentsTable 
                        payments={payments} 
                        sortColumn={sortColumn}
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
 
export default Payments;