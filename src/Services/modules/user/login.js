import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const loginUser = requestBody => {
  const requestOptions = {
    method: 'POST',
    body: requestBody,
    redirect: 'follow',
  }
  prefetchLog(endpoints.login, requestBody)
  return fetch(`${Config.API_URL}${endpoints.login}`, requestOptions)
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
