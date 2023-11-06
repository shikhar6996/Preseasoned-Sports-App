import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  prefetchLog,
  postFetchSuccessLog,
  postFetchFailureLog,
} from '@/Services/serviceUtils'

/**
 *
 * @param {*} requestObj formData -> {email:email}
 * @returns
 */
export const getEmailOtpForPasswordReset = requestBody => {
  const requestOptions = {
    method: 'POST',
    body: requestBody,
    redirect: 'follow',
  }
  prefetchLog(endpoints.user_send_otp, requestBody)

  return fetch(`${Config.API_URL}${endpoints.user_send_otp}`, requestOptions)
    .then(res => res.json())
    .then(response => {
      postFetchSuccessLog(response)
      return response
    })
    .catch(error => {
      postFetchFailureLog(error)
      throw error
    })
}
