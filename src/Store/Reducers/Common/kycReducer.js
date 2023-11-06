import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const KycSlice = createSlice({
  name: 'KycSlice',
  initialState,
  reducers: {
    panCardReducer: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },

    bankStatementRequest: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = KycSlice

export const { panCardReducer, bankStatementRequest } = actions

export default reducer
