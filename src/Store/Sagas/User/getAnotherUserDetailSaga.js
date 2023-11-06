import { call, takeLatest, select } from 'redux-saga/effects'

import { getAnotherUserDetailsApi } from '@/Services/modules'
import { getAnotherUserDetails } from '@/Store/Reducers/User'

function* getAnotherUserDetailsSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      getAnotherUserDetailsApi,
      token,
      action?.payload?.userId,
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
  yield takeLatest(getAnotherUserDetails.type, getAnotherUserDetailsSaga)
}

export default root
