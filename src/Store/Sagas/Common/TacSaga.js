import { call, takeLatest } from 'redux-saga/effects'

import { getTac } from '@/Services/modules/Common/getTac'
import { getTacList } from '@/Store/Reducers/Common/TermsAndCondReducer'

function* getTacSaga(action) {
  try {
    const data = yield call(getTac)
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
  yield takeLatest(getTacList.type, getTacSaga)
}

export default root
