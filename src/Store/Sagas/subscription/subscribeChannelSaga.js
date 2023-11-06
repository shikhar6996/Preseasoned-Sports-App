import { call, takeLatest, select } from 'redux-saga/effects'

import { subscibeChannel } from '@/Services/modules/subscription'
import { subscribeChannelRequest } from '@/Store/Reducers/subscription'





function* subscribeChannelSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(subscibeChannel, token, action.payload.channelId)
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
  yield takeLatest(subscribeChannelRequest.type, subscribeChannelSaga)
}

export default root
