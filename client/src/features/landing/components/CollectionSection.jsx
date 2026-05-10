import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const PRODUCTS = [
    {
        id: 1,
        tag: 'Structured Blazers',
        name: 'The Onyx Blazer',
        price: '₹4,999',
        img: '/onyx_blazer.png',
    },
    {
        id: 2,
        tag: 'Premium Tees',
        name: 'Essential Oversized Tee',
        price: '₹1,299',
        img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop',
    },
    {
        id: 3,
        tag: 'Cargo Trousers',
        name: 'Urban Cargo Pant',
        price: '₹2,799',
        img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80&auto=format&fit=crop',
    },
];

const CollectionSection = () => {
    const sectionRef = useScrollReveal();

    return (
        <section
            id="collection"
            className="collection"
            aria-label="Featured Collection"
            ref={sectionRef}
        >
            <div className="collection__inner">
                <div className="section-header">
                    <p className="section-header__overline reveal">The Edit</p>
                    <h2 className="section-header__title reveal">The Collection</h2>
                </div>

                <div className="collection__grid">
                    {PRODUCTS.map((p) => (
                        <article key={p.id} className="collection__card reveal">
                            <div className="collection__card-img">
                                <img src={p.img} alt={p.name} loading="lazy" />
                            </div>
                            <p className="collection__card-tag">{p.tag}</p>
                            <h3 className="collection__card-name">{p.name}</h3>
                            <p className="collection__card-price">{p.price}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectionSection;
