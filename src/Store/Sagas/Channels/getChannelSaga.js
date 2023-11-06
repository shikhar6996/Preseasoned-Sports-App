import { call, takeLatest, select } from 'redux-saga/effects'

import { getChannels } from '@/Services/modules'

import { getChannelList } from '@/Store/Reducers/Channels'

function* getChannelListSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(
      getChannels,
      token,
      action.payload?.pageSize ?? 5,
      action.payload?.pageNumber ?? 1,
    )
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
  yield takeLatest(getChannelList.type, getChannelListSaga)
}

export default root
