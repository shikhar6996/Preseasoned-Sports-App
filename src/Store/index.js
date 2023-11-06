import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import ChannelReducer from './Reducers/Channels'
import ChatReducer from './Reducers/Chat'
import { CommonReducer } from './Reducers/Common'
import SubscriptionReducer from './Reducers/subscription'
import theme from './Reducers/Theme'
import UserReducer from './Reducers/User'

import sagas from './Sagas'

const RootReducer = combineReducers({
  theme,
  CommonReducer,
  UserReducer,
  ChannelReducer,
  ChatReducer,
  SubscriptionReducer,
})

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['theme'],
  debug: true, // to get useful logging
}

const middleware = []

const sagaMiddleware = createSagaMiddleware()

middleware.push(sagaMiddleware)

if (__DEV__) {
  middleware.push(
    createLogger({
      collapsed: true,
      duration: true,
      timestamp: true,
      colors: {
        title: () => '#F2789F',
        prevState: () => '#de6f0d',
        action: () => '#CAB8FF',
        nextState: () => '#1a9134',
      },
    }),
  )
} r

const persistedReducer = persistReducer(config, RootReducer)

const enhancers = [...middleware]

const persistConfig = { ...enhancers }

const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancers,
})

const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
})

sagaMiddleware.run(sagas)

console.log('Redux Store: ', store?.getState())

export { store, persistor }
