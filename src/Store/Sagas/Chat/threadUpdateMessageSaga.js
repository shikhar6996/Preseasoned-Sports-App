import { call, takeLatest, select } from 'redux-saga/effects'
import {  threadMessageUpdate } from '@/Store/Reducers/Chat'
import { threadNewMessageUpdateApi } from '@/Services/modules/chat'

function* threadUpdateMessageSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(threadNewMessageUpdateApi, token, action?.payload?.requestBody)
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
  yield takeLatest(threadMessageUpdate.type, threadUpdateMessageSaga)
}

export default root
