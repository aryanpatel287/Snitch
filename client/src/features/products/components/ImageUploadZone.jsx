import React, { useRef, useState, useCallback } from 'react';
import { Upload, ImagePlus } from 'lucide-react';
import ImagePreviewCard from './ImagePreviewCard';
import '../styles/_image-upload.scss';

const MAX_IMAGES = 7;

const ImageUploadZone = ({ images, onImagesChange }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const addFiles = useCallback(
    (files) => {
      const remaining = MAX_IMAGES - images.length;
      if (remaining <= 0) return;

      const valid = Array.from(files)
        .filter((f) => f.type.startsWith('image/'))
        .slice(0, remaining)
        .map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        }));

      onImagesChange([...images, ...valid]);
    },
    [images, onImagesChange]
  );

  const handleFileInputChange = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleRemove = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
  };

  // ── Reorder (drag-and-drop between cards) ──────────────────────────────────
  const handleCardDragStart = (index) => setDraggingIndex(index);
  const handleCardDragEnter = (index) => setDragOverIndex(index);
  const handleCardDrop = (e, dropIndex) => {
    e.stopPropagation();
    if (draggingIndex === null || draggingIndex === dropIndex) return;

    const reordered = [...images];
    const [moved] = reordered.splice(draggingIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    onImagesChange(reordered);
    setDraggingIndex(null);
    setDragOverIndex(null);
  };
  const handleCardDragEnd = () => {
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const remaining = MAX_IMAGES - images.length;
  const isAtLimit = remaining === 0;

  return (
    <div className="image-upload-zone">
      {/* Hidden input moved here so it stays mounted and the ref works even when the big drop area is hidden */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="upload-input"
        onChange={handleFileInputChange}
      />

      {/* Drop area – only visible when no images exist */}
      {images.length === 0 && (
        <div
          className={`upload-drop-area${isDragging ? ' is-dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          aria-label="Upload product images"
        >
          <div className="upload-drop-area__inner">
            <div className="upload-drop-area__icon">
              {isDragging ? <Upload size={28} /> : <ImagePlus size={28} />}
            </div>
            <p className="upload-drop-area__title">
              {isDragging ? 'Drop your images here' : 'Drag & drop images'}
            </p>
            <p className="upload-drop-area__sub">
              or <span className="upload-link">browse files</span>
            </p>
            <p className="upload-drop-area__limit">
              {remaining} of {MAX_IMAGES} slots remaining · PNG, JPG, WEBP
            </p>
          </div>
        </div>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="image-preview-grid">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`image-preview-wrapper${dragOverIndex === index ? ' drag-over' : ''}${draggingIndex === index ? ' is-dragging' : ''}`}
              draggable
              onDragStart={() => handleCardDragStart(index)}
              onDragEnter={() => handleCardDragEnter(index)}
              onDrop={(e) => handleCardDrop(e, index)}
              onDragEnd={handleCardDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <ImagePreviewCard
                image={image}
                index={index}
                onRemove={handleRemove}
              />
            </div>
          ))}

          {/* Add-more tile when under limit */}
          {!isAtLimit && (
            <button
              type="button"
              className="image-add-more"
              onClick={() => inputRef.current?.click()}
              aria-label="Add more images"
            >
              <ImagePlus size={20} />
              <span>Add more</span>
            </button>
          )}
        </div>
      )}

      {isAtLimit && (
        <p className="upload-limit-notice">
          Maximum of {MAX_IMAGES} images reached.
        </p>
      )}
    </div>
  );
};

export default ImageUploadZone;
