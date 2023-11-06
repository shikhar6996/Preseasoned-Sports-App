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
  Pressable,
  Alert,
  AppState,
  Modal,
  SafeAreaView,
  Linking,
} from 'react-native'

import moment from 'moment'

import Hyperlink from 'react-native-hyperlink'
import { useDispatch, useSelector } from 'react-redux'

import { arrowRight, timer } from '@/Assets/Images'
import { BottomSheet, Header } from '@/Components'
import { NamedConstants } from '@/Constants'
import {
  getUnreadSendbirdMessage,
  markReadSendbirdMessage,
  updateSendbirdMessage,
} from '@/Services/modules/chat'
import { blockUserService } from '@/Services/modules/user/blockUser'
import { reportMessageService } from '@/Services/modules/user/reportMessage'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import {
  Colors,
  Fonts,
  getDateDifferenceInDesiredFormat,
  isImage,
  responsiveSize,
  sendbird,
} from '@/Utils'

import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {
  SENDBIRD_CHAT_CUSTOM_TYPES: {
    FEED,
    APPROVED,
    REPLIED,
    INBOX,
    DELETE,
    REJECTED,
  },
  MESSAGE_TYPE_FILTER: { MESG, FILE },
} = NamedConstants

const ItemSeparatorComponent = () => (
  <View style={styles.itemSeparatorComponent} />
)

const RenderMessages = (
  item,
  inboxMessageHandler,
  toggleOptionModal,
  handleSelectedMessage,
  imagePressed,
) => {
  const { _sender, message, createdAt, type } = item
  return (
    <View style={styles.parentContainer}>
      <Pressable
        style={styles.Container}
        onLongPress={() => {
          handleSelectedMessage(item)
          toggleOptionModal(true)
        }}
      >
        <View style={styles.repliedView}>
          <Text style={styles.currentUserTitle}>{_sender.nickname} asked</Text>

          {isImage(type) ? (
            <Pressable
              onLongPress={() => {
                handleSelectedMessage(item)
                toggleOptionModal(true)
              }}
              onPress={() => {
                imagePressed(item?.url)
              }}
            >
              <Image
                resizeMode="cover"
                source={{ uri: item?.url }}
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
              <Text style={styles.textMessage}>{message}</Text>
            </Hyperlink>
          )}
        </View>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.optionButton}
            onPress={() => inboxMessageHandler(REPLIED, item)}
          >
            <Text style={styles.buttonText}>Reply</Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => inboxMessageHandler(APPROVED, item)}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </Pressable>
          <Pressable
            style={styles.optionButton}
            onPress={() => inboxMessageHandler(REJECTED, item)}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </Pressable>
        </View>
        <Text style={styles.noteMessage}>
          Once you reply or approve to this message it will appear in the main
          thread
        </Text>
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

export const Inbox = props => {
  const {
    loggedInUserId,
    threadId,
    channelOwnerId,
    threadName,
    loggedInUserName,
    handleNumIncomingMsg,
  } = props

  console.log(loggedInUserId, 'loggedInUserId from inbox')
  console.log(channelOwnerId, 'channelOwnerId from inbox')

  const [text, setText] = useState('')
  const [query, setQuery] = useState()
  const [senbirdChannel, setSendbirdChannel] = useState(null)
  const [inboxMessageList, setInboxMessageList] = useState([])
  const [selectedMsgToReply, setSelectedMsgToReply] = useState(null)
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [imagePreviewModal, setImagePreviewModal] = useState(false)
  const [galleryImage, setGalleryImage] = useState(null)

  const [isInboxPopup, setIsInboxPopup] = useState(false)
  const user = useSelector(state => state.UserReducer)

  const imagePressed = data => {
    setGalleryImage(data)
    setImagePreviewModal(true)
  }
  // const flatListRef = useRef(null)
  const inputRef = useRef(null)
  const connectionHandler = new sendbird.ConnectionHandler()
  const channelHandler = new sendbird.ChannelHandler()
  const chatHandler = new sendbird.ChannelHandler()

  const userData = useSelector(state => state.UserReducer.userData)
  const { token } = userData?.user_profile || {}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const inboxPopup = await AsyncStorage.getItem('@INBOX_ALERT')
    if (!inboxPopup && channelOwnerId === loggedInUserId) {
      Alert.alert('You can block a user on long press of a message')
      await AsyncStorage.setItem('@INBOX_ALERT', 'true')
    }
  }, [])

  useEffect(() => {
    markReadSendbirdMessage(threadId, userData?.user_profile?.id)
      .then(response => {
        handleNumIncomingMsg(0)
        console.log(response, 'markReadSendbirdMessage response')
      })
      .catch(err => {
        console.log('udpate message', err)
      })
  }, [])

  const next = () => {
    console.log('INBOX queryquery', query)
    if (query.hasMore) {
      query.limit = 10
      query.reverse = true
      query.customTypesFilter = [INBOX]
      query.load((fetchedMessages, err) => {
        if (!err) {
          console.log(fetchedMessages)
          setInboxMessageList(prevState => [...prevState, ...fetchedMessages])
          setLoadingState(false)
        } else {
          setLoadingState(false)
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

    if (!sendbird.currentUser) {
      sendbird.connect(loggedInUserId, (user, err) => {
        if (!err) {
          if (user.userId !== loggedInUserId) {
            sendbird.updateCurrentUserInfo(loggedInUserName, '', (_, error) => {
              if (!error) {
                getChannel()
              }
            })
          }
          getChannel()
        } else {
          console.log('')
        }
      })
    } else {
      getChannel()
    }
    return () => {
      sendbird.removeConnectionHandler('channels')
      sendbird.removeChannelHandler('channels')
      sendbird.removeChannelHandler('chat')
      unsubscribe.remove()
    }
  }, [])

  useEffect(() => {
    if (senbirdChannel) {
      console.log(senbirdChannel, 'senbirdChannel--------')
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
    if (targetChannel.url === threadId && message.messageId) {
      if (message.customType === INBOX && loggedInUserId === channelOwnerId)
        setInboxMessageList(prevState => [message, ...prevState])
    }
  }
  chatHandler.onMessageUpdated = (targetChannel, message) => {
    if (targetChannel.url === threadId) {
      if (message.customType === INBOX && loggedInUserId === channelOwnerId)
        setInboxMessageList(prevState => [
          ...prevState.map(data => {
            if (data.messageId === message.messageId) {
              data = message
            }
            return data
          }),
        ])

      console.log(message)
    }
  }
  chatHandler.onMessageDeleted = (targetChannel, messageId) => {
    if (targetChannel.url === threadId) {
      setInboxMessageList(prevState => [
        ...prevState.filter(item => item.messageId !== messageId),
      ])

      console.log(messageId, 'onMessageDeleted')
    }
  }
  const replyToUserHandler = () => {
    if (text.length > 0 && senbirdChannel && selectedMsgToReply) {
      const params = new sendbird.UserMessageParams()
      params.message = text.trim()
      params.customType = REPLIED
      params.parentMessageId = selectedMsgToReply.messageId
      params.data = JSON.stringify({
        user_id: selectedMsgToReply._sender.userId,
        parent_message_id: selectedMsgToReply.messageId,
      })
      const messageType = isImage(selectedMsgToReply?.type) ? FILE : MESG
      console.log('Reply Params -->', params)

      setText('')
      const pendingMessage = senbirdChannel.sendUserMessage(
        params,
        (message, err) => {
          if (!err) {
            setText('')
            console.log('message from reply to user handler', message)
            updateSendbirdMessage(
              threadId,
              selectedMsgToReply.messageId,
              JSON.stringify({
                custom_type: DELETE,
                message_type: messageType,
              }),
            )
              .then(response => {
                console.log(response, 'update message response')
                setInboxMessageList(prevState => [
                  ...prevState.filter(
                    m => m.messageId !== selectedMsgToReply.messageId,
                  ),
                ])
                // if (senbirdChannel) getPreviousMessagesInChannel()
              })
              .catch(error => console.log('udpate message', error))
            setSelectedMsgToReply(null)
          } else {
            console.log('Failed to send message', err)
            Alert.alert('Failed to reply ')
          }
        },
      )
      console.log('Pending Message', pendingMessage)
    }
  }

  const approveMessageHandler = message => {
    if (senbirdChannel) {
      const { messageId, _sender } = message

      const messageType = isImage(message?.type) ? FILE : MESG

      updateSendbirdMessage(
        threadId,
        messageId,
        JSON.stringify({
          custom_type: APPROVED,
          message_type: messageType,
          data: _sender.userId,
        }),
      )
        .then(response => {
          console.log(response, 'update message response')
          setInboxMessageList(prevState => [
            ...prevState.filter(m => m.messageId !== messageId),
          ])
          // if (senbirdChannel) getPreviousMessagesInChannel()
        })
        .catch(err => console.log('udpate message', err))
    }
  }
  const rejectMessageHandler = message => {
    if (senbirdChannel) {
      setLoadingState(true)
      const { messageId } = message
      const messageType = isImage(message?.type) ? FILE : MESG
      updateSendbirdMessage(
        threadId,
        messageId,
        JSON.stringify({ custom_type: REJECTED, message_type: messageType }),
      )
        .then(response => {
          console.log(response, 'update message response')
          setInboxMessageList(prevState => [
            ...prevState.filter(m => m.messageId !== messageId),
          ])
          // if (senbirdChannel) getPreviousMessagesInChannel()
        })
        .catch(err => console.log('udpate message', err))
    }
  }

  console.log('inbox -->', inboxMessageList)

  const postMessage = () => {
    if (text.length > 0 && senbirdChannel) {
      const params = new sendbird.UserMessageParams()
      params.message = text.trim()
      params.customType = FEED

      setText('')
      const pendingMessage = senbirdChannel.sendUserMessage(
        params,
        (message, err) => {
          if (!err) {
            setText('')
            console.log('message', message)
          } else {
            console.log('Failed to send message', err)
          }
        },
      )
      console.log('Pending Message', pendingMessage)
    }
  }

  const inboxMessageHandler = (type, message) => {
    switch (type) {
      case REPLIED: {
        if (inputRef.current) {
          inputRef.current?.focus()
          setSelectedMsgToReply(message)
        }
        break
      }
      case APPROVED: {
        approveMessageHandler(message)
        break
      }
      case REJECTED: {
        rejectMessageHandler(message)
        break
      }
      default:
        break
    }
  }

  const toggleOptionModal = () => {
    setOptionsModalVisible(true)
  }

  const handleSelectedMessage = data => {
    setSelectedMessage(data)
  }

  const handleBlockUser = () => {
    setLoadingState(true)
    const formdata = new FormData()
    formdata.append('blocked_to', selectedMessage?._sender?.userId)
    formdata.append('thread_id', threadId)
    blockUserService(token, formdata)
      .then(response => {
        setLoadingState(false)
        if (response && response.code === 200) {
          Alert.alert(
            `${selectedMessage?._sender?.nickname} blocked successfully.`,
            '',
          )
        }
      })
      .catch(err => {
        console.log(err, 'Failed to block user.')
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
          {inboxMessageList.length === 0 ? (
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
              data={inboxMessageList}
              ItemSeparatorComponent={ItemSeparatorComponent}
              keyExtractor={item => `key${item.messageId}`}
              renderItem={({ item }) =>
                RenderMessages(
                  item,
                  inboxMessageHandler,
                  toggleOptionModal,
                  handleSelectedMessage,
                  imagePressed,
                )
              }
              showsVerticalScrollIndicator={false}
              onEndReached={() => next()}
              onEndReachedThreshold={0.2}
            />
          )}

          <View style={styles.textInputView}>
            <TextInput
              multiline
              autoComplete="off"
              autoCorrect={false}
              placeholder={
                inboxMessageList.length === 0 || !selectedMsgToReply
                  ? 'Type a message'
                  : 'Reply to your messages here'
              }
              placeholderTextColor={Colors.silver}
              ref={inputRef}
              selectionColor={Colors.white}
              style={styles.textInputStyles}
              value={text}
              onChangeText={value => {
                setText(value)
              }}
            />
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 5, right: 10 }}
              style={styles.arrowRightTouchStyles}
              onPress={() => {
                if (inboxMessageList.length && selectedMsgToReply)
                  replyToUserHandler()
                else postMessage()
              }}
            >
              <Image source={arrowRight} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <BottomSheet
          visible={isOptionsModalVisible}
          onDismiss={() => setOptionsModalVisible(false)}
        >
          <View style={styles.modalParentView}>
            <Text style={styles.optionModalHeading}>Message Selected</Text>
            {selectedMessage && selectedMessage?.customType !== APPROVED && (
              <Pressable
                style={styles.rowView}
                onPress={() => {
                  setOptionsModalVisible(false)
                  handleReportMessage()
                }}
              >
                <Text style={styles.optionsText}>Report Message</Text>
                <View
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor: 'transparent',
                    },
                  ]}
                />
              </Pressable>
            )}

            <Pressable
              style={styles.rowView}
              onPress={() => {
                setOptionsModalVisible(false)
                handleBlockUser()
              }}
            >
              <Text style={styles.optionsText}>
                Block @{selectedMessage?._sender?.nickname}
              </Text>
              <View
                style={[
                  styles.radioButton,
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
              />
            </Pressable>
          </View>
        </BottomSheet>
      </View>
      <Modal
        transparent
        animationType="none"
        visible={imagePreviewModal}
        onRequestClose={() => {
          setImagePreviewModal(false)
          setGalleryImage(null)
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.sendImgModalContainer}>
            <Header
              hasBackButton
              title="Image Preview"
              onPress={() => {
                setImagePreviewModal(false)
                setGalleryImage(null)
              }}
            />
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri: galleryImage,
                }}
                style={styles.selectedImageStyles}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  )
}
