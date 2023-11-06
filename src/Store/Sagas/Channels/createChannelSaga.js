import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createChannelApi } from '@/Services/modules'

import {
  createChannelFailure,
  createChannelRequest,
} from '@/Store/Reducers/Channels'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* createChannelSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)

    const data = yield call(createChannelApi, action.payload.requestBody, token)

    if (data) {
      yield delay(100)
      action.payload?.successCallback(data)
    } else {
      throw new Error('error in api ')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
    yield put(createChannelFailure(error?.message || ''))
  }
}

const root = function* root() {
  yield takeLatest(createChannelRequest.type, createChannelSaga)
}

export default root
