import { call, select, takeLatest } from 'redux-saga/effects'

import { transferPayoutApi } from '@/Services/modules/Common/transferPayout'
import { postTransferPayout } from '@/Store/Reducers/Common/transferPayoutReducer'

function* tranferPayoutSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(
      transferPayoutApi,
      action.payload.requestBody,
      token,
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
  yield takeLatest(postTransferPayout.type, tranferPayoutSaga)
}

export default root
