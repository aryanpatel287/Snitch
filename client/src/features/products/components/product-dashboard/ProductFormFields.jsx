import React from 'react';
import ProductFormGroup from './ProductFormGroup';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'];

const ProductFormFields = ({ formData, errors, onChange, disabled = false }) => {
    return (
        <div className="product-form-fields">
            <ProductFormGroup
                label="Product Title"
                id="title"
                value={formData.title}
                onChange={onChange}
                error={errors.title}
                disabled={disabled}
            />

            <ProductFormGroup
                label="Description"
                id="description"
                type="textarea"
                value={formData.description}
                onChange={onChange}
                error={errors.description}
                disabled={disabled}
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
                    disabled={disabled}
                />

                <ProductFormGroup
                    label="Price Amount"
                    id="priceAmount"
                    type="number"
                    value={formData.priceAmount}
                    onChange={onChange}
                    error={errors.priceAmount}
                    disabled={disabled}
                />
            </div>
            {(errors.priceAmount || errors.priceCurrency) && (
                <span className="premium-error global-price-error">
                    Please check the pricing details.
                </span>
            )}
        </div>
    );
};

export default ProductFormFields;
