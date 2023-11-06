import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getAnotherUserChannelDetailsApi = (
  token,
  userId,
  pageSize,
  pageNumber,
) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.another_user_channel_detail, token)
  return fetch(
    `${Config.API_URL}${
      endpoints.another_user_channel_detail
    }?user_id=${encodeURIComponent(
      userId,
    )}&page_size=${pageSize}&page=${pageNumber}`,
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
