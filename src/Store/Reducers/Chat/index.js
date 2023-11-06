/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const chatSlice = createSlice({
  name: 'ChatSlice',
  initialState,
  reducers: {
    createThreadRequest: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
    createThreadSuccess: (state, action) => {
      // state.userData = action.payload
      // state.userDataLoading = false
    },
    createThreadFailure: (state, action) => {
      // state.userDataLoading = false
      // state.userDataFailureMsg = action.payload
    },
    getThreadlist: {
      reducer: state => state,
      prepare: (
        channel_id,
        sortBy,
        pageSize,
        pageNumber,
        successCallback,
        failureCallback,
      ) => ({
        payload: {
          channel_id,
          sortBy,
          pageSize,
          pageNumber,
          successCallback,
          failureCallback,
        },
      }),
    },
    createAnnouncementRequest: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },

    getAnnouncementsList: {
      reducer: state => state,
      prepare: (
        channel_id,
        pageSize,
        pageNumber,
        successCallback,
        failureCallback,
      ) => ({
        payload: {
          channel_id,
          pageSize,
          pageNumber,
          successCallback,
          failureCallback,
        },
      }),
    },
    updateAnnouncementRequest: {
      reducer: state => {
        state.userDataLoading = true
        state.userDataFailureMsg = ''
      },
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
    updateAnnouncementSuccess: (state, action) => {
      state.userData = action.payload
      state.userDataLoading = false
    },
    updateAnnouncementFailure: (state, action) => {
      state.userDataLoading = false
      state.userDataFailureMsg = action.payload
    },
    deleteAnnouncementRequest: {
      reducer: state => state,
      prepare: (announcementId, successCallback, failureCallback) => ({
        payload: {
          announcementId,
          successCallback,
          failureCallback,
        },
      }),
    },
    createAnnouncementStatusRequest: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
    createAboutUs: {
      reducer: state => state,
      prepare: (formData, successCallback, failureCallback) => ({
        payload: {
          formData,
          successCallback,
          failureCallback,
        },
      }),
    },
    getAboutUs: {
      reducer: state => state,
      prepare: (channel_id, successCallback, failureCallback) => ({
        payload: {
          channel_id,
          successCallback,
          failureCallback,
        },
      }),
    },
    deleteSendbirdMessageRequest: {
      reducer: state => state,
      prepare: (channelUrl, messageId, successCallback, failureCallback) => ({
        payload: {
          channelUrl,
          messageId,
          successCallback,
          failureCallback,
        },
      }),
    },

    threadMessageUpdate: {
      reducer: state => state,
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: {
          requestBody,
          successCallback,
          failureCallback,
        },
      }),
    },
  },
})

const { actions, reducer } = chatSlice

export const {
  createThreadRequest,
  createThreadSuccess,
  createThreadFailure,
  getThreadlist,
  createAnnouncementRequest,
  getAnnouncementsList,
  updateAnnouncementRequest,
  updateAnnouncementSuccess,
  updateAnnouncementFailure,
  deleteAnnouncementRequest,
  createAnnouncementStatusRequest,
  createAboutUs,
  getAboutUs,
  deleteSendbirdMessageRequest,
  threadMessageUpdate
} = actions

export default reducer
