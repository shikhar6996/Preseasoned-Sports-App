/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeTabIndex: 0,
}

export const bottomTabReducer = createSlice({
  name: 'BottomTab',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTabIndex = action.payload
    },
  },
})

const { actions, reducer } = bottomTabReducer

export const { setActiveTab } = actions

export default reducer
