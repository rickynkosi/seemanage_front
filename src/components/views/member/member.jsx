import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { getGenres } from '../services/fakeGenreService';
import MemberTable from './memberTable';
import { getMembers, deleteMember  } from '../../../services/memberService'; 
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';


class Member extends Component {
    state = { 
        members: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'lastname', order: 'asc' }
    } 

    async componentDidMount() {
    //     const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
    //     this.setState({ movies: getPolicies(), genres });

        const { data: members } = await getMembers();
        this.setState({ members });
    }

    handleDelete = async (member) => {
        const originalMembers = this.state.members;
        const members = originalMembers.filter(d => d._id !== member._id);
        this.setState({members});

        try{
            await deleteMember(member._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This member has already been deleted.');
            }
            this.setState({ members: originalMembers })
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
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, members: allMembers } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allMembers.filter(m => m.genre._id === selectedGenre._id) : allMembers;

        let filtered = allMembers;
        if (searchQuery){
            filtered = allMembers.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())    
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allMembers.filter(m => m.genre._id === selectedGenre._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const members = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: members }
    };

    render() { 
        const {length: count} = this.state.members
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        if (count === 0) {
            <p>There are no members in the database.</p>;
            // <Link to="newmember" className="btn btn-primary" style={{ marginBottom: 20 }}>New Member</Link>;
            // <Link to="newmember" className="btn btn-primary" style={{ marginBottom: 20 }}>Existing Member</Link>;
            // <Link to="/members/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Manage</Link>;
        } 


        const { totalCount, data: members } = this.getPagedData();
        

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
                    <Link to="newmember" className="btn btn-primary" style={{ marginBottom: 20 }}>New Member</Link>
                    <Link to="newmember" className="btn btn-primary" style={{ marginBottom: 20 }}>Existing Member</Link>
                    <Link to="/members/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Add Ext Member</Link>
                    <p>Showing {totalCount} members in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MemberTable 
                        members={members} 
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
 
export default Member;