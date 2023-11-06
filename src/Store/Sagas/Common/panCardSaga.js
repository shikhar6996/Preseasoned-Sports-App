import { panCardApi } from '@/Services/modules/Common/panCard'
import { panCardReducer } from '@/Store/Reducers/Common/kycReducer'
import { call, select, takeLatest } from 'redux-saga/effects'

function* panCardSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(panCardApi, action.payload.requestBody, token)
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
  yield takeLatest(panCardReducer.type, panCardSaga)
}

export default root
