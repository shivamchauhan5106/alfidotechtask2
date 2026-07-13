import { Link } from 'react-router-dom'
import { CATEGORY_LABELS } from '../constants/categories'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

export default function ProductCard({ product, onDelete }) {
  return (
    <article className="product-card">
      <div className="product-card-header">
        <span className={`badge badge-${product.category}`}>{CATEGORY_LABELS[product.category]}</span>
        <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </span>
      </div>
      <h3 className="product-card-title">
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      </h3>
      {product.description && <p className="product-card-desc">{product.description}</p>}
      <div className="product-card-meta">
        <span className="price">{formatPrice(product.price)}</span>
        <span className="quantity">Qty: {product.quantity}</span>
      </div>
      <div className="product-card-actions">
        <Link to={`/products/${product._id}`} className="btn btn-secondary btn-sm">
          View
        </Link>
        <Link to={`/products/${product._id}/edit`} className="btn btn-secondary btn-sm">
          Edit
        </Link>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(product)}>
          Delete
        </button>
      </div>
    </article>
  )
}
