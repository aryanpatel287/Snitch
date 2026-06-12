import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import '../styles/_fullscreen-preview.scss';

const FullScreenPreview = ({ images = [], activeIndex, onClose, onChangeActiveIndex }) => {
    if (!images || images.length === 0) return null;

    const currentImage = images[activeIndex]?.url;
    const currentAlt = images[activeIndex]?.alt || `Product preview image ${activeIndex + 1}`;

    const handlePrev = (e) => {
        e.stopPropagation();
        onChangeActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        onChangeActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                onChangeActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
            } else if (e.key === 'ArrowRight') {
                onChangeActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [activeIndex, images.length, onClose, onChangeActiveIndex]);

    return (
        <div className="fullscreen-preview" onClick={onClose}>
            {/* Close button */}
            <button
                type="button"
                className="fullscreen-preview__close-btn"
                onClick={onClose}
                aria-label="Close fullscreen view"
            >
                <X size={24} strokeWidth={1.5} />
            </button>

            {/* Left Nav Button */}
            {images.length > 1 && (
                <button
                    type="button"
                    className="fullscreen-preview__nav-btn fullscreen-preview__nav-btn--left"
                    onClick={handlePrev}
                    aria-label="Previous image"
                >
                    <ChevronLeft size={36} strokeWidth={1} />
                </button>
            )}

            {/* Main Preview Image Container */}
            <div className="fullscreen-preview__image-container" onClick={(e) => e.stopPropagation()}>
                <img src={currentImage} alt={currentAlt} className="fullscreen-preview__img" />
            </div>

            {/* Right Nav Button */}
            {images.length > 1 && (
                <button
                    type="button"
                    className="fullscreen-preview__nav-btn fullscreen-preview__nav-btn--right"
                    onClick={handleNext}
                    aria-label="Next image"
                >
                    <ChevronRight size={36} strokeWidth={1} />
                </button>
            )}

            {/* Pagination/Meta */}
            <div className="fullscreen-preview__meta">
                <span>IMAGE {activeIndex + 1} / {images.length}</span>
            </div>
        </div>
    );
};

export default FullScreenPreview;
