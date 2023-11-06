/* eslint-disable no-promise-executor-return */
import { Alert } from 'react-native'

import { call, put, takeLatest } from 'redux-saga/effects'

import { loginUser } from '@/Services/modules'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { loginFailure, loginRequest, loginSuccess } from '@/Store/Reducers/User'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* loginUserSaga(action) {
  try {
    const data = yield call(loginUser, action.payload.requestBody)
    if (data) {
      yield put(setLoadingState(false))
      if (data?.code === 200) {
        yield delay(100)
        action.payload?.successCallback(data)
        yield put(loginSuccess(data))
      } else {
        setTimeout(() => {
          Alert.alert(data?.message, '')
        }, 100)
      }
    } else {
      yield put(setLoadingState(false))
      throw new Error('Error in api ')
    }
  } catch (error) {
    // yield put(setLoadingState(false))
    console.log('error', error)
    yield put(setLoadingState(false))
    action.payload?.failureCallback(error.message)
    yield put(loginFailure(error?.message || ''))
  }
}

const root = function* root() {
  yield takeLatest(loginRequest.type, loginUserSaga)
}

export default root
