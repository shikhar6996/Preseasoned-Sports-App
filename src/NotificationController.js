import { useEffect } from 'react'
import { Alert, Platform } from 'react-native'

import notifee, {
  AndroidImportance,
  AndroidBadgeIconType,
  AndroidCategory,
  EventType,
} from '@notifee/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'

import { useSelector } from 'react-redux'

import { NamedConstants, ROUTES } from './Constants'
import { navigate } from './Navigators/utils'

import { Colors } from './Utils'

const { SENDBIRD_CHAT_CUSTOM_TYPES, COMMON } = NamedConstants

const NotificationController = props => {
  const user = useSelector(state => state.UserReducer)
  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      // Alert.alert('OnMessage-->', JSON.stringify(remoteMessage))

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      })
      const { notification } = remoteMessage
      if (notification)
        await notifee.displayNotification({
          title: notification.title,
          body: notification.body,
          data: remoteMessage.data,
          android: {
            channelId,
            smallIcon: 'ic_notification',
            importance: AndroidImportance.HIGH,
            badgeIconType: AndroidBadgeIconType.SMALL,
            category: AndroidCategory.MESSAGE,
            color: Colors.primary,
            pressAction: {
              id: 'default',
            },
          },
        })
    })
    /**
     *  Added foreground handler for notifee when in foreground
     */
    const foregroundService = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification)
          break
        case EventType.PRESS:
          console.log(
            'User pressed notification type Press',
            detail.notification,
          )
          if (detail.notification) {
            if (detail.notification.data && detail.notification.data.type) {
              if (
                detail.notification.data.type ===
                SENDBIRD_CHAT_CUSTOM_TYPES.INBOX
              ) {
                navigate(ROUTES.THREADDETAILSCREEN, {
                  lastScreen: COMMON.VIA_NOTIFICATION,
                  channelId: detail.notification.data?.channel_id,
                  threadId: detail.notification.data?.thread_id,
                  msgType: detail.notification.data.type,
                  notification_id: detail.notification.id,
                })
              }
              if (
                detail.notification.data.type ===
                  SENDBIRD_CHAT_CUSTOM_TYPES.REPLIED ||
                detail.notification.data.type ===
                  SENDBIRD_CHAT_CUSTOM_TYPES.APPROVED ||
                detail.notification.data.type ===
                  SENDBIRD_CHAT_CUSTOM_TYPES.FEED
              ) {
                navigate(ROUTES.THREADDETAILSCREEN, {
                  lastScreen: COMMON.VIA_NOTIFICATION,
                  channelId: detail.notification.data?.channel_id,
                  threadId: detail.notification.data?.thread_id,
                  msgType: detail.notification.data?.type || 'FEED',
                  thread_name: detail.notification.data?.thread_name || '',
                  notification_id: detail.notification.id,
                })
              }
            }
          }
          break
        default:
          break
      }
    })

    const unsubscribeOnOpenedApp = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        // Alert.alert('onNotificationOpenedApp', JSON.stringify(remoteMessage))
        if (
          remoteMessage &&
          remoteMessage.data &&
          user &&
          user.userData &&
          user.userData.token
        ) {
          if (remoteMessage.data && remoteMessage.data.type) {
            if (remoteMessage.data.type === 'INBOX') {
              navigate(ROUTES.THREADDETAILSCREEN, {
                lastScreen: NamedConstants.COMMON.VIA_NOTIFICATION,
                channelId: remoteMessage.data?.channel_id,
                threadId: remoteMessage.data?.thread_id,
                msgType: remoteMessage.data.type,
                notification_id: remoteMessage.messageId,
              })
            }
            if (
              remoteMessage.data.type === 'REPLIED' ||
              remoteMessage.data.type === 'APPROVED' ||
              remoteMessage.data.type === 'FEED'
            ) {
              navigate(ROUTES.THREADDETAILSCREEN, {
                lastScreen: NamedConstants.COMMON.VIA_NOTIFICATION,
                channelId: remoteMessage.data?.channel_id,
                threadId: remoteMessage.data?.thread_id,
                msgType: remoteMessage.data?.type || 'FEED',
                thread_name: remoteMessage.data?.thread_name || '',
                notification_id: remoteMessage.messageId,
              })
            }
          }
        }
      },
    )

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage && Platform.OS === 'ios') {
          // Alert.alert('getInitialNotif', JSON.stringify(remoteMessage))
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          )
          // Alert.alert('isReady', JSON.stringify(navigationRef.isReady()))

          await AsyncStorage.setItem(
            '@PR_NOTIFICATION',
            JSON.stringify({
              remoteMessage,
              notificationRouteState: NamedConstants.COMMON.VIA_NOTIFICATION,
            }),
          )
        }
      })

    return () => {
      unsubscribeOnMessage()
      foregroundService()
      unsubscribeOnOpenedApp()
    }
  }, [])

  return null
}

export default NotificationController
