import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getWalletDetails = token => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }

  prefetchLog(endpoints.wallet, token)
  return fetch(`${Config.API_URL}${endpoints.wallet}`, requestOptions)
    .then(response => {
      console.log('ResponseInAPI Call', response)
      return response.json()
    })
    .then(result => {
      postFetchSuccessLog(result)
      return result
    })
    .catch(error => {
      postFetchFailureLog(error)
      throw error
    })
}
