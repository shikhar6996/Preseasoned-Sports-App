import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const TacSlice = createSlice({
  name: 'TermsAndCondition',
  initialState,
  reducers: {
    getTacList: {
      reducer: state => state,
      prepare: (successCallback, failureCallback) => ({
        payload: { successCallback, failureCallback },
      }),
    },
  },
})

const { actions, reducer } = TacSlice

export const { getTacList } = actions

export default reducer
