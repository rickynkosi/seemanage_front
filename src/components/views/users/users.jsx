import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import { toast } from 'react-toastify';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import UsersTable from './usersTable';
import SearchBox from '../../common/searchBox';
// import { getUsers, deleteUser } from '../../../services/userService'; 
// import { getPolicies } from '../../services/policyService';


class Users extends Component {
    state = { 
        users: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        sortColumn: { path: 'fullname', order: 'asc' }
    } 

    async componentDidMount() {
        // const { data } = await getPolicies();
        // const policies = [{ _id: '', policyName: 'All Policies '}, ...data];

        // const { data: users } = await getUsers();
        // this.setState({ users });
    }

    handleDelete = async(user) => {
        const originalUsers = this.state.users;
        const users = originalUsers.filter(u => u._id !== user._id);
        this.setState({users});

        try{
            // await deleteUser(user._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This user has already been deleted.');
            }
            this.setState({ users: originalUsers })
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

    handlePolicySelect = (policy) => {
        this.setState({ selectedPolicy: policy, searchQuery: "", currentPage: 1 })
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, selectedPolicy: null, currentPage: 1 });
    };

    getPagedData = () => {
        const { pageSize, currentPage, selectedPolicy, sortColumn, searchQuery, users: allUsers } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allUsers.filter(m => m.genre._id === selectedGenre._id) : allUsers;

        let filtered = allUsers;
        if (searchQuery){
            filtered = allUsers.filter(u => u.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }
        else if (selectedPolicy && selectedPolicy._id){
            filtered = allUsers.filter(m => m.genre._id === selectedPolicy._id)
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] )

        const users = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: users }
    };

    render() { 
        const {length: count} = this.state.users
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        if (count === 0) {
            <Link to="newuser" className="btn btn-primary" style={{ marginBottom: 20 }}>New User</Link>;
            <p>There are no users in the database.</p>;
        }


        const { totalCount, data: users } = this.getPagedData();

        return (
            <div className='row'>
                <div className="col-3">
                    {/* <ListGroup 
                        items={this.state.genres} 
                        selectedItem={this.state.selectedPolicy}
                        onItemSelect={this.handlePolicySelect}
                    /> */}
                </div>
                <div className="col">
                    <Link to="/users/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New User</Link>
                    <p>Showing {totalCount} users in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <UsersTable 
                        Users={users} 
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
 
export default Users;