/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'

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
  Modal,
  Keyboard,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native'

import _ from 'lodash'
import moment from 'moment'

import Hyperlink from 'react-native-hyperlink'
import ImagePicker from 'react-native-image-crop-picker'
import { useDispatch, useSelector } from 'react-redux'

import {
  arrowLeft,
  arrowRight,
  picFromCamera,
  picFromGallery,
  pin,
  tickGreen,
  timer,
  Wallet,
} from '@/Assets/Images'
import { BottomSheet, Header, Input } from '@/Components'
import { NamedConstants } from '@/Constants'

import { updateSendbirdMessage } from '@/Services/modules/chat'
import { deleteSendbirdMessageRequest } from '@/Store/Reducers/Chat'
import {
  Colors,
  Fonts,
  getDateDifferenceInDesiredFormat,
  height,
  isImage,
  respFontSize,
  responsiveSize,
  sendbird,
} from '@/Utils'

import { styles } from './styles'
import { getUserBlockStatus } from '@/Services/modules/channel/checkUserBlockStatus'
import { goBack } from '@/Navigators/utils'

const {
  SENDBIRD_CHAT_CUSTOM_TYPES: { INBOX, REJECTED, DELETE, APPROVED, FEED },
  ON_LONG_PRESS_MESG_TYPES,
} = NamedConstants

const ItemSeparatorComponent = () => (
  <View style={styles.itemSeparatorComponent} />
)
const RenderMessages = (
  item,
  handleSelectedMessage,
  toggleOptionModal,
  openSendImageModal,
  handleSetGalleryImage,
) => (
  <View style={styles.parentContainer}>
    <Pressable
      style={styles.Container}
      onLongPress={() => {
        handleSelectedMessage(item)
        toggleOptionModal(true)
      }}
    >
      {!item?.parentMessage && (
        <>
          {[APPROVED, DELETE].includes(item.customType) && (
            <Text
              style={{
                marginBottom: responsiveSize(10),
              }}
            >
              <Image
                resizeMode="contain"
                source={tickGreen}
                style={{
                  width: responsiveSize(15),
                  height: responsiveSize(15),
                }}
              />
              <Text style={styles.noteMessage}>
                {item.customType === APPROVED
                  ? ` The creator posted your message`
                  : ` Creator replied to your message`}
              </Text>
            </Text>
          )}
          <View style={styles.repliedView}>
            <Text style={styles.currentUserTitle}>You asked</Text>
            {isImage(item?.type) ? (
              <Pressable
                onLongPress={() => {
                  handleSelectedMessage(item)
                  toggleOptionModal(true)
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
                  styles.textMessage,
                  { color: '#2980b9', fontFamily: Fonts.GilroyBold },
                ]}
                onPress={(url, text) => {
                  Linking.openURL(url)
                }}
              >
                <Text style={styles.textMessage}>{item?.message}</Text>
              </Hyperlink>
            )}
          </View>
        </>
      )}
      {![APPROVED, DELETE].includes(item.customType) && (
        <Text
          style={{
            fontFamily: Fonts.Gilroy,
            color: Colors.silver,
            lineHeight: responsiveSize(20),
            fontSize: respFontSize(12),
            marginTop: responsiveSize(5),
          }}
        >
          Your message will appear in the thread if creator replies to it.
        </Text>
      )}

      <View style={styles.dateView}>
        <Text style={styles.dateText}>
          {getDateDifferenceInDesiredFormat(
            moment.utc(item.createdAt).format(),
          )}
        </Text>
      </View>
    </Pressable>
    <View style={styles.rightTriangle} />
  </View>
)
export const YourMessages = props => {
  const {
    loggedInUserId,
    threadId,
    channelOwnerId,
    threadName,
    loggedInUserName,
  } = props

  const [text, setText] = useState('')
  const [query, setQuery] = useState()
  const [senbirdChannel, setSendbirdChannel] = useState(null)
  const [inboxMessageList, setInboxMessageList] = useState([])
  const [sendImageModal, setSendImageModal] = useState(false)
  const [isGalleryImage, setIsGalleryImage] = useState(null)

  const userData = useSelector(state => state.UserReducer.userData)
  const { token } = userData?.user_profile || {}

  // const flatListRef = useRef(null)
  const connectionHandler = new sendbird.ConnectionHandler()
  const channelHandler = new sendbird.ChannelHandler()
  const chatHandler = new sendbird.ChannelHandler()

  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false)
  const [option, setOption] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [editMessageModal, setEditMessageModal] = useState(false)
  const [newEditMessage, setNewEditMessage] = useState('')
  const [cameraModalIsVisible, setCameraModalIsVisible] = useState(false)
  const { loading } = useSelector(state => state.CommonReducer.LoaderReducer)
  const dispatch = useDispatch()

  const handleSetGalleryImage = data => {
    setIsGalleryImage(data)
  }
  const openSendImageModal = () => {
    setSendImageModal(true)
  }

  const next = () => {
    if (query.hasMore) {
      query.limit = 10
      query.reverse = true
      query.customTypesFilter = [INBOX, REJECTED, DELETE, APPROVED]
      query.senderUserIdsFilter = [loggedInUserId]
      query.load((fetchedMessages, err) => {
        if (!err) {
          setInboxMessageList(prevState => [...prevState, ...fetchedMessages])
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
        } else {
          console.log('')
        }
      })
    } else {
      getChannel()
    }
    console.log('inbox-->', inboxMessageList)

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
      console.log('message --->', message)
    }
  }
  chatHandler.onMessageUpdated = (targetChannel, message) => {
    if (targetChannel.url === threadId) {
      setInboxMessageList(prevState => [
        ...prevState.map(m => {
          if (m.messageId === message.messageId) {
            return message
          }
          return m
        }),
      ])
      /*  if ([DELETE, APPROVED].includes(message.customType)) {
        setInboxMessageList(prevState => [
          ...prevState.filter(m => m.messageId !== message.messageId),
        ])
      } */
    }
  }

  chatHandler.onMessageDeleted = (targetChannel, messageId) => {
    if (targetChannel.url === threadId) {
      console.log(messageId)
    }
  }

  const checkUserBlockStatus = () => {
    getUserBlockStatus(token, threadId)
      .then(response => {
        console.log(response.code, '======block status====')
        if (response && response.code === 200) {
          if (!response?.response?.status) {
            postMessage()
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
      })
  }

  const postMessage = () => {
    if (text.length > 0 && senbirdChannel) {
      const params = new sendbird.UserMessageParams()
      params.message = text.trim()
      params.customType = INBOX

      setText('')

      const pendingMessage = senbirdChannel.sendUserMessage(
        params,
        (message, err) => {
          if (!err) {
            setText('')
            console.log('message', message)
            setInboxMessageList(prevState => [message, ...prevState])
          } else {
            console.log('Failed to send message', err)
          }
        },
      )
      console.log('Pending Message', pendingMessage)
    }
  }
  console.log('inbox -->', inboxMessageList)

  const handleSelectedMessage = data => {
    setSelectedMessage(data)
  }
  const toggleOptionModal = () => {
    setOptionsModalVisible(true)
  }
  useEffect(() => {
    if (!isOptionsModalVisible) {
      setOption('')
      setNewEditMessage('')
    }
  }, [isOptionsModalVisible])

  useEffect(() => {
    if (option === ON_LONG_PRESS_MESG_TYPES.EDIT) {
      setEditMessageModal(true)
      setNewEditMessage(selectedMessage.message)
    }
  }, [option])

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

        setInboxMessageList(prevState => [
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
            const restArray = inboxMessageList.filter(
              item => item.messageId !== messageId,
            )
            setInboxMessageList(restArray)
          },
          error => {
            console.log('error from sendbird API-- ', error)
          },
        ),
      )
      setOptionsModalVisible(false)
    }
  }

  const pickSingleWithCamera = (mediaType = 'photo') => {
    ImagePicker.openCamera({
      mediaType,
    })
      .then(image => {
        console.log('image=>' + JSON.stringify(image))
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
        console.log('image=>' + JSON.stringify(image))
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
              keyExtractor={(_, index) => `key${index}`}
              renderItem={({ item }) =>
                RenderMessages(
                  item,
                  handleSelectedMessage,
                  toggleOptionModal,
                  openSendImageModal,
                  handleSetGalleryImage,
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
              placeholder="Send creator a message"
              placeholderTextColor={Colors.silver}
              selectionColor={Colors.white}
              style={styles.textInputStyles}
              value={text}
              onChangeText={value => {
                setText(value)
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
                // checkUserBlockStatus()
                postMessage()
              }}
            >
              <Image source={arrowRight} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      <BottomSheet
        visible={isOptionsModalVisible}
        onDismiss={() => setOptionsModalVisible(false)}
      >
        <View style={styles.modalParentView}>
          <Text style={styles.optionModalHeading}>Message Selected</Text>
          {selectedMessage &&
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

                  console.log('params=>' + JSON.stringify(params))
                  if (senbirdChannel) {
                    senbirdChannel.sendFileMessage(params, (message, err) => {
                      if (err !== null) {
                        console.log(err, 'error while uploading image ')
                      } else {
                        setInboxMessageList(prevState => [
                          message,
                          ...prevState,
                        ])
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
