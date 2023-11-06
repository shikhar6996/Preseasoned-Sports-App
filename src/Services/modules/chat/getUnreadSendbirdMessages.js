import { Config } from '@/Config'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getUnreadSendbirdMessage = async (channelUrl, userId) => {
  const requestOptions = {
    method: 'GET',

    redirect: 'follow',
    headers: {
      'Api-Token': Config.SENDBIRD_API_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
  const endpointUrl = `https://api-${Config.SENDBIRD_APP_ID}.sendbird.com/v3/group_channels/${channelUrl}/messages/unread_count?user_ids=${userId}&&custom_types=INBOX`
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

export const markReadSendbirdMessage = async (channelUrl, userId) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      channel_url: channelUrl,
      user_id: userId,
    }),
    redirect: 'follow',
    headers: {
      'Api-Token': Config.SENDBIRD_API_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
  const endpointUrl = `https://api-${Config.SENDBIRD_APP_ID}.sendbird.com/v3/group_channels/${channelUrl}/messages/mark_as_read`
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
