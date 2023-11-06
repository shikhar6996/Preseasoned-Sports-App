import { call, takeLatest, select } from 'redux-saga/effects'

import { getFollowedChannel } from '@/Services/modules'
import { getFollowedChannelList } from '@/Store/Reducers/Channels'

function* getFollowedChannelSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(
      getFollowedChannel,
      token,
      action.payload?.followedChannelName,
      action.payload?.pageSize,
      action.payload?.pageNumber,
      action.payload?.name,
    )
    if (data) {
      action.payload?.successCallback(data)
    } else {
      throw new Error('error in api ')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
  }
}

const root = function* root() {
  yield takeLatest(getFollowedChannelList.type, getFollowedChannelSaga)
}

export default root
