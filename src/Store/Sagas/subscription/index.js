import { all } from 'redux-saga/effects'

import addCoinsSaga from './addCoinsSaga'
import subscribeChannelSaga from './subscribeChannelSaga'
import getWalletDetailsSaga from './walletDetailsSaga'

const subscriptionSaga = function* root() {
  yield all([getWalletDetailsSaga(), subscribeChannelSaga(), addCoinsSaga()])
}
export default subscriptionSaga
