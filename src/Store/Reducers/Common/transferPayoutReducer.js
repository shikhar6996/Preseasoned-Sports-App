import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const transferPayoutSlice = createSlice({
  name: 'PostTransferPayout',
  initialState,
  reducers: {
    postTransferPayout: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = transferPayoutSlice

export const { postTransferPayout } = actions

export default reducer
