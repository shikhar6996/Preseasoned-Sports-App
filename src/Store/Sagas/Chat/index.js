import { all } from 'redux-saga/effects'
import createAboutUsSaga from './createAboutUsSaga'
import createAnnouncement from './createAnnouncementSaga'
import createThreadSaga from './createThreadSaga'
import deleteAnnouncementSaga from './deleteAnnouncement'
import deleteSendbirdMessageSaga from './deleteSendbirdMessageSaga'
import getAboutUsSaga from './getAboutUsSaga'
import getAnnouncementListSaga from './getAnnouncementSaga'
import getThreadlistSaga from './getThreadlistSaga'
import updateAnnouncementSaga from './updateAnnouncement'
import threadUpdateMessageSaga from './threadUpdateMessageSaga'


const chatSaga = function* root() {
  yield all([
    createThreadSaga(),
    getThreadlistSaga(),
    createAnnouncement(),
    getAnnouncementListSaga(),
    createAboutUsSaga(),
    getAboutUsSaga(),
    updateAnnouncementSaga(),
    deleteAnnouncementSaga(),
    deleteSendbirdMessageSaga(),
    threadUpdateMessageSaga()
  ])
}
export default chatSaga
