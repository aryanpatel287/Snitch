import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import ProductFormFields from '../components/ProductFormFields';
import '../styles/_edit-product.scss';

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

const EditProduct = ({ productId, onCancel, onSuccess, onAddVariant }) => {
    const navigate = useNavigate();
    const {
        handleGetActiveProduct,
        handleUpdateProduct,
        activeProduct,
        loading,
        error,
    } = useProduct();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (productId) {
            handleGetActiveProduct(productId);
        }
    }, [productId]);

    useEffect(() => {
        if (activeProduct && activeProduct._id === productId) {
            setFormData({
                title: activeProduct.title || '',
                description: activeProduct.description || '',
                priceAmount: activeProduct.price?.amount || '',
                priceCurrency: activeProduct.price?.currency || 'INR',
            });
        }
    }, [activeProduct, productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (submitted) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const hasChanges =
        activeProduct &&
        (formData.title !== (activeProduct.title || '') ||
            formData.description !== (activeProduct.description || '') ||
            formData.priceAmount.toString() !==
                (activeProduct.price?.amount || '').toString() ||
            formData.priceCurrency !==
                (activeProduct.price?.currency || 'INR'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const updatedData = {
            title: formData.title,
            description: formData.description,
            price: {
                amount: Number(formData.priceAmount),
                currency: formData.priceCurrency,
            },
        };

        const result = await handleUpdateProduct(productId, updatedData);
        if (result) {
            onSuccess();
        }
    };

    return (
        <div className="edit-product-page edit-product-page--embedded">
            <div className="edit-product-page__inner">
                {/* ── Form ────────────────────────────────────────────────────── */}
                <form
                    className="edit-product-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="edit-product-form__layout">
                        {/* Left: fields */}
                        <section className="edit-product-form__fields">
                            <div className="form-card">
                                <ProductFormFields
                                    formData={formData}
                                    errors={errors}
                                    onChange={handleChange}
                                />
                            </div>
                        </section>

                        {/* Right: variants list */}
                        <section className="edit-product-form__variants">
                            <div className="variants-section form-card">
                                <div className="variants-section__header">
                                    <p className="form-card__label">
                                        Product Variants
                                    </p>
                                    <button
                                        type="button"
                                        className="button primary-button small-button"
                                        onClick={onAddVariant}
                                    >
                                        + Add Variant
                                    </button>
                                </div>

                                {activeProduct &&
                                activeProduct.variants &&
                                activeProduct.variants.length > 0 ? (
                                    <div className="variants-table-wrapper">
                                        <table className="variants-table">
                                            <thead>
                                                <tr>
                                                    <th>Attributes</th>
                                                    <th>Price</th>
                                                    <th>Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activeProduct.variants.map(
                                                    (v, idx) => (
                                                        <tr key={v._id || idx}>
                                                            <td className="variant-attrs-td">
                                                                {v.attributes ? (
                                                                    Object.entries(
                                                                        v.attributes,
                                                                    ).map(
                                                                        ([
                                                                            key,
                                                                            val,
                                                                        ]) => (
                                                                            <span
                                                                                key={
                                                                                    key
                                                                                }
                                                                                className="variant-attr-badge"
                                                                            >
                                                                                <strong>
                                                                                    {
                                                                                        key
                                                                                    }

                                                                                    :
                                                                                </strong>{' '}
                                                                                {
                                                                                    val
                                                                                }
                                                                            </span>
                                                                        ),
                                                                    )
                                                                ) : (
                                                                    <span className="variant-no-attr">
                                                                        No
                                                                        attributes
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {v.price
                                                                    ?.currency ===
                                                                'INR'
                                                                    ? '₹'
                                                                    : ''}
                                                                {
                                                                    v.price
                                                                        ?.amount
                                                                }
                                                            </td>
                                                            <td>{v.stock}</td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="variants-empty-state">
                                        <p>
                                            No variants listed for this product.
                                            Click "Add Variant" above to create
                                            one.
                                        </p>
                                    </div>
                                )}
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
                    <div className="edit-product-actions">
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
                            disabled={loading || !hasChanges}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="spin-icon" />
                                    Saving…
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
