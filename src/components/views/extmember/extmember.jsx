import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteExtMember, getExtMember } from '../../../services/extmemberService'; 
// import { getGenres } from '../services/fakeGenreService';
import ExtMemberTable from './extmemberTable';
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';
import Member from './../member/member';



class ExtMember extends Component {
    state = { 
        extmembers: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'firstname', order: 'asc' }
    } 

    async componentDidMount() {
        // const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
        // this.setState({ districts: getDistricts(), genres });

        const { data: extmembers } = await  getExtMember();
        this.setState({ extmembers })
    }

    handleDelete = async (extmember) => {
        const originalExtMembers = this.state.extmembers;
        const extmembers = originalExtMembers.filter(d => d._id !== extmember._id);
        this.setState({extmembers});

        try{
            await deleteExtMember(extmember._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This extmember has already been deleted.');
            }
            this.setState({ extmembers: originalExtMembers })
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
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, extmembers: allExtMembers } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        let filtered = allExtMembers;
        if (searchQuery){
            filtered = allExtMembers.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allExtMembers.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const extmembers = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: extmembers }
    };



    render() { 
        const {length: count} = this.state.extmembers
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        // <Route exact path='/district/new' >
        //     <NewDistrict />
        // </Route>


        if (count === 0) {
            <p>There are no extmembers in the database.</p>;
            // <Link to="new" className="btn btn-primary" style={{ marginBottom: 20 }}>New District</Link>;

        } 


        const { totalCount, data: extmembers } = this.getPagedData();

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
                    <Link to="newextmember" className="btn btn-primary" style={{ marginBottom: 20 }}>Add Ext Member</Link>
                    {/* <Link to="/extmembers/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New Claim</Link>
                    <Link to="/extmembers/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Easy Pay Filter</Link> */}
                    <p>Showing {totalCount} extmembers in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <ExtMemberTable 
                        extmembers={extmembers} 
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

export default ExtMember;