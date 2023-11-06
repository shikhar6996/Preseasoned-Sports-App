import { all } from 'redux-saga/effects'

import channelSaga from './Channels'
import chatSaga from './Chat'
import commonSaga from './Common'
import subscriptionSaga from './subscription'
import userSaga from './User'

const rootSaga = function* root() {
  yield all([
    commonSaga(),
    userSaga(),
    channelSaga(),
    chatSaga(),
    subscriptionSaga(),
  ])
}
export default rootSaga
