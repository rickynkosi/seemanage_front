import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteSheet, getSheets } from '../../../services/sheetService'; 
// import { getGenres } from '../services/fakeGenreService';
import SheetsTable from './sheetTable';
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';



class Sheet extends Component {
    state = { 
        sheets: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'name', order: 'asc' }
    } 

    async componentDidMount() {
        // const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
        // this.setState({ districts: getDistricts(), genres });

        const { data: districts } = await  getSheets();
        this.setState({ districts })
    }

    handleDelete = async (sheet) => {
        const originalSheets = this.state.sheets;
        const sheets = originalSheets.filter(d => d._id !== sheet._id);
        this.setState({sheets});

        try{
            await deleteSheet(sheet._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This sheet has already been deleted.');
            }
            this.setState({ sheets: originalSheets })
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
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, sheets: allSheets } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        let filtered = allSheets;
        if (searchQuery){
            filtered = allSheets.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allSheets.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const sheets = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: sheets }
    };



    render() { 
        const {length: count} = this.state.sheets
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        // <Route exact path='/district/new' >
        //     <NewDistrict />
        // </Route>


        if (count === 0)  {
            <p>There are no sheets in the database.</p>;
        }


        const { totalCount, data: sheets } = this.getPagedData();

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
                    <Link to="newsheet" className="btn btn-primary" style={{ marginBottom: 20 }}>New Sheet</Link>
                    <Link to="managesheet" className="btn btn-primary" style={{ marginBottom: 20 }}>Manage Sheet</Link>
                    <p>Showing {totalCount} sheets in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <SheetsTable 
                        sheets={sheets} 
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
 
export default Sheet;