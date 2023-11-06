import { call, takeLatest, select } from 'redux-saga/effects'

import { getWalletDetails } from '@/Services/modules'

import { walletDetailsRequest } from '@/Store/Reducers/subscription'

function* getWalletDetailsSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(getWalletDetails, token)
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
  yield takeLatest(walletDetailsRequest.type, getWalletDetailsSaga)
}

export default root
