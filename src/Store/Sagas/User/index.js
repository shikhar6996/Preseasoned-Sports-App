import { all } from 'redux-saga/effects'

import getAnotherUserDetailsSaga from './getAnotherUserDetailSaga'
import loginUserSaga from './loginSaga'
import registerUserSaga from './registerSaga'
import updateUserProfileSaga from './updateUserProfileSaga'
import changePasswordSaga from './changePasswordSaga'

const userSaga = function* root() {
  yield all([
    registerUserSaga(),
    loginUserSaga(),
    updateUserProfileSaga(),
    getAnotherUserDetailsSaga(),
    changePasswordSaga(),
  ])
}
export default userSaga
