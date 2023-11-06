import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getPrivacyPolicy = () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  prefetchLog(endpoints.common.privacy_policy, requestOptions)
  return fetch(
    // to b updated
    `${Config.API_URL}${endpoints.common.privacy_policy}`,
    requestOptions,
  )
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
