import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

/**
 *
 * @param {*} requestObj formData -> {email:string, otp: string }
 * @returns
 */

export const resetPassword = requestBody => {
  const requestOptions = {
    method: 'POST',
    body: requestBody,
    redirect: 'follow',
  }
  prefetchLog(endpoints.reset_password, requestBody)
  return fetch(`${Config.API_URL}${endpoints.reset_password}`, requestOptions)
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
