import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import ProductFormFields from '../components/ProductFormFields';
import ImageUploadZone from '../components/ImageUploadZone';
import '../styles/_create-product.scss';

const INITIAL_FORM = {
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
};

function validate(formData) {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Product title is required.';
    if (!formData.description.trim())
        errors.description = 'Description is required.';
    if (!formData.priceAmount || Number(formData.priceAmount) <= 0)
        errors.priceAmount = 'Enter a valid price greater than 0.';
    if (!formData.priceCurrency) errors.priceCurrency = 'Currency is required.';
    return errors;
}

const CreateProduct = ({ isEmbedded = false, onCancel, onSuccess }) => {
    const navigate = useNavigate();
    const { handleCreateProducts } = useProduct();
    const { loading, error } = useSelector((state) => state.product);

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (submitted) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('priceAmount', formData.priceAmount);
        data.append('priceCurrency', formData.priceCurrency);
        images.forEach((img) => data.append('images', img.file));

        const result = await handleCreateProducts(data);
        if (result && onSuccess) {
            onSuccess();
        }
    };

    return (
        <div className={`create-product-page ${isEmbedded ? 'create-product-page--embedded' : ''}`}>
            <div className="create-product-page__inner">
                {/* ── Header ──────────────────────────────────────────────────── */}
                {!isEmbedded ? (
                    <header className="create-product-header">
                        <button
                            type="button"
                            className="back-button"
                            onClick={() => navigate(-1)}
                            aria-label="Go back"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div className="create-product-header__text">
                            <h1 className="create-product-title">New Product</h1>
                            <p className="create-product-subtitle">
                                Fill in the details to list your product on Snitch.
                            </p>
                        </div>
                    </header>
                ) : null}

                {/* ── Form ────────────────────────────────────────────────────── */}
                <form
                    className="create-product-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="create-product-form__layout">
                        {/* Left: fields */}
                        <section className="create-product-form__fields">
                            <div className="form-card">
                                <ProductFormFields
                                    formData={formData}
                                    errors={errors}
                                    onChange={handleChange}
                                />
                            </div>
                        </section>

                        {/* Right: images */}
                        <section className="create-product-form__images">
                            <div className="form-card">
                                <p className="form-card__label">
                                    Product Images
                                </p>
                                <p className="form-card__hint">
                                    Upload up to 7 images. The first image will
                                    be the cover.
                                </p>
                                <ImageUploadZone
                                    images={images}
                                    onImagesChange={setImages}
                                />
                            </div>
                        </section>
                    </div>

                    {/* ── API Error ────────────────────────────────────────────── */}
                    {error && (
                        <div className="api-error" role="alert">
                            {error}
                        </div>
                    )}

                    {/* ── Actions ─────────────────────────────────────────────── */}
                    <div className="create-product-actions">
                        <button
                            type="button"
                            className="button secondary-button"
                            onClick={isEmbedded ? onCancel : () => navigate(-1)}
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
                                    Publishing…
                                </>
                            ) : (
                                'Publish Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
