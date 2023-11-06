import { call, takeLatest, select } from 'redux-saga/effects'

import { getAboutUsApi } from '@/Services/modules/chat/getAboutUs'
import { getAboutUs } from '@/Store/Reducers/Chat'

function* getAboutUsSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(getAboutUsApi, token, action.payload.channel_id)
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
  yield takeLatest(getAboutUs.type, getAboutUsSaga)
}

export default root
