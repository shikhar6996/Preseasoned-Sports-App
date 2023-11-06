import { Config } from '@/Config'
import { endpoints } from '@/Constants'
import {
    prefetchLog,
    postFetchSuccessLog,
    postFetchFailureLog,
} from '@/Services/serviceUtils'

export const followUnfollowChannelApi = (token, requestBody) => {
    const requestOptions = {
        method: 'POST',
        body: requestBody,
        redirect: 'follow',
        headers: {
            Authorization: `token ${token}`,
        },
    }
    prefetchLog(endpoints.follow_unfollow, requestBody)
    return fetch(`${Config.API_URL}${endpoints.follow_unfollow}`, requestOptions)
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
