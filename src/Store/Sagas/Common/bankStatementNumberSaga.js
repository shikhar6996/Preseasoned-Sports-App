import { bankStatementNumberApi } from '@/Services/modules/Common/bankStatementNumber'
import { bankStatementRequest } from '@/Store/Reducers/Common/kycReducer'
import { call, select, takeLatest } from 'redux-saga/effects'

function* bankStatementNumberSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)
  console.log(action.payload, ' bank statement number saga ---')
  try {
    const data = yield call(
      bankStatementNumberApi,
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
  yield takeLatest(bankStatementRequest.type, bankStatementNumberSaga)
}

export default root
