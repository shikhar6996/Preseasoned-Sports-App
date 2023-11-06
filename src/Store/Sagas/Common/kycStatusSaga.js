import { call, select, takeLatest } from 'redux-saga/effects'
import { getKycStatusApi } from '@/Services/modules/Common/updateKycStatus'
import { getKycStatus } from '@/Store/Reducers/Common/KycStatusReducer'

function* kycStatusSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(getKycStatusApi, token)
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
  yield takeLatest(getKycStatus.type, kycStatusSaga)
}

export default root
