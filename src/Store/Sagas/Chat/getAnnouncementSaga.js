import { call, takeLatest, select } from 'redux-saga/effects'

import { getAnnouncementlistApi } from '@/Services/modules/chat/getAnnouncement'
import { getAnnouncementsList } from '@/Store/Reducers/Chat'

function* getAnnouncementListSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      getAnnouncementlistApi,
      token,
      action.payload.channel_id || '',
      action.payload.pageNumber || '',
      action.payload.pageSize || '',
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
  yield takeLatest(getAnnouncementsList.type, getAnnouncementListSaga)
}

export default root
