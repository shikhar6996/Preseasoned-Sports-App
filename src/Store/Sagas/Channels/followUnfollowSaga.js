import { call, takeLatest, select, put } from 'redux-saga/effects'

import { followUnfollowChannelApi } from '@/Services/modules'
import { followUnfollowChannel } from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

function* followUnfollowSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    // yield put(setLoadingState(true))
    const data = yield call(
      followUnfollowChannelApi,
      token,
      action.payload?.formData,
    )
    if (data) {
      yield put(setLoadingState(false))

      action.payload?.successCallback(data)
    } else {
      throw new Error('error in api ')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
    yield put(setLoadingState(false))
  }
}

const root = function* root() {
  yield takeLatest(followUnfollowChannel.type, followUnfollowSaga)
}

export default root
