/* eslint-disable react/prop-types */
import React from 'react'

import { Text, View, Image, Alert, Pressable } from 'react-native'

import { useDispatch } from 'react-redux'

import { Lock } from '@/Assets/Images'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'
import { Follow } from '@/Screens/Dashboard/Components'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { getAnotherUserDetails } from '@/Store/Reducers/User'

import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const NewThread = () => (
  <View style={styles.newThreadview}>
    <Text style={styles.newThreadText}>New Thread</Text>
  </View>
)

const LockComp = () => (
  <View
    style={{
      backgroundColor: Colors.primary,
      borderRadius: responsiveSize(15),
      padding: responsiveSize(5),
    }}
  >
    <Image
      source={Lock}
      style={{
        width: responsiveSize(15),
        height: responsiveSize(15),
        resizeMode: 'contain',
      }}
    />
  </View>
)

const ChannelCard = ({
  channelName,
  channelImageUri,
  channelUserName,
  followerCount,
  channelUserId,
  userId,
  channel,
  onFollowPress,
  newThreadStatus,
}) => {
  const dispatch = useDispatch()

  const handleUserNamePress = () => {
    if (channelUserId) {
      dispatch(setLoadingState(true))
      dispatch(
        getAnotherUserDetails(
          channelUserId,
          response => {
            if (response && response?.code === 200) {
              dispatch(setLoadingState(false))
              navigationRef.navigate(ROUTES.OTHER_USER_PROFILE, {
                channelUserId,
                anotherUser: response,
              })
            } else {
              Alert.alert(response?.message, '')
            }
            dispatch(setLoadingState(false))
          },
          error => {
            console.log('Error in Api ', error)
            dispatch(setLoadingState(false))
          },
        ),
      )
    }
  }

  return (
    <>
      <View style={styles.threadView}>
        {newThreadStatus && <NewThread />}
        {channel?.subscription_price > 0 && <LockComp />}
      </View>

      <View style={styles.parentView}>
        <View style={styles.profileView}>
          <Image
            resizeMode="contain"
            source={{ uri: channelImageUri }}
            style={styles.userImgStyles}
          />
        </View>

        <View style={styles.sectionView}>
          <Text numberOfLines={2} style={styles.sectionText}>
            {channelName}
          </Text>
          {channelUserName && (
            <Pressable onPress={handleUserNamePress}>
              <Text numberOfLines={2} style={styles.userNameText}>
                @{channelUserName}
              </Text>
            </Pressable>
          )}
          <Text numberOfLines={1} style={styles.followerCountText}>
            Followers: {followerCount}
          </Text>

          {onFollowPress && (
            <View style={styles.followView}>
              {channelUserId !== userId && (
                <Follow item={channel} onFollowPress={onFollowPress} />
              )}
            </View>
          )}
        </View>
      </View>
    </>
  )
}

export default ChannelCard
