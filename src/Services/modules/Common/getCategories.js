import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getCategories = () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  prefetchLog(endpoints.common.get_category, requestOptions)
  return fetch(
    `${Config.API_URL}${endpoints.common.get_category}`,
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
