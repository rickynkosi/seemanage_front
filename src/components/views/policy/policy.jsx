import React, { Component } from 'react';
// import ListGroup from '../common/listGroup';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { getGenres } from '../services/fakeGenreService';
import PolicyTable from './policyTable';
import { getPolicies, deletePolicy } from '../../../services/policyService'; 
import SearchBox from '../../common/searchBox';
import lodash from 'lodash';



class Policy extends Component {
    state = { 
        policies: [],
        // genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        // selectedGenre: null,
        sortColumn: { path: 'policyname', order: 'asc' }
    } 

    async componentDidMount() {
        // const genres = [{ _id: '', name: 'All Genres '}, ...getGenres()]
        // this.setState({ policies: getPolicies(), genres });

        const { data: policies } = await getPolicies();
        this.setState({ policies });
    }

    // handleDelete = (policy) => {
    //     const policies = this.state.policies.filter(p => p._id !== policy._id);
    //     this.setState({policies});
    // }

    handleDelete = async (policy) => {
        const originalpolicy = this.state.policies;
        const policies = originalpolicy.filter(d => d._id !== policy._id);
        this.setState({policies});

        try{
            await deletePolicy(policy._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                toast.error('This policy has already been deleted.');
            }
            this.setState({ policies: originalpolicy })
        }
    }

    // handleLike = (movie) => {
    //     const policies = [...this.state.policies];
    //     const index = policies.indexOf(movie);
    //     policies[index] = {...policies[index]};
    //     policies[index].liked = !policies[index].liked;
    //     this.setState({ policies })
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
        this.setState({ searchQuery: query,  currentPage: 1 });
    };

    getPagedData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, policies: allPolicies } = this.state;

        // const filtered = selectedGenre && selectedGenre._id ? allPolicies.filter(m => m.genre._id === selectedGenre._id) : allPolicies;

        let filtered = allPolicies;
        if (searchQuery){
            filtered = allPolicies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase()) 
            );
        }
        else if (selectedGenre && selectedGenre._id){
            filtered = allPolicies.filter(m => m.genre._id === selectedGenre._id);
        } 

        const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order] );

        const policies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: policies }
    };

    render() { 
        const {length: count} = this.state.policies;
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

        if (count === 0) return <p>There are no policies in the database.</p>;


        const { totalCount, data: policies } = this.getPagedData();

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
                    <Link to="newpolicy" className="btn btn-primary" style={{ marginBottom: 20 }}>New Policy</Link>
                    {/* <Link to="/policies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>New Claim</Link>
                    <Link to="/policies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>Easy Pay Filter</Link> */}
                    <p>Showing {totalCount} policies in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <PolicyTable 
                        policies={policies} 
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
 
export default Policy;