/* Packages */
import { AxiosInstance, AxiosResponse, default as instance } from 'axios'

const axiosLoginInstance: AxiosInstance = instance.create({
  baseURL: import.meta.env.VITE_BE_URL,
  timeout: 60 * 1000
})

axiosLoginInstance.interceptors.request.use(async (config) => {
  return config
})

axiosLoginInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export default axiosLoginInstance
