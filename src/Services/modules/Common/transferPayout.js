import { Config } from '@/Config'
import { endpoints } from '@/Constants'

export const transferPayoutApi = (requestObj, token) => {
  const requestOptions = {
    method: 'POST',
    body: requestObj,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  return fetch(
    `${Config.API_URL}${endpoints.common.transferPayout}`,
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
