/* eslint-disable camelcase */
import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const getFollowedChannel = (
  token,
  sort_by,
  pageSize,
  pageNumber,
  name,
) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.followed_channels, token)
  return fetch(
    `${Config.API_URL}${endpoints.followed_channels}?sort_by=${sort_by}&page_size=${pageSize}&page=${pageNumber}&name=${name}`,
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
