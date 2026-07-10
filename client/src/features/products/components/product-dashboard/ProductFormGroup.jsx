import React from 'react';

const ProductFormGroup = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = ' ',
  error,
  options = [],
  rows = 5,
  disabled = false,
}) => {
  const isTextarea = type === 'textarea';
  const isSelect = type === 'select';

  return (
    <div className={`premium-form-group${error ? ' error' : ''}`}>
      <label className="premium-label" htmlFor={id}>
        {label}
      </label>
      
      {isTextarea ? (
        <textarea
          id={id}
          name={name || id}
          className="premium-textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
        />
      ) : isSelect ? (
        <select
          id={id}
          name={name || id}
          className="premium-select"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id={id}
          name={name || id}
          type={type}
          className="premium-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      
      {error && <span className="premium-error">{error}</span>}
    </div>
  );
};

export default ProductFormGroup;
