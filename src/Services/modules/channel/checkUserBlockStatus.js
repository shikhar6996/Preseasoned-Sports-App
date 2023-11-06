import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getUserBlockStatus = (token, threadId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.common.checkUserBlockStatus, token)
  return fetch(
    `${Config.API_URL}${endpoints.common.checkUserBlockStatus}?thread_id=${threadId}`,
    requestOptions,
  )
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
