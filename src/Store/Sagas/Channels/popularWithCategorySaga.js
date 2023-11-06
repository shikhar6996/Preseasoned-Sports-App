import { call, takeLatest, select, put } from 'redux-saga/effects'

import { popularWithCategory } from '@/Services/modules'
import { getPopularWithCategoryList } from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

function* popularWithCategorySaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    // yield put(setLoadingState(true))

    const data = yield call(
      popularWithCategory,
      token,
      action.payload?.ChannelName,
      action.payload?.category_id,
      action.payload?.sort_by,
      action.payload?.pageNumber,
      action.payload?.pageSize,
    )
    yield put(setLoadingState(false))

    if (data) {
      action.payload?.successCallback(data)
    } else {
      throw new Error('error in api ')
    }
  } catch (error) {
    yield put(setLoadingState(false))

    action.payload?.failureCallback(error.message)
  }
}

const root = function* root() {
  yield takeLatest(getPopularWithCategoryList.type, popularWithCategorySaga)
}

export default root
