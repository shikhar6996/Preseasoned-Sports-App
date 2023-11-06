import { Config } from '@/Config'
import { endpoints } from '@/Constants'

/**
 *
 * @param {*} requestObj formData -> {email:string, otp: string }
 * @returns
 */
export const verifyOtp = requestObj => {
  const requestOptions = {
    method: 'POST',
    body: requestObj,
    redirect: 'follow',
  }
  return fetch(
    `${Config.API_URL}${endpoints.common.verify_otp}`,
    requestOptions,
  )
    .then(res => res.json())
    .then(response => response)
    .catch(error => {
      throw error
    })
}
