import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  prefetchLog,
  postFetchSuccessLog,
  postFetchFailureLog,
} from '@/Services/serviceUtils'

export const threadNewMessageUpdateApi = (token, requestBody) => {
  const requestOptions = {
    method: 'POST',
    body: requestBody,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.chat_update_thread_message_status, requestBody)

  return fetch(`${Config.API_URL}${endpoints.chat_update_thread_message_status}`, requestOptions)
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
