/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from 'react'

import { View, Text, Pressable } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'

import { WalletHeader } from '@/Assets/Images'
import { Header } from '@/Components'
import { NamedConstants } from '@/Constants'
import { goBack } from '@/Navigators/utils'
import { getChannelDetails } from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors, Fonts, respFontSize, responsiveSize } from '@/Utils'

import { Feed } from './Components/Feed'
import { Inbox } from './Components/Inbox'
import { YourMessages } from './Components/YourMessage'
import { styles } from './styles'
import { threadMessageUpdate } from '@/Store/Reducers/Chat'

export const ThreadDetailScreen = props => {
  const {
    channelOwnerId,
    threadId,
    threadName,
    lastScreen,
    channelId,
    msgType,
    thread_name,
    notification_id,
  } = props.route.params ?? {}
  const [channelActiveTab, setChannelActiveTab] = useState(0)
  const userData = useSelector(state => state.UserReducer.userData)
  const userId = userData?.user_profile?.id
  const username = userData?.user_profile?.username
  const [isChannelOwner, setChannelOwner] = useState(userId === channelOwnerId)

  const [channelDetails, setChannelDetails] = useState(null)
  const [numIncomingMsg, setNumIncomingMsg] = useState(0)

  const handleNumIncomingMsg = data => {
    setNumIncomingMsg(data)
  }
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      lastScreen &&
      lastScreen === NamedConstants.COMMON.VIA_NOTIFICATION &&
      channelId &&
      msgType
    ) {
      // get channel details

      dispatch(setLoadingState(true))

      const formdata = new FormData()
      formdata.append('channel_id', channelId)
      console.log(channelId, 'channelId from threaddetailscreen')
      dispatch(
        getChannelDetails(
          formdata,
          response => {
            dispatch(setLoadingState(false))

            console.log('Successfully called get Channel Details', response)
            if (response && response.code === 200) {
              setChannelDetails(response)
              if (msgType === 'INBOX') setChannelActiveTab(1)
              if (msgType === 'FEED') setChannelActiveTab(0)
            }
          },
          err => {
            dispatch(setLoadingState(false))
            console.log('Error in calling get Channel Details', err)
          },
        ),
      )
    }
  }, [lastScreen, channelId, notification_id])

  useEffect(() => {
    if (channelDetails) {
      setChannelOwner(channelDetails.user.id === userId)
    }
  }, [channelDetails])

  useEffect(() => {
    const updateThreadMessageData = new FormData()
    updateThreadMessageData.append('thread_id', threadId)
    dispatch(
      threadMessageUpdate(
        updateThreadMessageData,
        response => {
          if (response && response?.code === 200) {
            console.log(
              '%c response from threadNewMessageUpdateApi! ',
              'background: #222; color: #bada55',
              response,
            )
            dispatch(setLoadingState(false))
          }
        },
        err => {
          console.log('Error in calling threadNewMessageUpdateApi', err)
        },
      ),
    )
  }, [])

  const getActiveTab = useCallback(() => {
    switch (channelActiveTab) {
      case 0:
        return (
          <Feed
            channelOwnerId={
              channelOwnerId || (channelDetails && channelDetails?.user?.id)
            }
            handleNumIncomingMsg={handleNumIncomingMsg}
            loggedInUserId={userId}
            loggedInUserName={username}
            threadId={threadId}
            threadName={threadName || thread_name || ''}
          />
        )
      case 1:
        return (
          <Inbox
            channelOwnerId={
              channelOwnerId || (channelDetails && channelDetails?.user?.id)
            }
            handleNumIncomingMsg={handleNumIncomingMsg}
            loggedInUserId={userId}
            loggedInUserName={username}
            threadId={threadId}
            threadName={threadName || thread_name || ''}
          />
        )
      case 2:
        return (
          <YourMessages
            channelOwnerId={
              channelOwnerId || (channelDetails && channelDetails?.user?.id)
            }
            loggedInUserId={userId}
            loggedInUserName={username}
            threadId={threadId}
            threadName={threadName || thread_name || ''}
          />
        )
      default:
        return null
    }
  }, [channelActiveTab, isChannelOwner])

  const handleBack = async () => {
    await AsyncStorage.removeItem('@PR_NOTIFICATION', goBack)
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        hasRightIcon
        // rightIcon={WalletHeader}
        title="Back to Channel"
        onPress={handleBack}
      />
      <View style={styles.feedInboxView}>
        <Pressable
          style={[
            styles.feedView,
            channelActiveTab === 0
              ? { backgroundColor: Colors.primary }
              : { borderLeftWidth: 0 },
          ]}
          onPress={() => {
            setChannelActiveTab(0)
          }}
        >
          <Text style={styles.feedText}>Feed</Text>
        </Pressable>
        {isChannelOwner ? (
          <Pressable
            style={[
              styles.feedView,
              channelActiveTab === 1
                ? { backgroundColor: Colors.primary }
                : { borderRightWidth: 0, flexDirection: 'row' },
            ]}
            onPress={() => {
              setChannelActiveTab(1)
            }}
          >
            {channelActiveTab === 0 && !!numIncomingMsg && (
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: responsiveSize(3),
                  paddingHorizontal: responsiveSize(8),
                  borderRadius: responsiveSize(10),
                  marginRight: responsiveSize(5),
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.GilroyMedium,
                    fontSize: respFontSize(12),
                    lineHeight: respFontSize(13),
                    color: 'black',
                  }}
                >
                  {numIncomingMsg}
                </Text>
              </View>
            )}
            <Text style={styles.feedText}>Inbox</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.feedView,
              channelActiveTab === 2
                ? { backgroundColor: Colors.primary }
                : { borderRightWidth: 0 },
            ]}
            onPress={() => {
              setChannelActiveTab(2)
            }}
          >
            <Text style={styles.feedText}>Your Messages</Text>
          </Pressable>
        )}
      </View>

      {getActiveTab()}
    </View>
  )
}
