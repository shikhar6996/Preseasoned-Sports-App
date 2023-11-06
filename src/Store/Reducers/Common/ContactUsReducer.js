import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const contactUsSlice = createSlice({
  name: 'ContactUs',
  initialState,
  reducers: {
    contactUs: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = contactUsSlice

export const { contactUs } = actions

export default reducer
