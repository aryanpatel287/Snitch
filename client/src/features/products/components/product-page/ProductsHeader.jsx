import React from 'react';
import '../styles/_products-header.scss';

const ProductsHeader = ({ totalCount }) => {
    return (
        <header className="products-header">
            <div className="section-header-line">
                <span className="section-header-line__label">01 / CATALOGUE</span>
                <span className="section-header-line__rule"></span>
            </div>
            <div className="products-header__content">
                <h1 className="products-header__title">ALL PRODUCTS</h1>
                <div className="products-header__count">
                    <span>INDEX / {totalCount} ITEMS</span>
                </div>
            </div>
        </header>
    );
};

export default ProductsHeader;
