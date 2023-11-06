import { call, takeLatest } from 'redux-saga/effects'

import { getCategories } from '@/Services/modules/Common/getCategories'
import { getCategoryList } from '@/Store/Reducers/Common/CategoryReducer'

function* getCategoryListSaga(action) {
  try {
    const data = yield call(getCategories)

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
  yield takeLatest(getCategoryList.type, getCategoryListSaga)
}

export default root
