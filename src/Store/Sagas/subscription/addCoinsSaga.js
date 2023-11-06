import { call, takeLatest, select } from 'redux-saga/effects'

import { addCoinsApi } from '@/Services/modules/subscription/addCoins'
import { addCoins } from '@/Store/Reducers/subscription'

function* addCoinsSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(addCoinsApi, token, action?.payload?.formData)
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
  yield takeLatest(addCoins.type, addCoinsSaga)
}

export default root
