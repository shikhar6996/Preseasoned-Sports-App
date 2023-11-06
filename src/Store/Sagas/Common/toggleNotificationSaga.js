import { call, select, takeLatest } from 'redux-saga/effects'

import { toggleNotificationApi } from '@/Services/modules/Common/toggleNotification'
import { toggleNotificationAction } from '@/Store/Reducers/Common/toggleNotificationReducer'

function* toggleNotificationSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(
      toggleNotificationApi,
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
  yield takeLatest(toggleNotificationAction.type, toggleNotificationSaga)
}

export default root
