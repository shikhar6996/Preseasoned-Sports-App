import { Config } from '@/Config'
import { endpoints } from '@/Constants'

/**
 *
 * @param {*} requestObj formData -> {email:email}
 * @returns
 */

export const postKycStatusApi = (requestObj, token) => {
  const requestOptions = {
    method: 'POST',
    body: requestObj,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  return fetch(`${Config.API_URL}${endpoints.common.kycStatus}`, requestOptions)
    .then(res => res.json())
    .then(response => {
      console.log('ressponse', response)
      return response
    })
    .catch(error => {
      throw error
    })
}
