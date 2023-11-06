import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const toggleNotificationSlice = createSlice({
  name: 'toggleNotificationAction',
  initialState,
  reducers: {
    toggleNotificationAction: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = toggleNotificationSlice

export const { toggleNotificationAction } = actions

export default reducer
