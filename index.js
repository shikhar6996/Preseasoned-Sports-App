/* eslint-disable react/prop-types */
/**
 * @format
 */
import React from 'react'
import { Alert, AppRegistry, Platform } from 'react-native'

import notifee, {
  AndroidImportance,
  AndroidBadgeIconType,
  AndroidCategory,
} from '@notifee/react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'

import { NamedConstants } from '@/Constants'

import { name as appName } from './app.json'
import App from './src/App'

notifee.onBackgroundEvent(async localMessage => {
  console.log('notifee setBackgroundMessageHandler localMessage', localMessage)
})

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Alert.alert('Background_Push_Notification', JSON.stringify(remoteMessage))
  console.log('Background_Push_Notification', remoteMessage)
  if (remoteMessage) {
    await AsyncStorage.setItem(
      '@PR_NOTIFICATION',
      JSON.stringify({
        remoteMessage,
        notificationRouteState: NamedConstants.COMMON.VIA_NOTIFICATION,
      }),
    )
  }
})

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }

  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
