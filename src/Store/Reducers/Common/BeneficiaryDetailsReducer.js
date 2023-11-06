import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const beneficiaryDetailsSlice = createSlice({
  name: 'beneficiaryDetails',
  initialState,
  reducers: {
    getBeneficiaryDetails: {
      reducer: state => state,
      prepare: (beneId, coins, successCallback, failureCallback) => ({
        payload: { beneId, coins, successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = beneficiaryDetailsSlice

export const { getBeneficiaryDetails } = actions

export default reducer
