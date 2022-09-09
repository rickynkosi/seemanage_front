import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteFleet, getFleets } from '../../../services/fleetmanagementService'; 
// import { getGenres } from '../services/fakeGenreService';
import ManageFleetTable from './manageFleetTable';
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';


class ManageFleet extends Component {
    state = { 
        fleets: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'districtname', order: 'asc' }
    } 

    async componentDidMount() {
        // const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
        // this.setState({ districts: getDistricts(), genres });

        const { data: fleets } = await  getFleets();
        this.setState({ fleets })
    }

    handleDelete = async (fleet) => {
        const originalFleets = this.state.fleets;
        const fleets = originalFleets.filter(d => d._id !== fleet._id);
        this.setState({fleets});

        try{
            await deleteFleet(fleet._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This fleet has already been deleted.');
            }
            this.setState({ fleets: originalFleets })
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
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, fleets: allFleets } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        let filtered = allFleets;
        if (searchQuery){
            filtered = allFleets.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allFleets.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const fleets = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: fleets }
    };

    render() { 
        const {length: count} = this.state.fleets
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        if (count === 0)  return <p>There are no fleets in the database.</p>;
            


        const { totalCount, data: fleets } = this.getPagedData();

        return (
            <div className='row'>
                <div className="col-3">
                    {/* <ListGroup 
                        items={this.state.genres} 
                        selectedItem={this.state.selectedGenre
                        onItemSelect={this.handleGenreSelect}
                    /> */}
                </div>
                <div className="col">
                    <Link to="newbooking" className="btn btn-primary" style={{ marginBottom: 20 }}>New Booking</Link>
                    <Link to="managedriver" className="btn btn-primary" style={{ marginBottom: 20 }}>Manage Driver</Link>
                    <Link to="managecar" className="btn btn-primary" style={{ marginBottom: 20 }}>Manage Car</Link>
                    <p>Showing {totalCount} fleets in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <ManageFleetTable 
                        fleets={fleets} 
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
 
export default ManageFleet;