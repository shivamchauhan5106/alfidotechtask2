import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchProduct, deleteProduct } from '../api/products'
import { getErrorMessage } from '../api/client'
import { CATEGORY_LABELS } from '../constants/categories'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'
import ConfirmDialog from '../components/ConfirmDialog'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

function formatDate(date) {
  return new Date(date).toLocaleString()
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const loadProduct = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchProduct(id)
      setProduct(data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadProduct()
  }, [loadProduct])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteProduct(id)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
      setConfirmOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading product..." />

  if (error && !product) {
    return (
      <section className="page">
        <ErrorAlert message={error} onRetry={loadProduct} />
        <Link to="/" className="btn btn-secondary">
          Back to products
        </Link>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="breadcrumb">
        <Link to="/">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      {error && <ErrorAlert message={error} />}

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className={`badge badge-${product.category}`}>{CATEGORY_LABELS[product.category]}</span>
            <h1>{product.name}</h1>
          </div>
          <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        {product.description && <p className="detail-desc">{product.description}</p>}

        <dl className="detail-grid">
          <div>
            <dt>Price</dt>
            <dd className="price-lg">{formatPrice(product.price)}</dd>
          </div>
          <div>
            <dt>Quantity</dt>
            <dd>{product.quantity}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{CATEGORY_LABELS[product.category]}</dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>{formatDate(product.createdAt)}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{formatDate(product.updatedAt)}</dd>
          </div>
        </dl>

        <div className="detail-actions">
          <Link to={`/products/${id}/edit`} className="btn btn-primary">
            Edit product
          </Link>
          <button type="button" className="btn btn-danger" onClick={() => setConfirmOpen(true)}>
            Delete product
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to list
          </Link>
        </div>
      </article>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete product"
        message={`Are you sure you want to delete "${product.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </section>
  )
}
