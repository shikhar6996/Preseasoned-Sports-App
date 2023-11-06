import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const FaqSlice = createSlice({
  name: 'Faq',
  initialState,
  reducers: {
    getFaqList: {
      reducer: state => state,
      prepare: (pageSize, pageNumber, successCallback, failureCallback) => ({
        payload: { pageSize, pageNumber, successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = FaqSlice

export const { getFaqList } = actions

export default reducer
