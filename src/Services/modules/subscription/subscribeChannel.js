import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const subscibeChannel = (token, channelId) => {
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    body: channelId,
    headers: {
      Authorization: `token ${token}`,
    },
  }

  prefetchLog(endpoints.wallet, token)
  return fetch(`${Config.API_URL}${endpoints.subscribeChannel}`, requestOptions)
    .then(response => {
      console.log('ResponseInAPI Call', response)
      return response.json()
    })
    .then(result => {
      postFetchSuccessLog(result)
      return result
    })
    .catch(error => {
      postFetchFailureLog(error)
      throw error
    })
}
