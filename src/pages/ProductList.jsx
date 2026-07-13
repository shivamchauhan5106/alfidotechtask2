import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, deleteProduct } from '../api/products'
import { getErrorMessage } from '../api/client'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'
import ConfirmDialog from '../components/ConfirmDialog'

const EMPTY_FILTERS = {
  category: '',
  inStock: '',
  minPrice: '',
  maxPrice: '',
}

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchProducts(filters)
      setProducts(data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteProduct(deleteTarget._id)
      setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id))
      setDeleteTarget(null)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p className="page-subtitle">Browse, filter, and manage your product catalog.</p>
        </div>
        <Link to="/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <ProductFilters filters={filters} onChange={setFilters} onReset={setFilters} />

      {error && <ErrorAlert message={error} onRetry={loadProducts} />}

      {loading ? (
        <LoadingSpinner label="Loading products..." />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products found.</p>
          <Link to="/products/new" className="btn btn-primary">
            Create your first product
          </Link>
        </div>
      ) : (
        <>
          <p className="result-count">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onDelete={setDeleteTarget} />
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </section>
  )
}
