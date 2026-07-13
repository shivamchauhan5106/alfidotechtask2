import { apiClient } from './client'

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams()
  if (filters.category) params.set('category', filters.category)
  if (filters.inStock !== '' && filters.inStock !== undefined) {
    params.set('inStock', String(filters.inStock))
  }
  if (filters.minPrice) params.set('minPrice', filters.minPrice)
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)

  const query = params.toString()
  const url = query ? `/api/products?${query}` : '/api/products'
  const { data } = await apiClient.get(url)
  return data.data
}

export async function fetchProduct(id) {
  const { data } = await apiClient.get(`/api/products/${id}`)
  return data.data
}

export async function createProduct(product) {
  const { data } = await apiClient.post('/api/products', product)
  return data.data
}

export async function updateProduct(id, product) {
  const { data } = await apiClient.put(`/api/products/${id}`, product)
  return data.data
}

export async function deleteProduct(id) {
  const { data } = await apiClient.delete(`/api/products/${id}`)
  return data.data
}
