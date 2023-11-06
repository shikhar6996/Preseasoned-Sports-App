/* eslint-disable camelcase */
import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
  postFetchFailureLog,
  postFetchSuccessLog,
  prefetchLog,
} from '@/Services/serviceUtils'

export const popularWithCategory = (
  token,
  channel_name,
  category_id,
  sort_by,
  pageNumber,
  pageSize,
) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `token ${token}`,
    },
  }
  prefetchLog(endpoints.popular_with_category, token)
  return fetch(
    `${Config.API_URL}${
      endpoints.popular_with_category
    }?channel_name=${channel_name}&category_id=${encodeURIComponent(
      category_id,
    )}&sort_by=${sort_by}&page_size=${pageSize}&page=${pageNumber}`,
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
