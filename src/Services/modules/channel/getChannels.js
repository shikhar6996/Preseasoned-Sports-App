import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getChannels = (token, pageSize, pageNumber) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.channel, token)
  return fetch(
    `${Config.API_URL}${endpoints.channel}?page_size=${pageSize}&page=${pageNumber}`,
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
