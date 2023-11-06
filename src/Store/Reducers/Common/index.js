import { combineReducers } from '@reduxjs/toolkit'

import BeneficiaryDetailsReducer from './BeneficiaryDetailsReducer'
import BottomTabReducer from './BottomTabReducer'
import CategoryReducer from './CategoryReducer'
import ContactUsReducer from './ContactUsReducer'
import FaqReducer from './FaqReducer'
import KycReducer from './kycReducer'
import KycStatusReducer from './KycStatusReducer'
import LoaderReducer from './LoaderReducer'
import postKycStatusReducer from './postKycStatusReducer'
import PrivacyPolicyReducer from './PrivacyPolicyReducer'
import TermsAndCondReducer from './TermsAndCondReducer'
import TransferPayoutReducer from './transferPayoutReducer'
import toggleNotificationReducer from './toggleNotificationReducer'
import getToggleNotificationReducer from './getToggleNotificationReducer'

export const CommonReducer = combineReducers({
  CategoryReducer,
  BottomTabReducer,
  LoaderReducer,
  TermsAndCondReducer,
  PrivacyPolicyReducer,
  FaqReducer,
  KycReducer,
  KycStatusReducer,
  postKycStatusReducer,
  ContactUsReducer,
  BeneficiaryDetailsReducer,
  TransferPayoutReducer,
  toggleNotificationReducer,
  getToggleNotificationReducer,
})
