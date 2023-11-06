import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'

import { useDispatch } from 'react-redux'

import { Header } from '@/Components'
import { goBack } from '@/Navigators/utils'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { toggleNotificationAction } from '@/Store/Reducers/Common/toggleNotificationReducer'
import { Colors } from '@/Utils'

import { styles } from './styles'

const NotificationScreen = props => {
  const dispatch = useDispatch()

  // const toggleInAppSwitch = () =>
  //   setInAppNotificationEnabled(previousState => !previousState)
  // const [inAppNotificationEnabled, setInAppNotificationEnabled] =
  //   useState(false)

  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(
    props?.route?.params?.notificationState,
  )

  const togglePushNotifySwitch = () => {
    setPushNotificationEnabled(previousState => {
      toggleNotification(!previousState)
      return !previousState
    })
  }

  const toggleNotification = notificationState => {
    const notificationCurrState = new FormData()
    notificationCurrState.append('notification_status', notificationState)

    dispatch(
      toggleNotificationAction(
        notificationCurrState,
        response => {
          if (
            response &&
            response?.code === 200 &&
            response?.status === 'success'
          ) {
            console.log(response, 'response')
          } else {
            dispatch(setLoadingState(false))
          }
        },
        error => {
          console.log('error', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Notifications"
        onPress={() => {
          goBack()
        }}
      />
      <View style={styles.parentContainer}>
        <View style={styles.pushNotifyView}>
          <Text style={styles.pushNotifyText}>Push Notifications</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            thumbColor={
              pushNotificationEnabled ? Colors.primary : Colors.primary
            }
            trackColor={{ false: Colors.darkLiver, true: Colors.white }}
            value={pushNotificationEnabled}
            onValueChange={() => togglePushNotifySwitch()}
          />
        </View>
        <View>
          <Text style={styles.descText}>
            These are notifications from creators (on the channels you follow)
            or your followers (on the channels you have created) when not using
            Preseasoned
          </Text>
        </View>
        {/* <View style={styles.inAppView}>
          <Text style={styles.pushNotifyText}>In-App Notifications</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            thumbColor={
              inAppNotificationEnabled ? Colors.primary : Colors.primary
            }
            trackColor={{ false: Colors.darkLiver, true: Colors.white }}
            value={inAppNotificationEnabled}
            onValueChange={toggleInAppSwitch}
          />
        </View>
        <View>
          <Text style={styles.descText}>
            These are notifications from creators (on the channels you follow)
            or your followers (on the channels you have created) while using
            Preseasoned
          </Text>
        </View> */}
      </View>
    </View>
  )
}

export { NotificationScreen }
