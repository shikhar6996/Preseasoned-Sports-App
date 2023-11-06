/* eslint-disable no-promise-executor-return */
import { Alert } from 'react-native'

import { call, put, select, takeLatest } from 'redux-saga/effects'

import { updateUserProfileApi } from '@/Services/modules'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import {
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailure,
} from '@/Store/Reducers/User'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* updateUserProfileSaga(action) {
  try {
    const token = yield select(store => store.UserReducer.userData.token)
    const data = yield call(
      updateUserProfileApi,
      token,
      action.payload.requestBody,
    )
    yield put(setLoadingState(false))
    if (data) {
      if (data?.code === 200) {
        yield delay(100)
        yield put(updateUserProfileSuccess(data))
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
    yield put(updateUserProfileFailure(error?.message || ''))
  }
}

const root = function* root() {
  yield takeLatest(updateUserProfileRequest.type, updateUserProfileSaga)
}

export default root
