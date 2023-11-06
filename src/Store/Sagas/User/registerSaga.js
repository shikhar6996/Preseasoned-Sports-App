import { Alert } from 'react-native'

import { call, put, takeLatest } from 'redux-saga/effects'

import { registerApi } from '@/Services/modules'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import {
  registerFailure,
  registerRequest,
  registerSuccess,
} from '@/Store/Reducers/User'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* registerUserSaga(action) {
  try {
    const data = yield call(registerApi, action.payload.requestBody)
    yield put(setLoadingState(false))
    if (data) {
      if (data?.code === 200) {
        yield delay(100)
        action.payload?.successCallback(data)
        yield put(
          registerSuccess({
            token: data?.token,
            user_profile: { ...data },
          }),
        )
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
    yield put(registerFailure(error?.message || ''))
  }
}

const root = function* root() {
  yield takeLatest(registerRequest.type, registerUserSaga)
}

export default root
