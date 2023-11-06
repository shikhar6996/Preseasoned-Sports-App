import { Config } from '@/Config'
import { endpoints } from '@/Constants'

/**
 *
 * @param {*} requestObj formData -> {email:email}
 * @returns
 */

export const getEmailOtp = requestObj => {
  const requestOptions = {
    method: 'POST',
    body: requestObj,
    redirect: 'follow',
  }
  return fetch(
    `${Config.API_URL}${endpoints.common.get_email_otp}`,
    requestOptions,
  )
    .then(res => res.json())
    .then(response => {
      console.log('ressponse', response)
      return response
    })
    .catch(error => {
      throw error
    })
}
