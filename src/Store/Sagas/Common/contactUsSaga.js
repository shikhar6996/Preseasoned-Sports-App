import { call, select, takeLatest } from 'redux-saga/effects'

import { contactUsApi } from '@/Services/modules/Common/contactUs'
import { contactUs } from '@/Store/Reducers/Common/ContactUsReducer'

function* contactUsSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(contactUsApi, action.payload.requestBody, token)
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
  yield takeLatest(contactUs.type, contactUsSaga)
}

export default root
