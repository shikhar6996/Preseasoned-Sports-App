import { call, select, takeLatest } from 'redux-saga/effects'

import { postKycStatusApi } from '@/Services/modules/Common/postKycStatus'
import { postKycVerfiyStatus } from '@/Store/Reducers/Common/postKycStatusReducer'

function* postKycStatusSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(postKycStatusApi, action.payload.requestBody, token)
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
  yield takeLatest(postKycVerfiyStatus.type, postKycStatusSaga)
}

export default root
