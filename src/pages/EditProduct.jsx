import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../api/products'
import { getErrorMessage } from '../api/client'
import ProductForm from '../components/ProductForm'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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

  const handleSubmit = async (formData) => {
    setSaving(true)
    setError('')
    try {
      const updated = await updateProduct(id, formData)
      navigate(`/products/${updated._id}`)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
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
        <Link to={`/products/${id}`}>{product.name}</Link>
        <span>/</span>
        <span>Edit</span>
      </div>

      <div className="page-header">
        <div>
          <h1>Edit Product</h1>
          <p className="page-subtitle">Update details for {product.name}.</p>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <div className="form-card">
        <ProductForm
          initialValues={{
            name: product.name,
            description: product.description,
            price: String(product.price),
            category: product.category,
            inStock: product.inStock,
            quantity: String(product.quantity),
          }}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
          loading={saving}
        />
      </div>
    </section>
  )
}
