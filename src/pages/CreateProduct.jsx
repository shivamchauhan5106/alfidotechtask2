import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct } from '../api/products'
import { getErrorMessage } from '../api/client'
import ProductForm from '../components/ProductForm'
import ErrorAlert from '../components/ErrorAlert'

export default function CreateProduct() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError('')
    try {
      const product = await createProduct(formData)
      navigate(`/products/${product._id}`)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page">
      <div className="breadcrumb">
        <Link to="/">Products</Link>
        <span>/</span>
        <span>New product</span>
      </div>

      <div className="page-header">
        <div>
          <h1>Add Product</h1>
          <p className="page-subtitle">Create a new product in the catalog.</p>
        </div>
      </div>

      {error && <ErrorAlert message={error} />}

      <div className="form-card">
        <ProductForm onSubmit={handleSubmit} submitLabel="Create product" loading={loading} />
      </div>
    </section>
  )
}
