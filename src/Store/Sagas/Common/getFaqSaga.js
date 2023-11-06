import { call, select, takeLatest } from 'redux-saga/effects'

import { getFaq } from '@/Services/modules/Common/getFaq'
import { getFaqList } from '@/Store/Reducers/Common/FaqReducer'

function* getFaqSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)

  try {
    const data = yield call(
      getFaq,
      action.payload.pageSize || '',
      action.payload.pageNumber || '',
      token,
    )
    if (data) {
      action.payload?.successCallback(data)
    } else {
      throw new Error('error in api')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
  }
}

const root = function* root() {
  yield takeLatest(getFaqList.type, getFaqSaga)
}

export default root
