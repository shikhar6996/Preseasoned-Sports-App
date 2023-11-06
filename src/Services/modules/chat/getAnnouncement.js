import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getAnnouncementlistApi = (
  token,
  channelId,
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
  prefetchLog(endpoints.community_announcement, requestOptions, channelId)
  return fetch(
    `${Config.API_URL}${endpoints.community_announcement}?channel_id=${channelId}&page_size=${pageSize}&page=${pageNumber}`,
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
