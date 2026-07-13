import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || ''

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export function getErrorMessage(error) {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.response?.data?.errors) {
    return Object.values(error.response.data.errors).join(', ')
  }
  if (error.message) {
    return error.message
  }
  return 'Something went wrong. Please try again.'
}
