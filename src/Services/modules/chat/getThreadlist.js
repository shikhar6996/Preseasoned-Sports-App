import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getThreadlistApi = (
  token,
  channelId,
  sortBy,
  pageNumber,
  pageSize,
) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.create_thread, requestOptions, {
    token,
    channelId,
    sortBy,
    pageNumber,
    pageSize,
  })
  return fetch(
    `${Config.API_URL}${endpoints.create_thread}?channel_id=${channelId}&sort_by=${sortBy}&page_size=${pageSize}&page=${pageNumber}`,
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
