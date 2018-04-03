import React from 'react';
import propTypes from 'prop-types';

const Pagination = props => {
    let paginationItems = [],
        currentPage = props.currentPage;

    for(let i = 0; i < props.pagesTotal; i++){
        paginationItems.push(i + 1);
    }

    return (
        <nav aria-label="pagination">
            <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={props.prevPage}>
                    <span className="page-link">Previous</span>
                </li>
                {
                    paginationItems.map((item, i) => {
                        return (
                            <li key={'page_' + item} className={`page-item ${currentPage === item ? 'active' : ''}`} onClick={event => props.selectPage(event, item)}>
                                <a className="page-link" href="#0">{i + 1}</a>
                            </li>
                        )
                    })
                }
                <li className={`page-item ${currentPage === paginationItems.length ? 'disabled' : ''}`} onClick={props.nextPage}>
                    <span className="page-link">Next</span>
                </li>
            </ul>
        </nav>
    )
};

Pagination.propTypes = {
    pagesTotal: propTypes.number,
    currentPage: propTypes.number,
    prevPage: propTypes.func,
    nextPage: propTypes.func,
    selectPage: propTypes.func
};

export default Pagination;