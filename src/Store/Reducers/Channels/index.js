/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    createChannelRequest: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
    createChannelSuccess: (state, action) => {
      // state.userData = action.payload
      // state.userDataLoading = false
    },
    createChannelFailure: (state, action) => {
      // state.userDataLoading = false
      // state.userDataFailureMsg = action.payload
    },
    getChannelList: {
      reducer: state => state,
      prepare: (pageSize, pageNumber, successCallback, failureCallback) => ({
        payload: { pageSize, pageNumber, successCallback, failureCallback },
      }),
    },
    getChannelDetails: {
      reducer: state => state,
      prepare: (formData, successCallback, failureCallback) => ({
        payload: { formData, successCallback, failureCallback },
      }),
    },
    getPopularChannelList: {
      reducer: state => state,
      prepare: (
        channelName,
        sortBy,
        pageSize,
        pageNumber,
        successCallback,
        failureCallback,
      ) => ({
        payload: {
          channelName,
          sortBy,
          pageSize,
          pageNumber,
          successCallback,
          failureCallback,
        },
      }),
    },
    getFollowedChannelList: {
      reducer: state => state,
      prepare: (
        followedChannelName,
        pageSize,
        pageNumber,
        name,
        successCallback,
        failureCallback,
      ) => ({
        payload: {
          followedChannelName,
          pageSize,
          pageNumber,
          name,
          successCallback,
          failureCallback,
        },
      }),
    },
    followUnfollowChannel: {
      reducer: state => state,
      prepare: (formData, successCallback, failureCallback) => ({
        payload: {
          formData,
          successCallback,
          failureCallback,
        },
      }),
    },
    getPopularWithCategoryList: {
      reducer: state => state,
      prepare: (
        ChannelName,
        category_id,
        sort_by,
        pageSize,
        pageNumber,
        successCallback,
        failureCallback,
      ) => ({
        payload: {
          ChannelName,
          category_id,
          sort_by,
          pageSize,
          pageNumber,
          successCallback,
          failureCallback,
        },
      }),
    },
    getAnotherUserChannelDetails: {
      reducer: state => state,
      prepare: (
        userId,
        pageSize,
        pageNumber,
        successCallback,
        failureCallback,
      ) => ({
        payload: {
          userId,
          pageSize,
          pageNumber,
          successCallback,
          failureCallback,
        },
      }),
    },
  },
})

const { actions, reducer } = userSlice

export const {
  createChannelRequest,
  createChannelSuccess,
  createChannelFailure,
  getChannelList,
  getChannelDetails,
  getPopularChannelList,
  getFollowedChannelList,
  followUnfollowChannel,
  getPopularWithCategoryList,
  getAnotherUserChannelDetails,
} = actions

export default reducer
