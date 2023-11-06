import { call, takeLatest, select } from 'redux-saga/effects'

import { createAboutUsApi } from '@/Services/modules/chat/createAboutUs'
import { createAboutUs } from '@/Store/Reducers/Chat'

function* createAboutUsSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(createAboutUsApi, token, action?.payload?.formData)
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
  yield takeLatest(createAboutUs.type, createAboutUsSaga)
}

export default root
