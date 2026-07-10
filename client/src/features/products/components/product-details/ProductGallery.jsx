import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FullScreenPreview from './FullScreenPreview';
import '../../styles/product-details/_product-gallery.scss';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect width="600" height="800" fill="%23f5f5f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="14" fill="%23000">NO PRODUCT IMAGES AVAILABLE</text></svg>';

const ProductGallery = ({ images = [], title }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        setActiveIndex(0);
    }, [images]);

    const hasImages = images && images.length > 0;
    const currentImage = hasImages ? images[activeIndex]?.url : PLACEHOLDER_IMAGE;
    const currentAlt = hasImages ? (images[activeIndex]?.alt || `${title} - Image ${activeIndex + 1}`) : title;

    const handlePrev = (e) => {
        e.stopPropagation();
        setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
    };

    const handleImageClick = () => {
        if (hasImages) {
            setIsPreviewOpen(true);
        }
    };

    return (
        <div className="product-gallery">
            {hasImages && images.length > 1 && (
                <div className="product-gallery__thumbnails">
                    {images.map((img, idx) => (
                        <button
                            key={img._id || idx}
                            className={`product-gallery__thumb-btn ${idx === activeIndex ? 'product-gallery__thumb-btn--active' : ''}`}
                            onClick={() => setActiveIndex(idx)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            type="button"
                            aria-label={`View image ${idx + 1}`}
                        >
                            <img
                                src={img.thumbnailUrl || img.url}
                                alt={img.alt || `${title} thumbnail ${idx + 1}`}
                                className="product-gallery__thumb-img"
                            />
                        </button>
                    ))}
                </div>
            )}

            <div className="product-gallery__main-wrapper" onClick={handleImageClick} style={{ cursor: hasImages ? 'zoom-in' : 'default' }}>
                <img
                    src={currentImage}
                    alt={currentAlt}
                    className="product-gallery__main-img"
                />

                {hasImages && images.length > 1 && (
                    <>
                        <button
                            type="button"
                            className="product-gallery__nav-arrow product-gallery__nav-arrow--left"
                            onClick={handlePrev}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={18} strokeWidth={1.5} />
                        </button>
                        <button
                            type="button"
                            className="product-gallery__nav-arrow product-gallery__nav-arrow--right"
                            onClick={handleNext}
                            aria-label="Next image"
                        >
                            <ChevronRight size={18} strokeWidth={1.5} />
                        </button>
                    </>
                )}
            </div>

            {isPreviewOpen && (
                <FullScreenPreview
                    images={images}
                    activeIndex={activeIndex}
                    onClose={() => setIsPreviewOpen(false)}
                    onChangeActiveIndex={setActiveIndex}
                />
            )}
        </div>
    );
};

export default ProductGallery;
