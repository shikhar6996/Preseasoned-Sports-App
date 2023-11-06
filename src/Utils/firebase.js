import { Alert } from 'react-native'

import messaging from '@react-native-firebase/messaging'

import { store } from '@/Store'

import { setFirebaseToken } from "../Store/Reducers/User"

class Firebase {
  async init() {
    this.getToken()
  }

  async getToken() {
    const authorizationStatus = await messaging().requestPermission()

    const state = store.getState()
    let { fcmToken } = state.UserReducer

    if (!fcmToken) {
      fcmToken = await messaging().getToken()
      if (fcmToken) {
        // Alert.alert('', JSON.stringify(fcmToken))
        store.dispatch(setFirebaseToken(fcmToken))
      }
    }
  }
}

export default new Firebase()
