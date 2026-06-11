import React from 'react';

const Collection = () => {
    const items = [
        {
            id: 1,
            name: '01 / ONYX TAILORED BLAZER',
            price: '$420.00',
            image: '/onyx_blazer.png',
            badge: 'New'
        },
        {
            id: 2,
            name: '02 / RAW LINEN OVERSHIRT',
            price: '$180.00',
            image: '/linen_overshirt.png',
            badge: 'Essential'
        }
    ];

    return (
        <section id="collections" className="collection">
            <div className="collection__header">
                <div className="section-header-line">
                    <span className="section-header-line__label">01 / Curation</span>
                    <span className="section-header-line__rule"></span>
                </div>
                <h2 className="collection__title">EDITORIAL SELECTIONS</h2>
            </div>
            
            <div className="collection__grid">
                {items.map((item) => (
                    <article key={item.id} className="collection__card">
                        <div className="collection__card-media">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="collection__card-img"
                            />
                            {item.badge && (
                                <span className="collection__card-badge">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        <div className="collection__card-details">
                            <h3 className="collection__card-name">{item.name}</h3>
                            <span className="collection__card-price">{item.price}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Collection;
