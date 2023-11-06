import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const postKycVerifySlice = createSlice({
  name: 'PostKycVerified',
  initialState,
  reducers: {
    postKycVerfiyStatus: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = postKycVerifySlice

export const { postKycVerfiyStatus } = actions

export default reducer
