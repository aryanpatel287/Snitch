import React, { useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useProduct } from '../../hooks/useProduct';
import ProductFormGroup from './ProductFormGroup';
import ImageUploadZone from './ImageUploadZone';
import '../../styles/product-dashboard/_create-variant.scss';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'];

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

function validate(priceAmount, priceCurrency, stock, attributes) {
    const errors = {};
    if (!priceAmount || Number(priceAmount) <= 0) {
        errors.priceAmount = 'Enter a valid price greater than 0.';
    }
    if (!priceCurrency) {
        errors.priceCurrency = 'Currency is required.';
    }
    if (
        stock === undefined ||
        stock === null ||
        stock === '' ||
        Number(stock) < 0
    ) {
        errors.stock = 'Stock must be a positive number.';
    }

    const hasValidAttribute = attributes.some(
        (attr) => attr.key.trim() !== '' && attr.value.trim() !== '',
    );
    if (!hasValidAttribute) {
        errors.attributes =
            'At least one attribute with a key and value is required.';
    }

    return errors;
}

const CreateVariant = ({ productId, onCancel, onSuccess }) => {
    const { handleCreateVariant, loading, error } = useProduct();

    const [priceAmount, setPriceAmount] = useState('');
    const [priceCurrency, setPriceCurrency] = useState('INR');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);

    // Dynamic attributes state, preloading size and color as examples
    const [attributes, setAttributes] = useState([
        { key: 'size', value: '' },
        { key: 'color', value: '' },
    ]);

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleAddAttribute = () => {
        setAttributes((prev) => [...prev, { key: '', value: '' }]);
    };

    const handleRemoveAttribute = (index) => {
        setAttributes((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAttributeChange = (index, field, value) => {
        setAttributes((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const validationErrors = validate(
            priceAmount,
            priceCurrency,
            stock,
            attributes,
        );
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        // Construct attributes map
        const attributesObj = {};
        attributes.forEach((attr) => {
            const trimmedKey = attr.key.trim();
            const trimmedVal = attr.value.trim();
            if (trimmedKey && trimmedVal) {
                attributesObj[trimmedKey] = trimmedVal;
            }
        });

        // Convert images to base64 to send in JSON body
        const processedImages = await Promise.all(
            images.map(async (img) => {
                const base64Str = await fileToBase64(img.file);
                return {
                    buffer: base64Str,
                    originalname: img.file.name,
                    alt: img.file.name,
                };
            }),
        );

        const variantData = {
            attributes: attributesObj,
            stock: Number(stock),
            price: {
                amount: Number(priceAmount),
                currency: priceCurrency,
            },
            images: processedImages,
        };

        const result = await handleCreateVariant(productId, variantData);
        if (result) {
            onSuccess();
        }
    };

    return (
        <div className="create-variant-container">
            <form
                onSubmit={handleSubmit}
                className="create-variant-form"
                noValidate
            >
                <div className="create-variant-form__layout">
                    {/* Left: General Variant Options & Images */}
                    <div className="create-variant-form__left">
                        <div className="form-card">
                            <span className="form-card__label">
                                Variant Pricing & Stock
                            </span>

                            <div className="premium-price-row">
                                <ProductFormGroup
                                    label="Currency"
                                    id="priceCurrency"
                                    type="select"
                                    options={CURRENCIES}
                                    value={priceCurrency}
                                    onChange={(e) =>
                                        setPriceCurrency(e.target.value)
                                    }
                                    error={errors.priceCurrency}
                                />

                                <ProductFormGroup
                                    label="Price Amount"
                                    id="priceAmount"
                                    type="number"
                                    value={priceAmount}
                                    onChange={(e) =>
                                        setPriceAmount(e.target.value)
                                    }
                                    error={errors.priceAmount}
                                />
                            </div>

                            <ProductFormGroup
                                label="Stock Quantity"
                                id="stock"
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                error={errors.stock}
                            />
                        </div>

                        <div className="form-card">
                            <span className="form-card__label">
                                Variant Images
                            </span>
                            <p className="form-card__hint">
                                Upload up to 7 images. The first image will be
                                the cover.
                            </p>
                            <ImageUploadZone
                                images={images}
                                onImagesChange={setImages}
                            />
                        </div>
                    </div>

                    {/* Right: Dynamic Attributes */}
                    <div className="form-card">
                        <div className="attributes-header">
                            <span className="form-card__label">
                                Variant Attributes
                            </span>
                            <button
                                type="button"
                                className="button secondary-button small-button add-attr-btn"
                                onClick={handleAddAttribute}
                            >
                                <Plus size={14} /> Add Attribute
                            </button>
                        </div>

                        <p className="form-card__hint">
                            Define features that distinguish this variant (e.g.
                            size: M, color: Black).
                        </p>

                        <div className="attributes-list">
                            {attributes.map((attr, index) => (
                                <div key={index} className="attribute-row">
                                    <div className="attribute-field">
                                        <input
                                            type="text"
                                            className="premium-input attr-key-input"
                                            placeholder="Attribute Key (e.g. size)"
                                            value={attr.key}
                                            onChange={(e) =>
                                                handleAttributeChange(
                                                    index,
                                                    'key',
                                                    e.target.value,
                                                )
                                            }
                                            aria-label={`Attribute Key ${index + 1}`}
                                        />
                                    </div>
                                    <span className="attribute-colon">:</span>
                                    <div className="attribute-field">
                                        <input
                                            type="text"
                                            className="premium-input attr-value-input"
                                            placeholder="Value (e.g. M)"
                                            value={attr.value}
                                            onChange={(e) =>
                                                handleAttributeChange(
                                                    index,
                                                    'value',
                                                    e.target.value,
                                                )
                                            }
                                            aria-label={`Attribute Value ${index + 1}`}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-attr-btn"
                                        onClick={() =>
                                            handleRemoveAttribute(index)
                                        }
                                        aria-label={`Remove attribute ${index + 1}`}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {errors.attributes && (
                            <span className="premium-error">
                                {errors.attributes}
                            </span>
                        )}
                    </div>
                </div>

                {/* ── API Error ────────────────────────────────────────────── */}
                {error && (
                    <div className="api-error" role="alert">
                        {error}
                    </div>
                )}

                {/* ── Actions ─────────────────────────────────────────────── */}
                <div className="create-variant-actions">
                    <button
                        type="button"
                        className="button secondary-button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="button primary-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="spin-icon" />
                                Creating…
                            </>
                        ) : (
                            'Create Variant'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVariant;
