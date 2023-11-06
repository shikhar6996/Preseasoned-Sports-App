import { call, takeLatest, select } from 'redux-saga/effects'

import { channelDetailsApi } from '@/Services/modules'

import { getChannelDetails } from '@/Store/Reducers/Channels'

function* getChannelDetailsSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(channelDetailsApi, token, action?.payload?.formData)
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
  yield takeLatest(getChannelDetails.type, getChannelDetailsSaga)
}

export default root
