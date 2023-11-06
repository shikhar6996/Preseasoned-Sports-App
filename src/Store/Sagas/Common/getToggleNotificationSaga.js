import { call, select, takeLatest } from 'redux-saga/effects'
import { getToggleNotificationApi } from '@/Services/modules/Common/getToggleNotifications'
import { getToggleNotificationAction } from '@/Store/Reducers/Common/getToggleNotificationReducer'

function* getToggleNotificationSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(getToggleNotificationApi, token)
    if (data) {
      action.payload?.successCallback(data)
    } else {
      throw new Error('error in api')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
  }
}

const root = function* root() {
  yield takeLatest(getToggleNotificationAction.type, getToggleNotificationSaga)
}

export default root
