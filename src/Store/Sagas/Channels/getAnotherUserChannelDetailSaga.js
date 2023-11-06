import { call, takeLatest, select } from 'redux-saga/effects'

import { getAnotherUserChannelDetailsApi } from '@/Services/modules'
import { getAnotherUserChannelDetails } from '@/Store/Reducers/Channels'

function* getAnotherUserChannelDetailSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      getAnotherUserChannelDetailsApi,
      token,
      action?.payload?.userId,
      action.payload?.pageSize,
      action.payload?.pageNumber,
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
  yield takeLatest(
    getAnotherUserChannelDetails.type,
    getAnotherUserChannelDetailSaga,
  )
}

export default root
