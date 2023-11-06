import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  prefetchLog,
  postFetchSuccessLog,
  postFetchFailureLog,
} from '@/Services/serviceUtils'

export const createAnnouncementApi = (token, requestBody) => {
  const requestOptions = {
    method: 'POST',
    body: requestBody,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.community_announcement, requestBody)

  return fetch(
    `${Config.API_URL}${endpoints.community_announcement}`,
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
