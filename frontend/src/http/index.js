import Axios from 'axios'

// Create Api
const api = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Get Requests
export const getRooms = () => api.get('/api/rooms')

// Post Requests
export const sendOtp = data => api.post('/api/send-otp', data)
export const verifyOtp = data => api.post('/api/verify-otp', data)
export const activate = data => api.post('/api/activate', data)
export const createRoomApi = data => api.post('/api/rooms', data)
export const logout = () => api.post('/api/logout')

// Interceptors
api.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true
      try {
        await Axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true
        })

        return api.request(originalRequest)
      } catch (err) {
        console.log(err.message)
      }
    }
    throw error
  }
)

export default api
