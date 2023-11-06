/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
}

export const CommonLoader = createSlice({
  name: 'CommonLoader',
  initialState,
  reducers: {
    setLoadingState: (state, action) => {
      state.loading = action.payload
    },
  },
})

const { actions, reducer } = CommonLoader

export const { setLoadingState } = actions

export default reducer
