import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  prefetchLog,
  postFetchSuccessLog,
  postFetchFailureLog,
} from '@/Services/serviceUtils'

export const editChannelApi = async (requestBody, channelId, token) => {
  const requestOptions = {
    method: 'PATCH',
    body: requestBody,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.channel, requestBody)
  try {
    const response = await fetch(
      `${Config.API_URL}${endpoints.channel}?channel_id=${channelId}`,
      requestOptions,
    )
    const result1 = await response.json()
    postFetchSuccessLog(result1)
    return result1
  } catch (error) {
    postFetchFailureLog(error)
    throw error
  }
}
