/* Packages */
import { AxiosInstance, AxiosResponse, default as instance } from 'axios'

const axiosBaseInstance: AxiosInstance = instance.create({
  baseURL: `${import.meta.env.VITE_BE_URL}/api`,
  timeout: 60 * 1000
})

axiosBaseInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token') as string

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosBaseInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export default axiosBaseInstance
