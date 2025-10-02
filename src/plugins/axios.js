import axios from "axios"

const api = axios.create({
  baseURL: "https://www.sankavollerei.com/",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor Request
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor Response
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
