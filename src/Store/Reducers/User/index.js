/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
  userDataLoading: false,
  userDataFailureMsg: '',
  fcmToken: '',
}

export const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    registerRequest: {
      reducer: state => {
        state.userDataLoading = true
        state.userDataFailureMsg = ''
      },
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
    registerSuccess: (state, action) => {
      state.userData = action.payload
      state.userDataLoading = false
    },
    registerFailure: (state, action) => {
      state.userDataLoading = false
      state.userDataFailureMsg = action.payload
    },

    loginRequest: {
      reducer: state => {
        state.userDataLoading = true
        state.userDataFailureMsg = ''
      },
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
    loginSuccess: (state, action) => {
      state.userData = action.payload
      state.userDataLoading = false
    },
    loginFailure: (state, action) => {
      state.userDataLoading = false
      state.userDataFailureMsg = action.payload
    },
    logoutUser: state => {
      state.userDataLoading = false
      state.userData = {}
      state.userDataFailureMsg = ''
    },
    updateUserProfileRequest: {
      reducer: state => {
        state.userDataLoading = true
        state.userDataFailureMsg = ''
      },
      prepare: (requestBody, successCallback, failureCallback) => ({
        payload: { requestBody, successCallback, failureCallback },
      }),
    },
    updateUserProfileSuccess: (state, action) => {
      state.userData.user_profile = {
        ...state.userData.user_profile,
        ...action.payload,
      }
      state.userDataLoading = false
    },
    updateUserProfileFailure: (state, action) => {
      state.userDataLoading = false
      state.userDataFailureMsg = action.payload
    },
    getAnotherUserDetails: {
      reducer: state => state,
      prepare: (userId, successCallback, failureCallback) => ({
        payload: { userId, successCallback, failureCallback },
      }),
    },
    changePassword: {
      reducer: state => state,
      prepare: (
        old_password,
        new_password,
        successCallback,
        failureCallback,
      ) => ({
        payload: {
          old_password,
          new_password,
          successCallback,
          failureCallback,
        },
      }),
    },
    setFirebaseToken: (state, action) => {
      state.fcmToken = action.payload
    },
  },
})

const { actions, reducer } = userSlice

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutUser,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  getAnotherUserDetails,
  changePassword,
  setFirebaseToken,
} = actions

export default reducer
