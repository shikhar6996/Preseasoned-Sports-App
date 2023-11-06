import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const TacSlice = createSlice({
  name: 'PrivacyPolicy',
  initialState,
  reducers: {
    getPrivacyPolicyList: {
      reducer: state => state,
      prepare: (successCallback, failureCallback) => ({
        payload: { successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = TacSlice

export const { getPrivacyPolicyList } = actions

export default reducer
