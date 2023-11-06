import 'react-native-gesture-handler'
import React, { useEffect } from 'react'

import RNSplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import ApplicationNavigator from '@/Navigators/Application'
import { store, persistor } from '@/Store'

import { setLoadingState } from './Store/Reducers/Common/LoaderReducer'

import firebase from './Utils/firebase'

const App = () => {
  useEffect(() => {
    RNSplashScreen.hide()
    store.dispatch(setLoadingState(false))
    firebase.init()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App
