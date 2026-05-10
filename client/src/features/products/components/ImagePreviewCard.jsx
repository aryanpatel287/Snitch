import React from 'react';
import { X, GripVertical } from 'lucide-react';

const ImagePreviewCard = ({ image, index, onRemove, dragHandleProps }) => {
  return (
    <div
      className={`image-preview-card${index === 0 ? ' is-primary' : ''}`}
      {...dragHandleProps}
    >
      <div className="image-preview-card__thumb">
        <img src={image.preview} alt={`Product image ${index + 1}`} />
      </div>

      {index === 0 && (
        <span className="image-preview-card__badge">Cover</span>
      )}

      <button
        type="button"
        className="image-preview-card__remove"
        onClick={() => onRemove(index)}
        aria-label={`Remove image ${index + 1}`}
      >
        <X size={14} />
      </button>

      <div className="image-preview-card__drag-handle" aria-hidden="true">
        <GripVertical size={14} />
      </div>
    </div>
  );
};

export default ImagePreviewCard;
