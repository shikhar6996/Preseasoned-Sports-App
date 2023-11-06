import axios, { AxiosInstance } from 'axios'

import { Config } from '@/Config'

const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async request => {
    console.log(
      '%c Starting api Request',
      'background: #33AAFF; color: #FFF',
      request,
    )
    return request
  },
  error => Promise.reject(error.message),
)

api.interceptors.response.use(
  response => {
    console.log('%c Response:', 'background: #009944; color: #FFF', response)
    return Promise.resolve(response)
  },
  error => {
    console.log('%c Response:', 'background: #DD0000; color: #FFF', error)
    return Promise.reject(error.response.data)
  },
)

export default api
