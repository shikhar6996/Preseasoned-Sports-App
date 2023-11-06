import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const KycStatusSlice = createSlice({
  name: 'KycStatus',
  initialState,
  reducers: {
    getKycStatus: {
      reducer: state => state,
      prepare: (successCallback, failureCallback) => ({
        payload: { successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = KycStatusSlice

export const { getKycStatus } = actions

export default reducer
