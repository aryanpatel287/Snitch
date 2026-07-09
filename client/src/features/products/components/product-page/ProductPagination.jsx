import React from 'react';
import { useProductFilter } from '../../hooks/useProductFilter';
import '../../styles/_products-pagination.scss';

const ProductPagination = () => {
    const { currentPage, setCurrentPage, totalPages } = useProductFilter();

    if (totalPages <= 1) return null;

    return (
        <div className="products-pagination">
            <button
                className="products-pagination__btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
            >
                <i className="ri-arrow-left-line"></i> Previous
            </button>
            <div className="products-pagination__numbers">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        className={`products-pagination__num-btn ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button
                className="products-pagination__btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
            >
                Next <i className="ri-arrow-right-line"></i>
            </button>
        </div>
    );
};

export default ProductPagination;
