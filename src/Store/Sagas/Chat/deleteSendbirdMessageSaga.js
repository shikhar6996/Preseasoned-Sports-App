import { call, takeLatest } from 'redux-saga/effects'

import { deleteSendbirdMessageApi } from '@/Services/modules/chat'
import { deleteSendbirdMessageRequest } from '@/Store/Reducers/Chat'

function* deleteSendbirdMessageSaga(action) {
  try {
    const data = yield call(
      deleteSendbirdMessageApi,
      action.payload.channelUrl || '',
      action.payload.messageId || '',
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
  yield takeLatest(deleteSendbirdMessageRequest.type, deleteSendbirdMessageSaga)
}

export default root
