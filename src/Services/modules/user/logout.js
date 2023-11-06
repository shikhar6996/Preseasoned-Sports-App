import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const logoutService = token => {
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.logout, requestOptions)
  return fetch(`${Config.API_URL}${endpoints.logout}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      postFetchSuccessLog(result)
      return result
    })
    .catch(error => {
      postFetchFailureLog(error)
      throw error
    })
}
