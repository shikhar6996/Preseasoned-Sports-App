/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import {
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { addIcon, folder } from '@/Assets/Images'
import { Button, Header, SubscribeChannelModal } from '@/Components'
import { NamedConstants, ROUTES } from '@/Constants'
import { navigate, navigationRef } from '@/Navigators/utils'
import {
  followUnfollowChannel,
  getChannelDetails,
  getChannelList,
  getFollowedChannelList,
  getPopularChannelList,
} from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors, responsiveSize } from '@/Utils'

import { Carousel } from '../../Components/Carousel'
import { ChannelsYouFollow, SeeAll, PopularChannels } from './Components'
import { styles } from './style'

const ChannelHeader = ({ title, style, arrayList }) => (
  <View style={[styles.yourChannelView, style]}>
    <Text style={styles.yourChannelText}>{title}</Text>
    {arrayList?.count > 5 && <SeeAll title={title} />}
  </View>
)

const ChannelFlatListSeperator = () => (
  <View style={{ width: responsiveSize(30) }} />
)

export const Dashboard = ({ item, index }) => {
  const dispatch = useDispatch()
  const focus = useIsFocused()
  const userData = useSelector(state => state.UserReducer.userData)

  const userId = userData?.user_profile?.id
  const { display_name } = userData?.user_profile || {}
  const [channelList, setChannelList] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const [followedChannelList, setFollowedChannelList] = useState()
  const [popularChannelList, setPopularChannelList] = useState()
  const [newThreadStatus, setNewThreadStatus] = useState()

  const [openModal, setOpenModal] = useState(false)
  const [itemClicked, setItemClicked] = useState(null)
  useEffect(() => {
    if (!openModal) {
      setItemClicked(null)
    }
  }, [openModal])

  const onFollowPress = (item, index, changeStep) => {
    const formdata = new FormData()
    formdata.append('channel_id', item?.channel)
    formdata.append(
      'type',
      item?.is_follow
        ? NamedConstants.FOLLOW_TYPE.UNFOLLOW
        : NamedConstants.FOLLOW_TYPE.FOLLOW,
    )

    dispatch(setLoadingState(true))
    dispatch(
      followUnfollowChannel(
        formdata,
        response => {
          dispatch(setLoadingState(false))
          console.log('Successfully called followUnfollPowAI', response)
          if (response.code === 200) {
            if (typeof changeStep === 'function') {
              changeStep()
            }
            const newData = popularChannelList
            newData.results[index].is_follow =
              !newData.results[index]?.is_follow
            if (newData.results[index].is_follow) {
              newData.results[index].follower_count += 1
            } else {
              newData.results[index].follower_count -= 1
            }
            setPopularChannelList({ ...newData })
            dispatch(
              getFollowedChannelList(
                '',
                5,
                1,
                '',
                data => {
                  dispatch(setLoadingState(false))
                  if (data && data?.results?.length > 0) {
                    setFollowedChannelList(data)
                  }
                },
                error => {
                  console.log('Error in getFollowedChannelList Api ', error)
                  dispatch(setLoadingState(false))
                },
              ),
            )
          }
        },
        err => {
          console.log('Error in calling get Channel Details', err)
        },
      ),
    )
    setOpenModal(false)
  }

  const getInitialChannels = () => {
    dispatch(
      getChannelList(
        5,
        1,
        channeldata => {
          if (channeldata && channeldata?.code === 200) {
            setChannelList(channeldata)
          }
        },
        error => {
          console.log('Error in getChannelList Api ', error)
        },
      ),
    )
    dispatch(
      getFollowedChannelList(
        '',
        5,
        1,
        '',
        data => {
          if (data && data?.results?.length > 0) {
            setFollowedChannelList(data)
            setNewThreadStatus(data?.results?.read_status)
          } else {
            setFollowedChannelList([])
            setNewThreadStatus(data?.results?.read_status)
          }

          dispatch(setLoadingState(false))
        },
        error => {
          console.log('Error in getFollowedChannelList Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )

    dispatch(
      getPopularChannelList(
        '',
        'popular',
        5,
        1,
        data => {
          console.log('data-getPopularChannelList', data)
          if (data && data?.results?.length > 0) {
            setPopularChannelList(data)
          }

          dispatch(setLoadingState(false))
        },
        error => {
          console.log('Error in Api', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  const handleBackgroundStateNotification = async () => {
    const notificationData = await AsyncStorage.getItem('@PR_NOTIFICATION')

    if (notificationData !== null) {
      // Alert.alert('handleBackgroundStateNotification', notificationData)
      const { remoteMessage, notificationRouteState } =
        JSON.parse(notificationData)
      console.log('testfun -------->', remoteMessage, notificationRouteState)
      if (
        remoteMessage &&
        notificationRouteState === NamedConstants.COMMON.VIA_NOTIFICATION
      ) {
        if (remoteMessage && remoteMessage.data) {
          await AsyncStorage.removeItem('@PR_NOTIFICATION', () => {
            if (remoteMessage.data && remoteMessage.data.type) {
              if (remoteMessage.data.type === 'INBOX') {
                navigate(ROUTES.THREADDETAILSCREEN, {
                  lastScreen: NamedConstants.COMMON.VIA_NOTIFICATION,
                  channelId: remoteMessage.data?.channel_id,
                  threadId: remoteMessage.data?.thread_id,
                  msgType: remoteMessage.data.type,
                  notification_id: remoteMessage.messageId,
                })
              }
              if (
                remoteMessage.data.type === 'REPLIED' ||
                remoteMessage.data.type === 'APPROVED' ||
                remoteMessage.data.type === 'FEED'
              ) {
                navigate(ROUTES.THREADDETAILSCREEN, {
                  lastScreen: NamedConstants.COMMON.VIA_NOTIFICATION,
                  channelId: remoteMessage.data?.channel_id,
                  threadId: remoteMessage.data?.thread_id,
                  msgType: remoteMessage.data?.type || 'FEED',
                  thread_name: remoteMessage.data?.thread_name || '',
                  notification_id: remoteMessage.messageId,
                })
              }
            }
          })
        }
      }
    }
  }

  useEffect(() => {
    if (focus === true) {
      getInitialChannels()
      handleBackgroundStateNotification()
      setOpenModal(false)
    }
    return () => {
      setOpenModal(false)
    }
  }, [focus])

  const onItemPress = channelDetails => {
    const formdata = new FormData()
    formdata.append('channel_id', channelDetails?.channel)
    dispatch(
      getChannelDetails(
        formdata,
        response => {
          console.log('Successfully called get Channel Details', response)
          navigationRef.navigate(ROUTES.CHANNEL_DETAILS, {
            lastScreen: ROUTES.DASHBOARD,
            channelDetails: response,
          })
        },
        err => {
          console.log('Error in calling get Channel Details', err)
        },
      ),
    )
  }

  const onRefresh = () => {
    getInitialChannels()
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <Header title="Homepage" />
      <ScrollView
        bounces
        contentContainerStyle={{ paddingBottom: responsiveSize(50) }}
        refreshControl={
          <RefreshControl
            colors={[Colors.primary]} // for android
            refreshing={refreshing}
            tintColor={Colors.primary}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.mainView}
      >
        <View style={styles.welcomeView}>
          <Text style={styles.name}>Welcome {display_name}</Text>
          <View style={styles.folderView}>
            <Pressable
              onPress={() => {
                dispatch(setLoadingState(true))
                navigationRef.navigate(ROUTES.WALLET_SCREEN)
              }}
            >
              <Image source={folder} style={styles.imgIcon} />
            </Pressable>
            <Pressable
              onPress={() =>
                navigationRef.navigate(ROUTES.CREATECHANNEL, {
                  lastScreen: ROUTES.DASHBOARD,
                })
              }
            >
              <Image source={addIcon} style={styles.imgIcon} />
            </Pressable>
          </View>
        </View>

        {channelList && channelList?.count > 0 && (
          <ChannelHeader arrayList={channelList} title="Your Channels" />
        )}

        {channelList?.count === 0 && (
          <Button
            containerStyle={styles.createChannelBtn}
            onPress={() => {
              navigationRef.navigate(ROUTES.CREATECHANNEL, {
                lastScreen: ROUTES.PROFILESCREEN,
              })
            }}
          >
            <Text style={styles.createchannelBtnText}> Create a channel</Text>
          </Button>
        )}

        {channelList && channelList?.count > 0 && (
          <Carousel
            activeDotColor={Colors.primary}
            carouselData={channelList?.results}
            onItemPress={res => {
              onItemPress(res)
            }}
          />
        )}
        {followedChannelList && followedChannelList?.count > 0 && (
          <ChannelHeader
            arrayList={followedChannelList}
            style={{ marginTop: responsiveSize(27) }}
            title="Channels You Follow"
          />
        )}

        <FlatList
          horizontal
          data={followedChannelList?.results}
          ItemSeparatorComponent={ChannelFlatListSeperator}
          keyExtractor={(_, idx) => `ChannelsFollowedKey${idx}`}
          renderItem={({ item, index }) => (
            <ChannelsYouFollow
              item={item}
              userId={userId}
              onItemPress={onItemPress}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
        {popularChannelList && popularChannelList?.count > 0 && (
          <ChannelHeader
            arrayList={popularChannelList}
            style={{ marginTop: responsiveSize(27) }}
            title="Popular Channels"
          />
        )}

        <FlatList
          horizontal
          data={popularChannelList?.results}
          ItemSeparatorComponent={ChannelFlatListSeperator}
          keyExtractor={(_, idx) => `key${idx}`}
          renderItem={({ item, index }) => (
            <PopularChannels
              item={item}
              userId={userId}
              onFollowPress={() => {
                setItemClicked({ item, index })
                if (item.subscription_price > 0 && !item.is_follow) {
                  setOpenModal(true)
                } else {
                  onFollowPress(item, index)
                }
              }}
              onItemPress={onItemPress}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      {openModal && (
        <SubscribeChannelModal
          cancelPress={() => {
            setOpenModal(false)
          }}
          channelId={itemClicked?.item?.channel}
          customStyles={{
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          outsideAreaDisabled={false}
          subscription_price={itemClicked?.item?.subscription_price || 0}
          onConfirmPress={data => {
            onFollowPress(itemClicked?.item, itemClicked?.index, data)
          }}
          onOutsidePress={() => {
            setOpenModal(false)
          }}
        />
      )}
    </View>
  )
}
