import { Config } from '@/Config'
import { endpoints } from '@/Constants'

/**
 *
 * @param {*} requestObj formData -> {email:email}
 * @returns
 */

export const toggleNotificationApi = (requestObj, token) => {
  const requestOptions = {
    method: 'POST',
    body: requestObj,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  return fetch(
    `${Config.API_URL}${endpoints.common.toggleNotification}`,
    requestOptions,
  )
    .then(res => res.json())
    .then(response => {
      console.log('response', response)
      return response
    })
    .catch(error => {
      throw error
    })
}
