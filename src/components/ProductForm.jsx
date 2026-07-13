import { useState } from 'react'
import { CATEGORIES, CATEGORY_LABELS } from '../constants/categories'

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: 'electronics',
  inStock: true,
  quantity: '0',
}

export default function ProductForm({ initialValues, onSubmit, submitLabel, loading }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initialValues })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      inStock: form.inStock,
      quantity: Number(form.quantity),
    })
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field span-2">
          Name <span className="required">*</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="Wireless Mouse"
          />
        </label>
        <label className="form-field span-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={500}
            rows={3}
            placeholder="Short product description"
          />
        </label>
        <label className="form-field">
          Price <span className="required">*</span>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="29.99"
          />
        </label>
        <label className="form-field">
          Quantity
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="0"
            step="1"
          />
        </label>
        <label className="form-field">
          Category <span className="required">*</span>
          <select name="category" value={form.category} onChange={handleChange} required>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field checkbox-field">
          <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
          In stock
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
