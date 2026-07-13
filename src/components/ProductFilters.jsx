import { CATEGORIES, CATEGORY_LABELS } from '../constants/categories'

const EMPTY_FILTERS = {
  category: '',
  inStock: '',
  minPrice: '',
  maxPrice: '',
}

export default function ProductFilters({ filters, onChange, onReset }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ ...filters, [name]: value })
  }

  const hasFilters = Object.values(filters).some(Boolean)

  return (
    <form className="filters" onSubmit={(e) => e.preventDefault()}>
      <div className="filters-grid">
        <label>
          Category
          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">All categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Stock
          <select name="inStock" value={filters.inStock} onChange={handleChange}>
            <option value="">Any</option>
            <option value="true">In stock</option>
            <option value="false">Out of stock</option>
          </select>
        </label>
        <label>
          Min price
          <input
            type="number"
            name="minPrice"
            min="0"
            step="0.01"
            placeholder="0"
            value={filters.minPrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Max price
          <input
            type="number"
            name="maxPrice"
            min="0"
            step="0.01"
            placeholder="Any"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </label>
      </div>
      {hasFilters && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onReset(EMPTY_FILTERS)}>
          Clear filters
        </button>
      )}
    </form>
  )
}
