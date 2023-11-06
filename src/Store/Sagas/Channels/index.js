import { all } from 'redux-saga/effects'

import createChannelSaga from './createChannelSaga'
import followUnfollowSaga from './followUnfollowSaga'
import getAnotherUserChannelDetailSaga from './getAnotherUserChannelDetailSaga'
import getChannelDetailsSaga from './getChannelDetailsSaga'
import getChannelSaga from './getChannelSaga'
import getFollowedChannelSaga from './getFollowedChannelSaga'
import getPopularChannelSaga from './getPopularChannelSaga'
import popularWithCategorySaga from './popularWithCategorySaga'

const channelSaga = function* root() {
  yield all([
    createChannelSaga(),
    getChannelSaga(),
    getChannelDetailsSaga(),
    getPopularChannelSaga(),
    followUnfollowSaga(),
    getFollowedChannelSaga(),
    popularWithCategorySaga(),
    getAnotherUserChannelDetailSaga(),
  ])
}
export default channelSaga
