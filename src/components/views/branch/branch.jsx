import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBranch, getBranches } from '../../../services/districtService'; 
// import { getGenres } from '../services/fakeGenreService';
import BranchTable from './branchTable';
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';



class Branch extends Component {
    state = { 
        branches: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'branchname', order: 'asc' }
    } 

    async componentDidMount() {
        // const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
        // this.setState({ districts: getDistricts(), genres });

        const { data: branches } = await  getBranches();
        this.setState({ branches })
    }

    handleDelete = async (branch) => {
        const originalBranches = this.state.branches;
        const branches = originalBranches.filter(d => d._id !== branch._id);
        this.setState({branches});

        try{
            await deleteBranch(branch._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This branch has already been deleted.');
            }
            this.setState({ branches: originalBranches })
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
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, branches: allBranches } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        let filtered = allBranches;
        if (searchQuery){
            filtered = allBranches.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allBranches.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const branches = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: branches }
    };



    render() { 
        const {length: count} = this.state.branches
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        // <Route exact path='/district/new' >
        //     <NewDistrict />
        // </Route>


        if (count === 0) {
            <p>There are no branches in the database.</p>;
            // <Link to="new" className="btn btn-primary" style={{ marginBottom: 20 }}>New District</Link>;

        } 


        const { totalCount, data: branches } = this.getPagedData();

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
                    <Link to="newbranch" className="btn btn-primary" style={{ marginBottom: 20 }}>New Branch</Link>
                    {/* <Link to="/branches/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New Claim</Link>
                    <Link to="/branches/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Easy Pay Filter</Link> */}
                    <p>Showing {totalCount} branches in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <BranchTable 
                        branches={branches} 
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

export default Branch;