import { call, takeLatest, select } from 'redux-saga/effects'
import { changePassword } from '@/Store/Reducers/User'
import { changePasswordApi } from '@/Services/modules/user/changePassword'

function* changePasswordSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(changePasswordApi, token, action?.payload?.userId)
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
  yield takeLatest(changePassword.type, changePasswordSaga)
}

export default root
