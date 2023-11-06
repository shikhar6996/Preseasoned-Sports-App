import { Config } from '@/Config'
import { endpoints } from '@/Constants'

/**
 *
 * @param {*} requestObj formData -> {email:email}
 * @returns
 */

export const bankStatementNumberApi = (requestObj, token) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }

  console.log(
    `${Config.API_URL}${endpoints.common.bankVerify}bankAccount=${requestObj.bankStatementNum}&ifsc=${requestObj.ifscCode}`,
  )

  return fetch(
    `${Config.API_URL}${endpoints.common.bankVerify}bankAccount=${requestObj.bankStatementNum}&ifsc=${requestObj.ifscCode}`,
    requestOptions,
  )
    .then(res => res.json())
    .then(response => {
      console.log('response', response)
      return response
    })
    .catch(error => {
      throw error
    })
}
