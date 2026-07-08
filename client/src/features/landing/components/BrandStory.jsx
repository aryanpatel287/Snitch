import React from 'react';
import { Link } from 'react-router';

const BrandStory = () => {
    return (
        <section id="story" className="dress-style-section">
            <div className="dress-style">
                <h2 className="dress-style__title">BROWSE BY DRESS STYLE</h2>
                
                <div className="dress-style__grid">
                    <Link to="/products?style=casual" className="dress-style__card dress-style__card--small">
                        <img src="https://ik.imagekit.io/ji8wynr3i/snitch/landing/dress_style_casual_mghtwgPyX.png" alt="Casual style" className="dress-style__img" />
                        <span className="dress-style__name">Casual</span>
                    </Link>

                    <Link to="/products?style=formal" className="dress-style__card dress-style__card--wide">
                        <img src="https://ik.imagekit.io/ji8wynr3i/snitch/landing/dress_style_formal_s6rGN6vO5.png" alt="Formal style" className="dress-style__img" />
                        <span className="dress-style__name">Formal</span>
                    </Link>

                    <Link to="/products?style=party" className="dress-style__card dress-style__card--wide">
                        <img src="https://ik.imagekit.io/ji8wynr3i/snitch/landing/dress_style_party_no_jacket_4C67GaBAR.png" alt="Party style" className="dress-style__img" />
                        <span className="dress-style__name">Party</span>
                    </Link>

                    <Link to="/products?style=gym" className="dress-style__card dress-style__card--small">
                        <img src="https://ik.imagekit.io/ji8wynr3i/snitch/landing/dress_style_gym_ys-XFX_vv.png" alt="Gym style" className="dress-style__img" />
                        <span className="dress-style__name">Gym</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BrandStory;
