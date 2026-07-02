import React from 'react';
import ProductFormGroup from './ProductFormGroup';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'];

const ProductFormFields = ({ formData, errors, onChange }) => {
  return (
    <div className="product-form-fields">
      <ProductFormGroup
        label="Product Title"
        id="title"
        value={formData.title}
        onChange={onChange}
        error={errors.title}
      />

      <ProductFormGroup
        label="Description"
        id="description"
        type="textarea"
        value={formData.description}
        onChange={onChange}
        error={errors.description}
      />

      <div className="premium-price-row">
        <ProductFormGroup
          label="Currency"
          id="priceCurrency"
          type="select"
          options={CURRENCIES}
          value={formData.priceCurrency}
          onChange={onChange}
          error={errors.priceCurrency}
        />

        <ProductFormGroup
          label="Price Amount"
          id="priceAmount"
          type="number"
          value={formData.priceAmount}
          onChange={onChange}
          error={errors.priceAmount}
        />
      </div>
      {(errors.priceAmount || errors.priceCurrency) && (
        <span className="premium-error global-price-error">
          Please check the pricing details.
        </span>
      )}

      <ProductFormGroup
        label="Stock Quantity"
        id="stock"
        type="number"
        value={formData.stock}
        onChange={onChange}
        error={errors.stock}
      />
    </div>
  );
};

export default ProductFormFields;
