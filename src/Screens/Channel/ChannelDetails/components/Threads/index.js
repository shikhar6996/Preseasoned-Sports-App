/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useCallback } from 'react'

import {
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  RefreshControl,
  Linking,
} from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import { useFocusEffect } from '@react-navigation/native'
import _ from 'lodash'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { Card } from '@/Components'

import { ROUTES } from '@/Constants'
import { navigationRef, goBack } from '@/Navigators/utils'
import { createThreadRequest, getThreadlist } from '@/Store/Reducers/Chat'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors, Fonts, height, responsiveSize } from '@/Utils'

import { styles } from './styles'
import { getUserBlockStatus } from '@/Services/modules/channel/checkUserBlockStatus'

const Threads = ({ item, index, onItemPress }) => (
  <Card
    cardContainerStyle={styles.cardContainerStyle}
    onPress={() => onItemPress(item)}
  >
    <View style={styles.mainThreadView}>
      <View style={styles.leftThreadView}>
        <Text numberOfLines={2} style={styles.threadName}>
          {item.name || ' '}
        </Text>

        <Hyperlink
          linkStyle={[
            styles.threadDescription,
            { color: '#2980b9', fontFamily: Fonts.GilroyBold },
          ]}
          // onPress={(url, text) => {
          //   Linking.openURL(url)
          // }}
        >
          <Text numberOfLines={1} style={styles.threadDescription}>
            {item.last_message || ''}
          </Text>
        </Hyperlink>
      </View>

      <View style={{ justifyContent: 'flex-end' }}>
        {/* {(item?.is_new_message[0]?.is_new_message) && (
          <View style={styles.mewMessageView}>
            <Text style={styles.newMessageText}>New Message</Text>
          </View>
        )} */}

        {/* {item.message_time && (
          <Text style={styles.date}>
            {moment(parseInt(item.message_time, 10)).format('DD/MM/YY')}
          </Text>
        )} */}
      </View>
    </View>
  </Card>
)

export const ThreadsTab = props => {
  const {
    channelId,
    channelOwnerId,
    changeActiveTab,
    userFollowsChannel,
    customStyle,
  } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [threadName, setThreadName] = useState('')
  const [threadList, setThreadList] = useState({})
  const [threadsLoaded, setThreadsLoaded] = useState('pending')
  const dispatch = useDispatch()
  const userData = useSelector(state => state.UserReducer.userData)
  const loggedInUserId = userData?.user_profile?.id
  const token = useSelector(state => state.UserReducer.userData.token) || ''
  const [refreshing, setRefreshing] = useState(false)

  const isChannelOwner = loggedInUserId === channelOwnerId

  const channelHasThreads =
    threadsLoaded !== 'pending' &&
    !_.isEmpty(threadList) &&
    threadList.results &&
    Array.isArray(threadList.results) &&
    threadList.results.length

  const getInitialThreadList = () => {
    if (channelId)
      dispatch(
        getThreadlist(
          channelId,
          'desc',
          5,
          1,
          response => {
            if (response && response?.code === 200) {
              setThreadsLoaded('resolved')
              setThreadList(response)
              dispatch(setLoadingState(false))
            }
            if (response && response.code === 400) {
              setThreadsLoaded('rejected')
              dispatch(setLoadingState(false))
            }
          },
          error => {
            setThreadsLoaded('rejected')
            console.log('Error in Api ', error)
            dispatch(setLoadingState(false))
          },
        ),
      )
  }
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      if (isActive) {
        getInitialThreadList()
      }
      return () => {
        isActive = false
      }
    }, []),
  )
  // useEffect(() => {
  //   // dispatch(setLoadingState(true))
  //   getInitialThreadList()
  // }, [])

  const createThread = () => {
    const formdata = new FormData()
    formdata.append('name', threadName.trim())
    formdata.append('channel_id', channelId)
    dispatch(setLoadingState(true))

    dispatch(
      createThreadRequest(
        formdata,
        response => {
          dispatch(setLoadingState(false))
          if (response && response.code === 200) {
            getInitialThreadList()
            // navigationRef.navigate(ROUTES.CHANNEL_DETAILS, {
            //   lastScreen: params.lastScreen || '',
            //   channelDetails: response,
            // })
          } else {
            dispatch(setLoadingState(false))
          }
        },
        error => {
          dispatch(setLoadingState(false))
          console.log('Error in Api ', error)
          Alert.alert('Failed to create thread')
        },
      ),
    )
  }

  const getPaginationData = async () => {
    if (threadList?.next !== null && threadList.results) {
      // dispatch(setLoadingState(true))

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
        redirect: 'follow',
      }

      fetch(threadList?.next, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setThreadList({
            ...result,
            results: [...(threadList && threadList.results), ...result.results],
          })
        })

        .catch(error => console.log('Error in getting new page', error))
        .finally(() => dispatch(setLoadingState(false)))
    }
  }

  const createThreadPress = () => {
    createThread()
    setIsModalVisible(false)
    setThreadName('')
  }

  const handleEditAboutPress = useCallback(() => {
    changeActiveTab(2)
  }, [changeActiveTab])

  const handlePostInCommunityPress = useCallback(() => {
    changeActiveTab(1)
  }, [changeActiveTab])

  const onRefresh = () => {
    getInitialThreadList()
  }

  const checkUserBlockStatus = (threadId, threadName, channelOwnerId) => {
    getUserBlockStatus(token, threadId)
      .then(response => {
        console.log(response, '======block status====')
        if (response && response.code === 200) {
          if (!response?.response?.status) {
            navigationRef.navigate(ROUTES.THREADDETAILSCREEN, {
              channelOwnerId,
              threadId: threadId,
              threadName: threadName,
            })
          } else {
            Alert.alert(
              '',
              'Sorry. you are blocked by the owner. You can no longer post in the group.',
              [
                {
                  text: 'Okay',
                  onPress: () => {
                    goBack()
                  },
                },
              ],
            )
          }
        }
      })
      .catch(err => {
        console.log(err, 'Failed to logout')
        return false
      })
  }

  return (
    <View
      style={[styles.mainView, { marginTop: responsiveSize(20) }, customStyle]}
    >
      {threadsLoaded !== 'pending' && isChannelOwner && !channelHasThreads && (
        <View style={styles.welcomeMessageView}>
          <Text style={styles.welcomeMessage}>
            Your new channel has been created.
          </Text>
          <Text style={[styles.welcomeMessage, { marginTop: 20 }]}>
            Update your channel's About tab, post generic messages for all your
            followers on the Community tab or create topic-specific Threads
          </Text>

          <View style={styles.buttonsView}>
            <Pressable
              style={styles.welcomeViewButton}
              onPress={handleEditAboutPress}
            >
              <Text style={styles.welcomeViewButtonText}>Edit About</Text>
            </Pressable>
            <Pressable
              style={[styles.welcomeViewButton, styles.postInCommunityButton]}
              onPress={handlePostInCommunityPress}
            >
              <Text style={styles.welcomeViewButtonText}>
                Post in Community
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {threadsLoaded !== 'pending' && !isChannelOwner && !channelHasThreads && (
        <View style={styles.welcomeMessageView}>
          <Text style={styles.welcomeMessage}>
            This channel does not have any threads yet.
          </Text>
        </View>
      )}
      <View style={styles.flatlistView}>
        <FlatList
          data={threadList && threadList.results}
          keyExtractor={item => `userChannelsKey${item.id}`}
          refreshControl={
            <RefreshControl
              colors={[Colors.primary]} // for android
              refreshing={refreshing}
              tintColor={Colors.primary}
              onRefresh={onRefresh}
            />
          }
          renderItem={({ item }) => (
            <Threads
              item={item}
              onItemPress={() => {
                if (!userFollowsChannel && !isChannelOwner) {
                  Alert.alert(
                    'You need to follow the channel to view the thread',
                    '',
                  )
                  return
                }
                // checkUserBlockStatus(item.id, item.name, channelOwnerId)
                navigationRef.navigate(ROUTES.THREADDETAILSCREEN, {
                  channelOwnerId,
                  threadId: item.id,
                  threadName: item.name,
                })
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={getPaginationData}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: responsiveSize(10) }}>
        {isChannelOwner && (
          <Pressable
            style={styles.startThreadBtn}
            onPress={() => {
              setIsModalVisible(true)
            }}
          >
            <Text style={styles.startThreadText}>Start a new thread</Text>
          </Pressable>
        )}
      </View>
      <Modal
        transparent
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={-((height - responsiveSize(230)) / 2) + 70}
        >
          <Pressable
            style={styles.transparentPressable}
            onPress={() => {
              Keyboard.dismiss()
              setIsModalVisible(false)
            }}
          />
          <View style={styles.threadsContentView}>
            <Text style={styles.threadName}>{`Enter new thread's name`}</Text>

            <TextInput
              autoCorrect={false}
              maxLength={30}
              returnKeyLabel="done"
              returnKeyType="done"
              selectionColor={Colors.white}
              style={styles.textInputStyles}
              value={threadName}
              onChangeText={text => setThreadName(text)}
            />
            <Text style={styles.countThreadName}>{threadName.length}/30</Text>
            <Pressable
              style={styles.createThreadBtn}
              onPress={createThreadPress}
            >
              <Text style={styles.createThreadText}>Create Thread</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}
