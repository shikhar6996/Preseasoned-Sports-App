/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react'

import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AppState,
  Pressable,
  Alert,
  Modal,
  Keyboard,
  Linking,
  SafeAreaView,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'
import moment from 'moment'

import Hyperlink from 'react-native-hyperlink'
import ImagePicker from 'react-native-image-crop-picker'
import { useDispatch, useSelector } from 'react-redux'

import {
  arrowLeft,
  arrowRight,
  defaultAvatar,
  picFromCamera,
  picFromGallery,
  pin,
  timer,
} from '@/Assets/Images'
import { BottomSheet, Header, Input } from '@/Components'
import { NamedConstants } from '@/Constants'
import {
  getUnreadSendbirdMessage,
  updateSendbirdMessage,
} from '@/Services/modules/chat'
import { reportMessageService } from '@/Services/modules/user/reportMessage'
import { reportThreadService } from '@/Services/modules/user/reportThread'
import { deleteSendbirdMessageRequest } from '@/Store/Reducers/Chat'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import {
  Colors,
  Fonts,
  getDateDifferenceInDesiredFormat,
  height,
  isImage,
  responsiveSize,
  sendbird,
} from '@/Utils'

import { styles } from './styles'

const {
  SENDBIRD_CHAT_CUSTOM_TYPES: { FEED, APPROVED, REPLIED, INBOX },
  MESSAGE_TYPE_FILTER,
  REPLY_TYPE,
  ON_LONG_PRESS_MESG_TYPES,
} = NamedConstants

const ItemSeparatorComponent = () => (
  <View style={styles.itemSeparatorComponent} />
)

const ReplyToUser = (
  item,
  loggedInUserId,
  setOptionsModalVisible,
  setSelectedMessage,
  channelOwnerId,
  handleSetGalleryImage,
  openSendImageModal,
) => {
  const { _sender, parentMessage, message, createdAt, customType, type } = item

  if (customType === APPROVED) {
    return (
      <View style={styles.parentContainer}>
        <Pressable
          // disabled={loggedInUserId !== channelOwnerId}
          style={styles.rightContainer}
          onLongPress={() => {
            setSelectedMessage(item)
            setOptionsModalVisible(true)
          }}
        >
          {/* <View style={styles.userImgView}>
            <Image
              defaultSource={defaultAvatar}
              source={{ uri: _sender?.plainProfileUrl }}
              style={styles.imageStyles}
            />
          </View> */}
          <View
            style={[
              styles.firstPersonTitleView,
              { marginLeft: responsiveSize(10) },
            ]}
          >
            <Text style={styles.firstPersonTitle}>{_sender.nickname}</Text>
            {isImage(type) ? (
              <Pressable
                onLongPress={() => {
                  setSelectedMessage(item)
                  setOptionsModalVisible(true)
                }}
                onPress={() => {
                  handleSetGalleryImage({ path: item?.url, listPreview: true })
                  openSendImageModal()
                }}
              >
                <Image
                  resizeMode="cover"
                  source={{ uri: item?.url }}
                  style={{
                    height: responsiveSize(100),
                    width: '100%',
                    marginTop: responsiveSize(5),
                  }}
                />
              </Pressable>
            ) : (
              <Hyperlink
                linkStyle={[
                  styles.firstPersonMessage,
                  { color: '#2980b9', fontFamily: Fonts.GilroyBold },
                ]}
                onPress={(url, text) => {
                  Linking.openURL(url)
                }}
              >
                <Text style={styles.firstPersonMessage}>{message}</Text>
              </Hyperlink>
            )}

            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                {getDateDifferenceInDesiredFormat(
                  moment.utc(createdAt).format(),
                )}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.rightTriangle} />
      </View>
    )
  }

  if (customType === REPLIED) {
    return (
      <View style={styles.parentContainer}>
        <Pressable
          // disabled={loggedInUserId !== channelOwnerId}
          style={styles.rightReplyContainer}
          onLongPress={() => {
            setSelectedMessage(item)
            setOptionsModalVisible(true)
          }}
        >
          <View style={styles.repliedView}>
            <Text style={styles.senderName}>
              {parentMessage?._sender.userId === loggedInUserId
                ? 'You said'
                : parentMessage?._sender?.nickname}
            </Text>
            {isImage(parentMessage?.type) ? (
              <Pressable
                onLongPress={() => {
                  setSelectedMessage(item)
                  setOptionsModalVisible(true)
                }}
                onPress={() => {
                  handleSetGalleryImage({
                    path: parentMessage?.url,
                    listPreview: true,
                  })
                  openSendImageModal()
                }}
              >
                <Image
                  resizeMode="cover"
                  source={{ uri: parentMessage?.url }}
                  style={{
                    height: responsiveSize(100),
                    width: '100%',
                  }}
                />
              </Pressable>
            ) : (
              <Hyperlink
                linkStyle={[
                  styles.textMessage,
                  { color: '#2980b9', fontFamily: Fonts.GilroyBold },
                ]}
                onPress={(url, text) => {
                  Linking.openURL(url)
                }}
              >
                <Text style={styles.textMessage}>{parentMessage?.message}</Text>
              </Hyperlink>
            )}
          </View>
          <View>
            <Text style={styles.currentUserTitle}>
              {loggedInUserId === _sender.userId
                ? 'You replied'
                : 'Creator replied'}
            </Text>
            <Hyperlink
              linkStyle={[
                styles.repliedTextMessage,
                { color: '#2980b9', fontFamily: Fonts.GilroyBold },
              ]}
              onPress={(url, text) => {
                Linking.openURL(url)
              }}
            >
              <Text style={styles.repliedTextMessage}>{message}</Text>
            </Hyperlink>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>
              {getDateDifferenceInDesiredFormat(moment.utc(createdAt).format())}
            </Text>
          </View>
        </Pressable>
        <View style={styles.rightTriangle} />
      </View>
    )
  }
  return null
}

const RegularFeedPost = (
  item,
  loggedInUserId,
  setOptionsModalVisible,
  setSelectedMessage,
  channelOwnerId,
  handleSetGalleryImage,
  openSendImageModal,
) => {
  const { _sender, message, createdAt, type } = item

  return (
    <View style={styles.mainView}>
      <View style={styles.leftTriangleStyles} />
      <Pressable
        // disabled={loggedInUserId !== channelOwnerId}
        style={styles.leftContainer}
        onLongPress={() => {
          setSelectedMessage(item)
          setOptionsModalVisible(true)
        }}
      >
        <View style={styles.userImgView}>
          <Image
            defaultSource={defaultAvatar}
            source={{ uri: _sender?.plainProfileUrl }}
            style={styles.imageStyles}
          />
        </View>
        <View style={styles.firstPersonTitleView}>
          <Text style={styles.firstPersonTitle}>
            {_sender.userId !== loggedInUserId ? _sender.nickname : 'You Said'}
          </Text>
          {isImage(type) ? (
            <Pressable
              onLongPress={() => {
                setSelectedMessage(item)
                setOptionsModalVisible(true)
              }}
              onPress={() => {
                handleSetGalleryImage({ path: item?.url, listPreview: true })
                openSendImageModal()
              }}
            >
              <Image
                resizeMode="cover"
                source={{ uri: item?.url }}
                style={{
                  height: responsiveSize(100),

                  width: '100%',
                  marginTop: responsiveSize(5),
                }}
              />
            </Pressable>
          ) : (
            <Hyperlink
              linkStyle={[
                styles.firstPersonMessage,
                { color: '#2980b9', fontFamily: Fonts.GilroyBold },
              ]}
              onPress={(url, text) => {
                Linking.openURL(url)
              }}
            >
              <Text style={styles.firstPersonMessage}>{message}</Text>
            </Hyperlink>
          )}
          <View style={styles.dateView}>
            <Text style={styles.dateText}>
              {getDateDifferenceInDesiredFormat(moment.utc(createdAt).format())}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export const Feed = props => {
  const {
    loggedInUserId,
    threadId,
    channelOwnerId,
    threadName,
    loggedInUserName,
    handleNumIncomingMsg,
  } = props

  console.log(loggedInUserId, 'loggedInUserIdloggedInUserId')
  console.log(props, 'propssssssss')

  const flatListRef = useRef(null)
  const dispatch = useDispatch()

  const userData = useSelector(state => state.UserReducer.userData)
  const { token } = userData?.user_profile || {}

  const [text, setText] = useState('')
  const [query, setQuery] = useState()
  const [senbirdChannel, setSendbirdChannel] = useState(null)
  const [feedMessages, setFeedMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [newEditMessage, setNewEditMessage] = useState('')
  const [option, setOption] = useState('')

  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false)
  const [editMessageModal, setEditMessageModal] = useState(false)
  const [cameraModalIsVisible, setCameraModalIsVisible] = useState(false)
  const [sendImageModal, setSendImageModal] = useState(false)
  const [isGalleryImage, setIsGalleryImage] = useState(null)

  const [isPopup, setIsPopup] = useState()

  const connectionHandler = new sendbird.ConnectionHandler()
  const channelHandler = new sendbird.ChannelHandler()
  const chatHandler = new sendbird.ChannelHandler()

  const handleSetGalleryImage = data => {
    setIsGalleryImage(data)
  }
  const openSendImageModal = () => {
    setSendImageModal(true)
  }

  useEffect(async () => {
    const feedPopup = await AsyncStorage.getItem('@FEED_ALERT')
    if (!feedPopup && channelOwnerId !== loggedInUserId) {
      Alert.alert(
        'You can report a Message or Thread on long press of a message',
      )
      await AsyncStorage.setItem('@FEED_ALERT', 'true')
    }
  }, [])

  useEffect(() => {
    getUnreadSendbirdMessage(threadId, userData?.user_profile?.id)
      .then(response => {
        handleNumIncomingMsg(response.unread[userData?.user_profile?.id])
        console.log(response, 'getUnreadSendbirdMessage response')
      })
      .catch(err => {
        console.log('udpate message', err)
      })
  }, [])

  useEffect(() => {
    if (!isOptionsModalVisible) {
      setOption('')
      setNewEditMessage('')
    }
  }, [isOptionsModalVisible])

  useEffect(() => {
    if (option === ON_LONG_PRESS_MESG_TYPES.EDIT) {
      setTimeout(() => {
        setEditMessageModal(true)
      }, 500)
      setNewEditMessage(selectedMessage.message)
    }
  }, [option])

  const next = () => {
    console.log('queryquery', query)
    if (query.hasMore) {
      query.includeParentMessageText = true
      query.includeParentMessageInfo = true
      query.includeThreadInfo = true
      query.messageTypeFilter = MESSAGE_TYPE_FILTER.ALL
      query.replyType = REPLY_TYPE.ALL
      query.reverse = true
      query.limit = 10
      query.customTypesFilter = [FEED, APPROVED, REPLIED]
      query.load((fetchedMessages, err) => {
        if (!err) {
          console.log(fetchedMessages, 'fetched Messages')
          setFeedMessages(prevState => [...prevState, ...fetchedMessages])
        } else {
          console.log(err, 'error in fetching Messages')
        }
      })
    }
  }

  const getPreviousMessagesInChannel = () => {
    if (senbirdChannel) {
      setQuery(senbirdChannel?.createPreviousMessageListQuery())
    }
  }
  const getChannel = () => {
    sendbird.GroupChannel.getChannel(threadId, (groupChannel, error) => {
      if (!error) {
        console.log('groupChannelgroupChannel', groupChannel)

        setSendbirdChannel(groupChannel)
      }
    })
  }

  const handleStateChange = newState => {
    if (newState === 'active') {
      sendbird.setForegroundState()
    } else {
      sendbird.setBackgroundState()
    }
  }
  useEffect(() => {
    sendbird.addConnectionHandler('channels', connectionHandler)
    sendbird.addChannelHandler('channels', channelHandler)
    sendbird.addChannelHandler('chat', chatHandler)
    const unsubscribe = AppState.addEventListener('change', handleStateChange)

    sendbird.connect(loggedInUserId, (user, err) => {
      if (!err) {
        if (user.userId !== loggedInUserId) {
          sendbird.updateCurrentUserInfo(loggedInUserName, '', (_, error) => {
            if (!error) {
              getChannel()
            }
          })
        }
        if (user) getChannel()
      } else {
        console.log('')
      }
    })

    return () => {
      sendbird.removeConnectionHandler('channels')
      sendbird.removeChannelHandler('channels')
      sendbird.removeChannelHandler('chat')
      unsubscribe.remove()
    }
  }, [])

  useEffect(() => {
    if (senbirdChannel) {
      console.log(senbirdChannel, '--------')
      getPreviousMessagesInChannel()
    }
  }, [senbirdChannel])

  useEffect(() => {
    if (query) {
      next()
    }
  }, [query])

  connectionHandler.onReconnectStarted = () => {
    console.log('')
  }
  connectionHandler.onReconnectSucceeded = () => {
    console.log('')
    getChannel()
  }
  connectionHandler.onReconnectFailed = () => {
    console.log('')
  }

  channelHandler.onUserJoined = (channel, user) => {
    if (user.userId === sendbird.currentUser.userId) {
      console.log('OnUserJoined', channel)
    }
  }
  channelHandler.onUserLeft = (channel, user) => {
    if (user.userId === sendbird.currentUser.userId) {
      console.log('onUserLeft', channel)
    }
  }
  channelHandler.onChannelChanged = channel => {
    console.log('onChannelChanged', channel)
  }
  channelHandler.onChannelDeleted = channel => {
    console.log('onChannelDeleted', channel)
  }

  chatHandler.onMessageReceived = (targetChannel, message) => {
    console.log('onMessageReceived', message)
    handleNumIncomingMsg(prev => prev + 1)

    if (targetChannel.url === threadId && message.messageId) {
      if (
        [FEED, APPROVED, REPLIED].includes(message.customType) &&
        loggedInUserId !== channelOwnerId
      )
        setFeedMessages(prevState => [message, ...prevState])
    }
  }
  chatHandler.onMessageUpdated = (targetChannel, message) => {
    if (targetChannel.url === threadId) {
      if (
        [APPROVED].includes(message.customType) &&
        loggedInUserId !== channelOwnerId
      )
        setFeedMessages(prevState => [message, ...prevState])

      if (REPLIED === message.customType && loggedInUserId !== channelOwnerId) {
        setFeedMessages(prevState => [
          ...prevState.map(data => {
            if (data.parentMessageId === message.parentMessageId) {
              data = message
            }
            return data
          }),
        ])
      }
      if (FEED === message.customType && loggedInUserId !== channelOwnerId) {
        setFeedMessages(prevState => [
          ...prevState.map(data => {
            if (data.messageId === message.messageId) {
              data = message
            }
            return data
          }),
        ])
      }

      console.log(message, 'onMessageUpdated')
    }
  }
  chatHandler.onMessageDeleted = (targetChannel, messageId) => {
    console.log('onMessageDeleted')
    console.log('targetChannel', targetChannel)
    console.log('messageId', messageId)
    if (targetChannel.url === threadId) {
      console.log(messageId, '')

      setFeedMessages(prevState => [
        ...prevState.filter(item => item.messageId !== messageId),
      ])
    }
  }

  const postMessage = () => {
    if (text.length > 0 && senbirdChannel) {
      const params = new sendbird.UserMessageParams()
      params.message = text.trim()
      if (loggedInUserId === channelOwnerId) {
        params.customType = FEED
      } else {
        params.customType = INBOX
      }

      setText('')
      const pendingMessage = senbirdChannel.sendUserMessage(
        params,
        (message, err) => {
          if (!err) {
            setText('')
            console.log('message', message)
            if (loggedInUserId === channelOwnerId)
              setFeedMessages(prevState => [message, ...prevState])
          } else {
            console.log('Failed to send message', err)
          }
        },
      )
      console.log('Pending Message', pendingMessage)
    }
  }

  const handleEditOptionPress = () => {
    setOptionsModalVisible(false)
  }
  const updateMessage = () => {
    updateSendbirdMessage(
      threadId,
      selectedMessage.messageId,
      JSON.stringify({
        message_type: NamedConstants.MESSAGE_TYPE_FILTER.MESG,
        message: newEditMessage,
      }),
    )
      .then(response => {
        console.log(response, 'update message response')

        setFeedMessages(prevState => [
          ...prevState.map(m => {
            if (m.messageId === selectedMessage.messageId) {
              m.message = newEditMessage
            }
            return m
          }),
        ])
        setEditMessageModal(false)
        setNewEditMessage('')
      })
      .catch(err => {
        console.log('udpate message', err)
        setEditMessageModal(false)
        setNewEditMessage('')
      })
  }

  const handleDeletePress = () => {
    const { channelUrl, messageId } = selectedMessage
    if (channelUrl && messageId) {
      dispatch(
        deleteSendbirdMessageRequest(
          channelUrl,
          messageId,
          response => {
            console.log('response from sendbird API-- ', response)
            const restArray = feedMessages.filter(
              item => item.messageId !== messageId,
            )
            setFeedMessages(restArray)
          },
          error => {
            console.log('error from sendbird API-- ', error)
          },
        ),
      )
      setOptionsModalVisible(false)
    }
  }

  const handleReportThread = () => {
    setLoadingState(true)
    const formdata = new FormData()
    formdata.append('thread_id', threadId)
    reportThreadService(token, formdata)
      .then(response => {
        setLoadingState(false)
        if (response && response.code === 200) {
          Alert.alert('Thread reported successfully.', '')
        }
      })
      .catch(err => {
        console.log(err, 'Failed to report thread.')
        setLoadingState(false)
      })
  }

  const handleReportMessage = () => {
    setLoadingState(true)
    const formdata = new FormData()
    formdata.append('message_id', selectedMessage?.messageId)
    reportMessageService(token, formdata)
      .then(response => {
        setLoadingState(false)
        if (response && response.code === 200) {
          Alert.alert('Message reported successfully.', '')
        }
      })
      .catch(err => {
        console.log(err, 'Failed to report message.')
        setLoadingState(false)
      })
  }

  const pickSingleWithCamera = (mediaType = 'photo') => {
    ImagePicker.openCamera({
      mediaType,
    })
      .then(image => {
        setIsGalleryImage({ ...image, listPreview: false })
        setCameraModalIsVisible(false)
        setTimeout(() => {
          setSendImageModal(true)
        }, 500)
      })
      .catch(err => {
        console.log('error in pick image from camera', err)
        if (err?.code) {
          Alert.alert(
            'Permission Not Available',
            'Please provide permission from settings',
            [
              {
                text: 'Not now',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Go to Settings',
                onPress: () => Linking.openURL('app-settings:'),
              },
            ],
            {
              cancelable: false,
            },
          )
        }
      })
  }

  const pickSingleWithGallery = (mediaType = 'photo') => {
    ImagePicker.openPicker({
      mediaType,
    })
      .then(image => {
        setIsGalleryImage({ ...image, listPreview: false })
        setCameraModalIsVisible(false)
        setTimeout(() => {
          setSendImageModal(true)
        }, 500)
      })
      .catch(err => {
        console.log('error in pick image from gallery', err)
        if (err?.code === 'E_NO_LIBRARY_PERMISSION') {
          Alert.alert(
            'Permission Not Available',
            'Please provide permission from settings',
            [
              {
                text: 'Not now',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Go to Settings',
                onPress: () => Linking.openURL('app-settings:'),
              },
            ],
            {
              cancelable: false,
            },
          )
        }
      })
  }

  const { loading } = useSelector(state => state.CommonReducer.LoaderReducer)

  return (
    <>
      <View style={styles.mainContainer}>
        {threadName !== '' && (
          <View style={styles.threadNameView}>
            <Text numberOfLines={1} style={styles.threadNameText}>
              {threadName || 'Thread Name'}
            </Text>
          </View>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={responsiveSize(170)}
          style={styles.keyboardContentContainerStyle}
        >
          {feedMessages.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode="contain"
                source={timer}
                style={{
                  height: responsiveSize(70),
                  width: responsiveSize(60),
                }}
              />
            </View>
          ) : (
            <FlatList
              inverted
              contentContainerStyle={styles.flatListStyles}
              data={feedMessages}
              ItemSeparatorComponent={ItemSeparatorComponent}
              keyExtractor={(_, index) => `key${index}`}
              ref={flatListRef}
              renderItem={({ item }) =>
                item?.customType === APPROVED || item?.customType === REPLIED
                  ? ReplyToUser(
                      item,
                      loggedInUserId,
                      setOptionsModalVisible,
                      setSelectedMessage,
                      channelOwnerId,
                      handleSetGalleryImage,
                      openSendImageModal,
                    )
                  : RegularFeedPost(
                      item,
                      loggedInUserId,
                      setOptionsModalVisible,
                      setSelectedMessage,
                      channelOwnerId,
                      handleSetGalleryImage,
                      openSendImageModal,
                    )
              }
              showsVerticalScrollIndicator={false}
              onEndReached={() => next()}
              onEndReachedThreshold={0.2}
            />
          )}

          {loggedInUserId === channelOwnerId && (
            <View style={styles.textInputView}>
              <TextInput
                multiline
                autoComplete="off"
                autoCorrect={false}
                placeholder={
                  loggedInUserId === channelOwnerId
                    ? 'Type a message'
                    : 'Send creator a message'
                }
                placeholderTextColor={Colors.silver}
                selectionColor={Colors.white}
                style={styles.textInputStyles}
                value={text}
                onChangeText={content => {
                  setText(content)
                }}
              />
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 5, right: 10 }}
                style={[styles.arrowRightTouchStyles, { marginRight: 10 }]}
                onPress={() => {
                  Keyboard.dismiss()
                  setCameraModalIsVisible(true)
                }}
              >
                <Image resizeMode="contain" source={pin} style={styles.pin} />
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 5, right: 10 }}
                style={styles.arrowRightTouchStyles}
                onPress={() => {
                  postMessage()
                }}
              >
                <Image source={arrowRight} style={styles.arrowRight} />
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>

      <BottomSheet
        visible={isOptionsModalVisible}
        onDismiss={() => setOptionsModalVisible(false)}
      >
        <View style={styles.modalParentView}>
          <Text style={styles.optionModalHeading}>Message Selected</Text>
          {loggedInUserId === channelOwnerId &&
            selectedMessage &&
            !isImage(selectedMessage?.type) &&
            selectedMessage?.customType !== APPROVED && (
              <Pressable
                style={styles.rowView}
                onPress={() => {
                  setOption(ON_LONG_PRESS_MESG_TYPES.EDIT)
                  handleEditOptionPress()
                }}
              >
                <Text style={styles.optionsText}>Edit</Text>
                <View
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor:
                        option === ON_LONG_PRESS_MESG_TYPES.EDIT
                          ? Colors.primary
                          : 'transparent',
                    },
                  ]}
                />
              </Pressable>
            )}

          {loggedInUserId === channelOwnerId && (
            <Pressable
              style={styles.rowView}
              onPress={() => {
                setOption(ON_LONG_PRESS_MESG_TYPES.DELETE)
                handleDeletePress()
              }}
            >
              <Text style={styles.optionsText}>Delete</Text>
              <View
                style={[
                  styles.radioButton,
                  {
                    backgroundColor:
                      option === ON_LONG_PRESS_MESG_TYPES.DELETE
                        ? Colors.primary
                        : 'transparent',
                  },
                ]}
              />
            </Pressable>
          )}

          {loggedInUserId !== channelOwnerId && (
            <Pressable
              style={styles.rowView}
              onPress={() => {
                setOption(ON_LONG_PRESS_MESG_TYPES.REPORT_MESSAGE)
                setOptionsModalVisible(false)
                handleReportMessage()
              }}
            >
              <Text style={styles.optionsText}>Report Message</Text>
              <View
                style={[
                  styles.radioButton,
                  {
                    backgroundColor:
                      option === ON_LONG_PRESS_MESG_TYPES.REPORT_MESSAGE
                        ? Colors.primary
                        : 'transparent',
                  },
                ]}
              />
            </Pressable>
          )}

          {loggedInUserId !== channelOwnerId && (
            <Pressable
              style={styles.rowView}
              onPress={() => {
                setOption(ON_LONG_PRESS_MESG_TYPES.REPORT_THREAD)
                setOptionsModalVisible(false)
                handleReportThread()
              }}
            >
              <Text style={styles.optionsText}>Report Thread</Text>
              <View
                style={[
                  styles.radioButton,
                  {
                    backgroundColor:
                      option === ON_LONG_PRESS_MESG_TYPES.REPORT_THREAD
                        ? Colors.primary
                        : 'transparent',
                  },
                ]}
              />
            </Pressable>
          )}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={cameraModalIsVisible}
        onDismiss={() => setCameraModalIsVisible(false)}
      >
        <View style={styles.modalCameraParentView}>
          <View style={styles.iconsContainer}>
            <Pressable
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                pickSingleWithCamera()
              }}
            >
              <Image source={picFromCamera} style={styles.iconsView} />
              <Text style={styles.modalText}>Take a picture</Text>
            </Pressable>
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: responsiveSize(20),
              }}
              onPress={() => {
                // setCameraModalIsVisible(false)
                // setOptionsModalVisible(false)
                pickSingleWithGallery()
              }}
            >
              <Image source={picFromGallery} style={styles.iconsView} />
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>

      <Modal
        transparent
        animationType="slide"
        visible={editMessageModal}
        onRequestClose={() => setEditMessageModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={-((height - responsiveSize(280)) / 2) + 70}
        >
          <Pressable
            style={styles.transparentPressable}
            onPress={() => {
              Keyboard.dismiss()
              setEditMessageModal(false)
            }}
          />
          <View style={styles.announcementContentView}>
            <Pressable
              onPress={() => {
                Keyboard.dismiss()
                setEditMessageModal(false)
                // setPostText('')
                if (option) setOption('')
              }}
            >
              <Image source={arrowLeft} style={styles.backIcon} />
            </Pressable>

            <Input
              multiline
              containerStyle={{
                height: responsiveSize(150),
                marginTop: responsiveSize(20),
              }}
              maxLength={500}
              returnKeyType="default"
              value={newEditMessage}
              onChangeText={data => {
                setNewEditMessage(data)
              }}
            />
            <Pressable
              disabled={loading}
              style={styles.postButton}
              onPress={_.debounce(updateMessage, 2000, {
                leading: true,
                trailing: false,
              })}
            >
              <Text style={styles.postText}>Update message</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        transparent
        animationType="none"
        visible={sendImageModal}
        onRequestClose={() => {
          setSendImageModal(false)
          setIsGalleryImage(null)
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.sendImgModalContainer}>
            <Header
              hasBackButton
              title={isGalleryImage?.listPreview ? ' ' : 'Image Preview'}
              onPress={() => {
                setSendImageModal(false)
                setIsGalleryImage(null)
              }}
            />
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: isGalleryImage?.sourceURL ?? isGalleryImage?.path,
                }}
                style={styles.selectedImageStyles}
              />
            </View>
            {!isGalleryImage?.listPreview && (
              <Pressable
                style={styles.sendImagePressableStyles}
                onPress={() => {
                  setSendImageModal(false)
                  const params = new sendbird.FileMessageParams()
                  params.file = {
                    uri: isGalleryImage.path,
                    type: isGalleryImage.mime,
                    name:
                      Platform.OS === 'ios'
                        ? isGalleryImage?.filename || 'image.jpg'
                        : Math.random().toString(36).slice(-5),
                  }
                  params.threadId = threadId
                  if (loggedInUserId === channelOwnerId) {
                    params.customType = FEED
                  } else {
                    params.customType = INBOX
                  }

                  if (senbirdChannel) {
                    senbirdChannel.sendFileMessage(params, (message, err) => {
                      if (err !== null) {
                        console.log(err, 'error while uploading image ')
                      } else if (loggedInUserId === channelOwnerId) {
                        setFeedMessages(prevState => [message, ...prevState])
                      }
                    })
                  }
                }}
              >
                <Image source={arrowRight} style={styles.arrowRightImgStyles} />
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  )
}
