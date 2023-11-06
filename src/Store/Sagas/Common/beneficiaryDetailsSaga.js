import { call, select, takeLatest } from 'redux-saga/effects'

import { getBeneficiaryDetailsApi } from '@/Services/modules/Common/beneficiaryDetails'
import { getBeneficiaryDetails } from '@/Store/Reducers/Common/BeneficiaryDetailsReducer'

function* getBeneficiaryDetailsSaga(action) {
  const token = yield select(store => store.UserReducer.userData.token)
  console.log('ActionInSaga', action)
  try {
    const data = yield call(
      getBeneficiaryDetailsApi,
      action.payload.beneId || '',
      action.payload.coins || '',
      token,
    )
    console.log('ResponseInSaga', data)
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
  yield takeLatest(getBeneficiaryDetails.type, getBeneficiaryDetailsSaga)
}

export default root
