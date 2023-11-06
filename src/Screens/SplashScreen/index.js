import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'

import RNSplashScreen from 'react-native-splash-screen'

import { useDispatch, useSelector } from 'react-redux'

import { logo } from '@/Assets/Images'
import { Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigateAndSimpleReset, navigationRef } from '@/Navigators/utils'

import { setActiveTab } from '@/Store/Reducers/Common/BottomTabReducer'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { responsiveSize } from '@/Utils'

import { styles } from './styles'

const SplashScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.UserReducer)

  const initApp = () => {
    dispatch(setLoadingState(false))
    setTimeout(() => {
      if (navigationRef.isReady()) {
        dispatch(setActiveTab(0))
        if (user && user.userData && user.userData.token) {
          navigateAndSimpleReset(ROUTES.DASHBOARD)
        } else {
          navigateAndSimpleReset(ROUTES.LANDINGPAGE)
        }
      }
    }, 2000)
  }

  useEffect(() => {
    initApp()
  })

  return (
    <View style={styles.mainContainer}>
      <Header title="Welcome!" />
      <View style={styles.mainView}>
        <Image source={logo} style={styles.logo} />
        <Text style={[styles.name, { marginBottom: responsiveSize(0) }]}>
          Preseasoned
        </Text>
        {/* <Text style={styles.name}>(beta)</Text> */}
        <Text style={styles.description}>Tune up, tune in</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version : 1.0</Text>
      </View>
    </View>
  )
}

export default SplashScreen
