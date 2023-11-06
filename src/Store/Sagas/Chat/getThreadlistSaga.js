import { call, takeLatest, select } from 'redux-saga/effects'

import { getThreadlistApi } from '@/Services/modules/chat/getThreadlist'
import { getThreadlist } from '@/Store/Reducers/Chat'

function* getThreadlistSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      getThreadlistApi,
      token,
      action.payload.channel_id || '',
      action.payload?.sortBy,
      action.payload.pageNumber || '',
      action.payload.pageSize || '',
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
  yield takeLatest(getThreadlist.type, getThreadlistSaga)
}

export default root
