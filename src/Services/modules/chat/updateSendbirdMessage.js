import { Config } from '@/Config'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const updateSendbirdMessage = (channelUrl, messageId, requestBody) => {
  const requestOptions = {
    method: 'PUT',
    body: requestBody,
    redirect: 'follow',
    headers: {
      'Api-Token': Config.SENDBIRD_API_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
  const endpointUrl = `https://api-${Config.SENDBIRD_APP_ID}.sendbird.com/v3/group_channels/${channelUrl}/messages/${messageId}`
  prefetchLog(endpointUrl, requestBody)
  return fetch(endpointUrl, requestOptions)
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
