import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const getToggleNotificationSlice = createSlice({
  name: 'Faq',
  initialState,
  reducers: {
    getToggleNotificationAction: {
      reducer: state => state,
      prepare: (successCallback, failureCallback) => ({
        payload: { successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = getToggleNotificationSlice

export const { getToggleNotificationAction } = actions

export default reducer
