/* eslint-disable react/no-array-index-key */
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { TouchableOpacity, View, Image, Alert, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { chat, explore, home, profile, settings } from '@/Assets/Images'

import { ROUTES } from '@/Constants'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { setActiveTab } from '@/Store/Reducers/Common/BottomTabReducer'
import { Colors } from '@/Utils'

import { styles } from './styles'

const BottomTabNavigator = () => {
  const iconsObjects = [
    { id: 0, iconImage: home, FocusedIcon: home },
    { id: 1, iconImage: explore, FocusedIcon: explore },
    // { id: 2, iconImage: chat, FocusedIcon: chat },
    { id: 3, iconImage: profile, FocusedIcon: profile },
    { id: 4, iconImage: settings, FocusedIcon: settings },
  ]

  const { activeTabIndex } = useSelector(
    state => state.CommonReducer.BottomTabReducer || 0,
  )
  const dispatch = useDispatch()
  const [iconObject, setIconsObject] = useState(iconsObjects)

  const user = useSelector(state => state.UserReducer)

  const changeRoute = value => {
    switch (value) {
      case 0:
        return navigateAndSimpleReset(ROUTES.DASHBOARD)
      case 1:
        return navigateAndSimpleReset(ROUTES.EXPLORE_SCREEN)
      case 2:
        return navigateAndSimpleReset(ROUTES.DASHBOARD)
      case 3:
        return navigateAndSimpleReset(ROUTES.PROFILESCREEN)
      case 4:
        return navigateAndSimpleReset(ROUTES.SETTINGS_SCREEN)
      default:
        return navigateAndSimpleReset(ROUTES.DASHBOARD)
    }
  }
  const [ready, setIsReady] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 2000)
  })
  if (user && user.userData && user.userData.token && ready) {
    return (
      <>
        <View style={styles.divider} />
        <View style={styles.iconContainer}>
          {iconObject.map((icon, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.touchable}
              onPress={() => {
                dispatch(setActiveTab(icon.id))
                changeRoute(icon.id)
                // navigateAndSimpleReset(ROUTES.DASHBOARD)
              }}
            >
              {activeTabIndex === icon.id ? (
                <Image
                  source={icon.iconImage}
                  style={[styles.iconPicture, { tintColor: Colors.primary }]}
                />
              ) : (
                <Image source={icon.iconImage} style={styles.iconPicture} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </>
    )
  }
  return null
}

export { BottomTabNavigator }
