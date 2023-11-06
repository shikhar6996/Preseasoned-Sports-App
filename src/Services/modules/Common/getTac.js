import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getTac = () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  prefetchLog(endpoints.common.Terms_And_Conditions, requestOptions)
  return fetch(
    `${Config.API_URL}${endpoints.common.Terms_And_Conditions}`,
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
