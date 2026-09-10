// apiClient.js
import axios from 'axios'
import { allToasts } from './composables/toast'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 30000,
})

// 1. Request Interceptor: Runs before every API request leaves your app
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve token from your state management or storage
    const token = localStorage.getItem('user_token')

    if (token) {
      // Inject token securely into authorization header
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Handle request-side errors (e.g., network failure before sending)
    return Promise.reject(error)
  },
)

// 2. Response Interceptor: Runs when a response returns from the server
apiClient.interceptors.response.use(
  (response) => {
    // Return standard responses directly
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Check if error is 401 Unauthorized and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Mark request to prevent infinite loops

      try {
        // Attempt token refresh logic here
        const accessToken = await refreshAuthToken()
        localStorage.setItem('user_token', accessToken)

        // Update authorization header with the fresh token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        // Retry the exact request that originally failed
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh token expired or failed -> Log out user immediately
        localStorage.removeItem('user_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/auth'
        return Promise.reject(refreshError)
      }
    }

    // Pass along all other errors to your component catch blocks
    const message = error?.response?.data?.message || error.message
    allToasts.value.push({ type: 'error', title: message })
    console.log(Promise.reject(error), 'Promise.reject(error)')
    return Promise.reject(error)
  },
)

// Dummy helper function for structure visualization
async function refreshAuthToken() {
  const response = await axios.post(`${import.meta.env.VITE_APP_URL}/auth/refresh`, {
    refreshToken: localStorage.getItem('refresh_token'),
  })
  console.log(response.data.accessToken)
  return response.data.accessToken
}

export default apiClient
