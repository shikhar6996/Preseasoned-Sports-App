import { Config } from '@/Config'
import { store } from '@/Store'
import axios from 'axios'
import { get } from 'lodash'
const apiSecure = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
apiSecure.interceptors.request.use(
  async request => {
    const state = store.getState()
    const accessToken = get(state, 'UserReducer.userData')
    if (accessToken) {
      request.headers = {
        ...request.headers,
        // Authorization: `token ${accessToken.token}`,
        Authorization: `token 0eea483b28c05c454db298aa578cfc84495716f9`,
      }
      console.log(
        '%c Added access token:',
        'background: #33AAFF; color: #FFF',
        accessToken,
      )
    } else {
      console.warn('Failed to inject accessToken')
    }
    return request
  },
  error => Promise.reject(error.message),
)
apiSecure.interceptors.response.use(
  response => {
    console.log('%c Response:', 'background: #009944; color: #FFF', response)
    return Promise.resolve(response)
  },
  error => {
    console.log('%c Response:', 'background: #DD0000; color: #FFF', error)
    if (error.response && error.response.data) {
      return Promise.reject(error.response?.data)
    }
    return Promise.reject(error.message)
  },
)
export default apiSecure
export const cancelToken = axios.CancelToken.source()
