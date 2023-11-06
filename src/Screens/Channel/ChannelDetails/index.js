/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { editButton, followerCount, rupee, WalletHeader } from '@/Assets/Images'

import { Header, SubscribeChannelModal } from '@/Components'

import { ROUTES, NamedConstants } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { followUnfollowChannel } from '@/Store/Reducers/Channels'
import { setActiveTab } from '@/Store/Reducers/Common/BottomTabReducer'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { getAnotherUserDetails } from '@/Store/Reducers/User'
import { Colors, responsiveSize } from '@/Utils'

import { AboutTab, CommunityTab, ThreadsTab } from './components'
import { styles } from './styles'

export const ChannelDetails = ({ route }) => {
  const { params } = route ?? {}
  const {
    channel_bio,
    user,
    id,
    is_follow,
    name,
    profile_image,
    follower_count,
    subscription_price,
  } = params?.channelDetails ?? {}

  const focus = useIsFocused()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.UserReducer.userData)

  const userId = userData?.user_profile?.id
  const [followed, setFollowed] = useState(is_follow)

  const [followersCount, setFollowerCount] = useState(follower_count)
  const [channelActiveTab, setChannelActiveTab] = useState(0)

  const channelUserId = user?.id
  const changeActiveTab = value => setChannelActiveTab(value)
  const [openModal, setOpenModal] = useState(false)

  const showModal = () => {
    if (subscription_price > 0 && !followed && channelUserId !== userId)
      return true

    return false
  }

  useEffect(() => {
    if (focus) {
      const val = showModal()
      setOpenModal(val)
    }

    return () => {
      setOpenModal(false)
    }
  }, [focus, followed])

  const getActiveTab = () => {
    switch (channelActiveTab) {
      case 0:
        return (
          <ThreadsTab
            changeActiveTab={changeActiveTab}
            channelId={id}
            channelOwnerId={user?.id}
            customStyle={{
              opacity: openModal ? 0.2 : 1,
            }}
            userFollowsChannel={followed}
          />
        )
      case 1:
        return <CommunityTab channelId={id} id={user?.id} />
      case 2:
        return (
          <AboutTab
            channelDetails={params?.channelDetails}
            channelId={id}
            id={user?.id}
          />
        )

      default:
        return null
    }
  }

  const handleFollowPress = successAction => {
    const formdata = new FormData()
    formdata.append('channel_id', id)
    formdata.append(
      'type',
      followed
        ? NamedConstants.FOLLOW_TYPE.UNFOLLOW
        : NamedConstants.FOLLOW_TYPE.FOLLOW,
    )

    dispatch(
      followUnfollowChannel(
        formdata,
        response => {
          if (response.code === 200) {
            if (typeof successAction === 'function') {
              successAction()
            } else {
              if (!followed) {
                setFollowerCount(followersCount + 1)
              } else {
                setFollowerCount(followersCount - 1)
              }
              setFollowed(!followed)
            }

            dispatch(setLoadingState(false))
          }
        },
        err => {
          console.log('Error in calling get Channel Details', err)
        },
      ),
    )
  }
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
  const handleBackPress = () => {
    if (params && params.lastScreen) {
      let tabIndex = 0
      if (params.lastScreen === ROUTES.PROFILESCREEN) {
        tabIndex = 3
        dispatch(setActiveTab(tabIndex))
        navigationRef.navigate(ROUTES.DASHBOARD)
      } else if (params.lastScreen === ROUTES.SELECTED_SPORTS) {
        navigationRef.navigate(ROUTES.SELECTED_SPORTS)
      } else if (params.lastScreen === ROUTES.OTHER_USER_PROFILE) {
        navigationRef.navigate(ROUTES.OTHER_USER_PROFILE)
      } else {
        tabIndex = 0
        dispatch(setActiveTab(tabIndex))
        navigationRef.navigate(ROUTES.DASHBOARD)
      }
    } else {
      goBack()
    }
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <Header
          hasBackButton
          hasRightIcon
          rightIcon={userId === user?.id ? WalletHeader : ''}
          title="Channel"
          onIconPress={() => {
            navigationRef.navigate(ROUTES.WALLET_SCREEN)
          }}
          onPress={handleBackPress}
        />
        <View style={styles.mainUpperView}>
          <View style={[styles.rowView, { alignItems: 'center' }]}>
            <View style={styles.profileImg}>
              <Image source={{ uri: profile_image }} style={styles.avatar} />
            </View>

            <View style={styles.channelDetailsView}>
              <Text style={styles.channelName}>{name}</Text>
              <Pressable
                disabled={userId === user?.id}
                onPress={handleUserNamePress}
              >
                <Text style={styles.channelName}>By @{user?.username}</Text>
              </Pressable>
            </View>
            {userId === user?.id && (
              <Pressable
                onPress={() => {
                  navigationRef.navigate(ROUTES.EDIT_CHANNEL, {
                    channelDetails: params?.channelDetails || {},
                  })
                }}
              >
                <Image source={editButton} style={styles.edit} />
              </Pressable>
            )}

            {userId !== user?.id && (
              <TouchableOpacity
                style={[
                  styles.followButton,
                  {
                    paddingVertical: responsiveSize(8),
                    backgroundColor: followed ? Colors.primary : 'transparent',
                  },
                ]}
                onPress={handleFollowPress}
              >
                <Text style={styles.followText}>
                  {followed ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bioView}>
            <View style={styles.followersView}>
              <View style={styles.followersInnerView}>
                <Image source={rupee} style={styles.followerIcon} />
                <Image
                  source={followerCount}
                  style={[
                    styles.followerIcon,
                    { marginTop: responsiveSize(5) },
                  ]}
                />
              </View>
              <View style={styles.followersInnerView}>
                <Text style={styles.count}>{subscription_price}/mo</Text>
                <Text style={styles.count}>{followersCount ?? 0}</Text>
              </View>
            </View>
            <Text numberOfLines={2} style={styles.bio}>
              {channel_bio}
            </Text>
          </View>
        </View>

        <View style={styles.rowView}>
          <Pressable
            style={[
              styles.button,
              channelActiveTab === 0 ? { backgroundColor: Colors.primary } : {},
            ]}
            onPress={() => {
              if (channelActiveTab !== 0) {
                setChannelActiveTab(0)
              }
            }}
          >
            <Text style={styles.heading}>Threads</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              channelActiveTab === 1 ? { backgroundColor: Colors.primary } : {},
            ]}
            onPress={() => {
              if (channelActiveTab !== 1) {
                setChannelActiveTab(1)
              }
            }}
          >
            <Text style={styles.heading}>Community</Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              channelActiveTab === 2 ? { backgroundColor: Colors.primary } : {},
            ]}
            onPress={() => {
              if (channelActiveTab !== 2) {
                setChannelActiveTab(2)
              }
            }}
          >
            <Text style={styles.heading}>About</Text>
          </Pressable>
        </View>
        {getActiveTab()}
      </View>

      {openModal && (
        <SubscribeChannelModal
          channelId={id}
          goToChannelPress={() => {
            if (!followed) {
              setFollowerCount(followersCount + 1)
            } else {
              setFollowerCount(followersCount - 1)
            }
            setFollowed(!followed)
          }}
          subscription_price={subscription_price}
          onConfirmPress={handleFollowPress}
        />
      )}
    </>
  )
}
