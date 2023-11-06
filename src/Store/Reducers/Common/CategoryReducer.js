import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const categorySlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    getCategoryList: {
      reducer: state => state,
      prepare: (successCallback, failureCallback) => ({
        payload: { successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = categorySlice

export const { getCategoryList } = actions

export default reducer
