/* eslint-disable no-promise-executor-return */
import { Alert } from 'react-native'

import { call, put, select, takeLatest } from 'redux-saga/effects'

import { updateAnnouncementApi } from '@/Services/modules'

import {
  updateAnnouncementRequest,
  updateAnnouncementSuccess,
  updateAnnouncementFailure,
} from '@/Store/Reducers/Chat'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* updateAnnouncementSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      updateAnnouncementApi,
      token,
      action.payload.requestBody,
    )
    yield put(setLoadingState(false))
    if (data) {
      if (data?.code === 200) {
        yield delay(100)
        yield put(updateAnnouncementSuccess(data))
        action.payload?.successCallback(data)
      } else {
        // const message = data?.message
        //   .replace('[', '')
        //   .replace(']', '')
        //   .replaceAll("'", '')
        //   .split(',')
        setTimeout(() => {
          Alert.alert(data?.message || '', '')
        }, 100)
      }
    } else {
      throw new Error('error in api ')
    }
  } catch (error) {
    action.payload?.failureCallback(error.message)
    yield put(updateAnnouncementFailure(error?.message || ''))
  }
}

const root = function* root() {
  yield takeLatest(updateAnnouncementRequest.type, updateAnnouncementSaga)
}

export default root
