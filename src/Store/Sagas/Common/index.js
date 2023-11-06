import { all } from 'redux-saga/effects'

import bankStatementNumberSaga from './bankStatementNumberSaga'
import getBeneficiaryDetailsSaga from './beneficiaryDetailsSaga'
import contactUsSaga from './contactUsSaga'
import getCategorySaga from './getCategorySaga'
import getFaqSaga from './getFaqSaga'
import kycStatusSaga from './kycStatusSaga'
import panCardSaga from './panCardSaga'
import postKycStatusSaga from './postKycStatusSaga'
import PrivacyPolicySaga from './PrivacyPolicySaga'
import TacSaga from './TacSaga'
import TransferPayoutSaga from './transferPayoutSaga'
import toggleNotificationSaga from './toggleNotificationSaga'
import getToggleNotificationSaga from './getToggleNotificationSaga'

const commonSaga = function* root() {
  yield all([
    getCategorySaga(),
    TacSaga(),
    getFaqSaga(),
    contactUsSaga(),
    PrivacyPolicySaga(),
    panCardSaga(),
    bankStatementNumberSaga(),
    kycStatusSaga(),
    postKycStatusSaga(),
    getBeneficiaryDetailsSaga(),
    TransferPayoutSaga(),
    toggleNotificationSaga(),
    getToggleNotificationSaga(),
  ])
}
export default commonSaga
