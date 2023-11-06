import { Config } from '@/Config'
import { endpoints } from '@/Constants'

export const contactUsApi = (requestObj, token) => {
  const requestOptions = {
    method: 'POST',
    body: requestObj,
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  return fetch(
    `${Config.API_URL}${endpoints.common.contact_us}`,
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
