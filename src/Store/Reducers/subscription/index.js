/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const WalletSlice = createSlice({
  name: 'WalletSlice',
  initialState,
  reducers: {
    walletDetailsRequest: {
      reducer: state => state,
      prepare: (successCallback, failureCallback) => ({
        payload: { successCallback, failureCallback },
      }),
    },
    addCoins: {
      reducer: state => state,
      prepare: (formData, successCallback, failureCallback) => ({
        payload: { formData, successCallback, failureCallback },
      }),
    },
    subscribeChannelRequest: {
      reducer: state => state,
      prepare: (channelId, successCallback, failureCallback) => ({
        payload: { channelId, successCallback, failureCallback },
      }),
    },
  },
})
const { actions, reducer } = WalletSlice

export const { walletDetailsRequest, subscribeChannelRequest, addCoins } =
  actions

export default reducer
