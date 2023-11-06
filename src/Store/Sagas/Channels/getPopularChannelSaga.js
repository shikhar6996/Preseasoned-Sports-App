import { call, takeLatest, select } from 'redux-saga/effects'

import { getPopularChannels } from '@/Services/modules'

import { getPopularChannelList } from '@/Store/Reducers/Channels'

function* getPopularChannelSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(
      getPopularChannels,
      token,
      action.payload?.sortBy,
      action.payload?.pageSize,
      action.payload?.pageNumber,
      action.payload?.channelName,
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
  yield takeLatest(getPopularChannelList.type, getPopularChannelSaga)
}

export default root
