/* eslint-disable import/no-extraneous-dependencies */
import AsyncStorage from '@react-native-async-storage/async-storage'
import SendBird from 'sendbird'

import { Config } from '@/Config'

export const sendbird = new SendBird({ appId: Config.SENDBIRD_APP_ID })
sendbird.useAsyncStorageAsDatabase(AsyncStorage)

export const isImage = messageType => messageType?.match(/^image\/.+$/)
