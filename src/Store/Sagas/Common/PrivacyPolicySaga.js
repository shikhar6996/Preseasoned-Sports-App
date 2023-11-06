import { call, takeLatest } from 'redux-saga/effects'

import { getPrivacyPolicy } from '@/Services/modules/Common/getPrivacyPolicy'
import { getPrivacyPolicyList } from '@/Store/Reducers/Common/PrivacyPolicyReducer'

function* PrivacyPolicySaga(action) {
  try {
    const data = yield call(getPrivacyPolicy)
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
  yield takeLatest(getPrivacyPolicyList.type, PrivacyPolicySaga)
}

export default root
