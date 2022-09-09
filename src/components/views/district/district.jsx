import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteDistrict, getDistricts } from '../../../services/districtService'; 
// import { getGenres } from '../services/fakeGenreService';
import DistrictsTable from './districtsTable';
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';



class District extends Component {
    state = { 
        districts: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'districtcode', order: 'asc' }
    } 

    async componentDidMount() {
        // const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
        // this.setState({ districts: getDistricts(), genres });

        const { data: districts } = await  getDistricts();
        this.setState({ districts })
    }

    handleDelete = async (district) => {
        const originalDistricts = this.state.districts;
        const districts = originalDistricts.filter(d => d._id !== district._id);
        this.setState({districts});

        try{
            await deleteDistrict(district._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This district has already been deleted.');
            }
            this.setState({ districts: originalDistricts })
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
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, districts: allDistricts } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        let filtered = allDistricts;
        if (searchQuery){
            filtered = allDistricts.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allDistricts.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const districts = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: districts }
    };



    render() { 
        const {length: count} = this.state.districts
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        // <Route exact path='/district/new' >
        //     <NewDistrict />
        // </Route>


        if (count === 0) {
            <p>There are no districts in the database.</p>;
            // <Link to="new" className="btn btn-primary" style={{ marginBottom: 20 }}>New District</Link>;

        } 


        const { totalCount, data: districts } = this.getPagedData();

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
                    {/* <Outlet/> */}
                    <Link to="newdistrict" className="btn btn-primary" style={{ marginBottom: 20 }}>New District</Link>
                    {/* <Link to="/districts/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New Claim</Link>
                    <Link to="/districts/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Easy Pay Filter</Link> */}
                    <p>Showing {totalCount} districts in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <DistrictsTable 
                        districts={districts} 
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

export default District;