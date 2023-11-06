import { call, takeLatest, select } from 'redux-saga/effects'

import { deleteAnnouncementApi } from '@/Services/modules/chat/deleteAnnouncement'
import { deleteAnnouncementRequest } from '@/Store/Reducers/Chat'

function* deleteAnnouncementSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      deleteAnnouncementApi,
      token,
      action.payload.announcementId || '',
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
  yield takeLatest(deleteAnnouncementRequest.type, deleteAnnouncementSaga)
}

export default root
