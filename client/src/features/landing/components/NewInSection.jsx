import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const NEW_ARRIVALS = [
    {
        id: 1,
        name: 'Linen Overshirt',
        price: '₹2,199',
        img: '/linen_overshirt.png',
    },
    {
        id: 2,
        name: 'Washed Denim Jacket',
        price: '₹3,499',
        img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Terry Polo',
        price: '₹1,499',
        img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'Relaxed Chino',
        price: '₹2,599',
        img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80&auto=format&fit=crop',
    },
];

const NewInSection = () => {
    const sectionRef = useScrollReveal();

    return (
        <section
            id="new-in"
            className="new-in"
            aria-label="New Arrivals"
            ref={sectionRef}
        >
            <div className="new-in__inner">
                <div className="section-header">
                    <p className="section-header__overline reveal">Just Landed</p>
                    <h2 className="section-header__title reveal">New In</h2>
                </div>

                <div className="new-in__grid">
                    {NEW_ARRIVALS.map((p) => (
                        <article key={p.id} className="new-in__card reveal">
                            <div className="new-in__card-img">
                                <img src={p.img} alt={p.name} loading="lazy" />
                                <span className="new-in__badge" aria-label="Just Dropped">
                                    Just Dropped
                                </span>
                            </div>
                            <div className="new-in__card-info">
                                <h3 className="new-in__card-name">{p.name}</h3>
                                <p className="new-in__card-price">{p.price}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewInSection;
