import { Config } from '@/Config'
import { endpoints } from '@/Constants'

/**
 *
 * @param {*} requestObj formData -> {email:string, otp: string}
 * @returns
 */

export const verifyUserOtp = requestObj => {
  const requestOptions = {
    method: 'POST',
    body: requestObj,
    redirect: 'follow',
  }
  return fetch(`${Config.API_URL}${endpoints.user_verify_otp}`, requestOptions)
    .then(res => res.json())
    .then(response => {
      console.log('ressponse', response)
      return response
    })
    .catch(error => {
      throw error
    })
}
