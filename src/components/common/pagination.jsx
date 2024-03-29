import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    console.log(currentPage); 

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount === 1) return null;
    const pages = lodash.range(1, pagesCount + 1)

    return( 
    <nav>
        <ul className="pagination">
            {pages.map(page => (
                <li key={page} className={page === currentPage ? 'page-item active': 'page-item'}>
                    <a  className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                </li>
            ))}
        </ul>
    </nav>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    onPageChange: PropTypes.number.isRequired, 
    currentPage: PropTypes.func.isRequired
};
 
export default Pagination;