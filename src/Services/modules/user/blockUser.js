import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const blockUserService = (token, requestBody) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
    },
    body: requestBody,
  }
  prefetchLog(endpoints.common.blockUser, requestOptions)
  return fetch(`${Config.API_URL}${endpoints.common.blockUser}`, requestOptions)
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
