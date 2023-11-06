import { Config } from '@/Config'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const deleteSendbirdMessageApi = async (channelUrl, messageId) => {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
    headers: {
      'Api-Token': Config.SENDBIRD_API_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
  const endpointUrl = `https://api-${Config.SENDBIRD_APP_ID}.sendbird.com/v3/group_channels/${channelUrl}/messages/${messageId}`
  prefetchLog(endpointUrl)
  try {
    const response = await fetch(endpointUrl, requestOptions)
    const result1 = await response.json()
    postFetchSuccessLog(result1)
    return result1
  } catch (error) {
    postFetchFailureLog(error)
    throw error
  }
}
