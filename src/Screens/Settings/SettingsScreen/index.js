/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { Image, Modal, Pressable, ScrollView, Text, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import {
  account,
  arrowRight,
  bell,
  defaultAvatar,
  help,
  signOut,
  tac,
} from '@/Assets/Images'
import { Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigateAndSimpleReset, navigationRef } from '@/Navigators/utils'
import { logoutService } from '@/Services/modules'
import { setActiveTab } from '@/Store/Reducers/Common/BottomTabReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { logoutUser } from '@/Store/Reducers/User'
import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'
import { userDeleteService } from '@/Services/modules/user/userDeleteService'
import { getToggleNotificationAction } from '@/Store/Reducers/Common/getToggleNotificationReducer'

const settingsOptions = [
  { id: 0, iconImage: bell, title: 'Notifications' },
  { id: 1, iconImage: account, title: 'Account' },
  { id: 2, iconImage: tac, title: 'Terms and Conditions' },
  { id: 3, iconImage: tac, title: 'Privacy Policy' },
  { id: 4, iconImage: help, title: 'Help' },
  { id: 5, iconImage: signOut, title: 'Sign Out' },
]

const SettingsScreen = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.UserReducer.userData)
  const { username, profile_image, email, token } = userData?.user_profile || {}
  const [profilePicture, setProfilePicture] = useState({ uri: profile_image })
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOptionPress = value => {
    switch (value) {
      case 0:
        getNotificationState()
        break
      case 1:
        navigationRef.navigate(ROUTES.ACCOUNT_SCREEN)
        break
      case 2:
        navigationRef.navigate(ROUTES.TERMS_AND_CONDITIONS)
        break
      case 3:
        navigationRef.navigate(ROUTES.PRIVACY_POLICY)
        break
      case 4:
        navigationRef.navigate(ROUTES.HELP_SCREEN)
        break
      case 5:
        setIsModalVisible(true)
        break
      default:
        break
    }
  }

  const getNotificationState = () => {
    dispatch(setLoadingState(true))
    dispatch(
      getToggleNotificationAction(
        response => {
          if (response && response.code === 200) {
            dispatch(setLoadingState(false))
            navigationRef.navigate(ROUTES.NOTIFICATIONS, {
              notificationState: response?.status,
            })
            console.log('From getToggleNotificationAction', response)
          } else {
            dispatch(setLoadingState(false))
          }
        },
        error => {
          console.log('Error in Get Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  const handleLogout = () => {
    setLoadingState(true)
    logoutService(token)
      .then(response => {
        setLoadingState(false)
        console.log(response, '======handleLogout====')
        if (response && response.code === 200) {
          dispatch(logoutUser())
          navigateAndSimpleReset(ROUTES.ONBOARDING)
          dispatch(setActiveTab(0))
        }
      })
      .catch(err => {
        console.log(err, 'Failed to logout')
        setLoadingState(false)
      })
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <Header title="Settings" />
      <ScrollView
        bounces={false}
        contentContainerStyle={{ paddingBottom: responsiveSize(119) }}
        showsVerticalScrollIndicator={false}
        style={styles.mainView}
      >
        <View style={styles.profileWrapper}>
          <View style={styles.profileImg}>
            <Image
              resizeMode="contain"
              source={
                profilePicture
                  ? {
                      uri: profilePicture?.uri,
                    }
                  : defaultAvatar
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.userDetailsView}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.username}>email ID : {email} </Text>
          </View>
        </View>

        {settingsOptions.map((item, index) => (
          <Pressable
            key={index.toString()}
            style={styles.optionWrapper}
            onPress={() => {
              handleOptionPress(index)
            }}
          >
            <View style={styles.optionDescWrapper}>
              <Image source={item.iconImage} style={styles.iconPicture} />
              <Text style={styles.title}> {item.title}</Text>
            </View>
            <View>
              <Image source={arrowRight} style={styles.arrow} />
            </View>
          </Pressable>
        ))}
        <Modal
          transparent
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.parentModal}>
            <View style={styles.modalContainer}>
              <Text style={styles.confirmationText}>
                Are you sure you want to
              </Text>
              <Text style={styles.confirmationText}>sign out?</Text>
              <View style={styles.buttonWrapper}>
                <Pressable
                  style={[
                    styles.pressableStyles,
                    { backgroundColor: Colors.primary },
                  ]}
                  onPress={() => {
                    setIsModalVisible(false)
                    handleLogout()
                  }}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
                <Pressable
                  style={styles.pressableStyles}
                  onPress={() => {
                    setIsModalVisible(false)
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
}
export { SettingsScreen }
