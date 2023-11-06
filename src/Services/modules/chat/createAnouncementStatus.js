import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  prefetchLog,
  postFetchSuccessLog,
  postFetchFailureLog,
} from '@/Services/serviceUtils'

/**
 *
 * @param {*} token
 * @param {*} requestBody - formdata {announcement_id, type}
 * @returns api response
 */

export const createAnnouncementStatusApi = (token, requestBody) => {
  const requestOptions = {
    method: 'POST',
    body: requestBody,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.create_announcement_status, requestBody)

  return fetch(
    `${Config.API_URL}${endpoints.create_announcement_status}`,
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
