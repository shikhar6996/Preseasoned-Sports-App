import { Alert } from 'react-native'

import { call, put, select, takeLatest } from 'redux-saga/effects'

import { createAnnouncementApi } from '@/Services/modules/chat/createAnnouncement'
import { createAnnouncementStatusApi } from '@/Services/modules/chat/createAnouncementStatus'
import {
  createAnnouncementRequest,
  createAnnouncementStatusRequest,
} from '@/Store/Reducers/Chat'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* createAnnouncementSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      createAnnouncementApi,
      token,
      action.payload.requestBody,
    )
    yield put(setLoadingState(false))
    if (data) {
      if (data?.code === 200) {
        yield delay(100)
        action.payload?.successCallback(data)
      } else {
        setTimeout(() => {
          Alert.alert(data?.message, '')
        }, 100)
      }
    } else {
      throw new Error('error in api ')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
    // yield put(cra(error?.message || ''))
  }
}

function* createAnnouncementStatusSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      createAnnouncementStatusApi,
      token,
      action.payload.requestBody,
    )
    yield put(setLoadingState(false))
    if (data) {
      if (data?.code === 200) {
        yield delay(100)
        action.payload?.successCallback(data)
      } else {
        setTimeout(() => {
          Alert.alert(data?.message, '')
        }, 100)
      }
    } else {
      throw new Error('error in api ')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
    // yield put(cra(error?.message || ''))
  }
}
const root = function* root() {
  yield takeLatest(createAnnouncementRequest.type, createAnnouncementSaga)
  yield takeLatest(
    createAnnouncementStatusRequest.type,
    createAnnouncementStatusSaga,
  )
}

export default root
