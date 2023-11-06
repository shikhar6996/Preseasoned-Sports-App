/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  FlatList,
  Alert,
} from 'react-native'

import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { arrowLeft, pinIcon } from '@/Assets/Images'
import { BottomSheet, Input } from '@/Components'
import { NamedConstants } from '@/Constants'
import {
  createAnnouncementRequest,
  createAnnouncementStatusRequest,
  deleteAnnouncementRequest,
  getAnnouncementsList,
  updateAnnouncementRequest,
} from '@/Store/Reducers/Chat'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import {
  Colors,
  getDateDifferenceInDesiredFormat,
  height,
  responsiveSize,
} from '@/Utils'

import { styles } from './styles'

const { ANNOUNCEMENT_LIST_OPTIONS, ANNOUNCEMENT_STATUS_TYPE } = NamedConstants

const ItemSeparator = () => <View style={styles.itemSeparatorComponent} />

const Item = ({ item, userId, id, handleLongPress }) => {
  const [showMoreButton, setShowMoreButton] = useState(false)
  const [textShown, setTextShown] = useState(false)
  const [numLines, setNumLines] = useState(undefined)

  const toggleTextShown = () => {
    setTextShown(!textShown)
  }

  useEffect(() => {
    setNumLines(textShown ? undefined : Platform.OS === 'android' ? 5 : 6)
  }, [textShown])

  const onTextLayout = e => {
    if (e.nativeEvent.lines.length > 5 && !textShown) {
      setShowMoreButton(true)
      if (Platform.OS === 'android') {
        setNumLines(5)
      }
    } else if (e.nativeEvent.lines.length <= 5) {
      setShowMoreButton(false)
    }
  }

  return (
    <Pressable
      disabled={userId !== id}
      style={styles.mainContainerView}
      onLongPress={handleLongPress}
    >
      <View style={styles.leftTriangleStyles} />
      <View style={[styles.contentView, { flexDirection: 'column' }]}>
        <View style={styles.contentView}>
          <View style={styles.userImgView}>
            <Image
              source={{ uri: item.profile_image }}
              style={styles.imageStyles}
            />
          </View>
          <View style={styles.announcementView}>
            <Text
              numberOfLines={numLines}
              style={styles.announcementMessage}
              onTextLayout={onTextLayout}
            >
              {item?.text}
            </Text>
          </View>
          {item.status === ANNOUNCEMENT_STATUS_TYPE.PI && (
            <Image source={pinIcon} style={styles.pinImgStyles} />
          )}
        </View>
        <View style={{ marginHorizontal: responsiveSize(20) }}>
          {showMoreButton ? (
            <Text style={styles.keepReadingText} onPress={toggleTextShown}>
              {!textShown ? 'Keep Reading' : 'Read Less'}
            </Text>
          ) : null}
          <View style={styles.dateView}>
            <Text style={styles.dateText}>
              {getDateDifferenceInDesiredFormat(item.created)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const CommunityTab = props => {
  const loggedInUserId = userData?.user_profile?.id
  const isChannelOwner = loggedInUserId === channelOwnerId

  const { channelOwnerId, changeActiveTab } = props
  const { channelId, id } = props

  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false)
  const [option, setOption] = useState('')
  const [announcementList, setAnnouncementList] = useState({})
  const [activeAnnouncement, setActiveAnnouncement] = useState(undefined)
  const [postText, setPostText] = useState('')
  const [announcementLoaded, setAnnouncementLoaded] = useState('pending')

  const { loading } = useSelector(state => state.CommonReducer.LoaderReducer)
  const userData = useSelector(state => state.UserReducer.userData)
  const userId = userData?.user_profile?.id
  const profileImage = userData?.user_profile?.profile_image
  const token = useSelector(state => state.UserReducer.userData.token) || ''

  const getInitialAnnouncementList = () => {
    if (channelId)
      dispatch(
        getAnnouncementsList(
          channelId,
          5,
          1,
          response => {
            dispatch(setLoadingState(false))
            setAnnouncementLoaded('resolved')
            if (response && response?.code === 200) {
              setAnnouncementList(response)
            } else {
              // Alert.alert(announcementData.message)
            }
          },
          error => {
            console.log('Error in Api ', error)
            dispatch(setLoadingState(false))
            Alert.alert('Failed to create announcement')
          },
        ),
      )
  }

  useEffect(() => {
    // dispatch(setLoadingState(true))
    getInitialAnnouncementList()
  }, [])

  const createAnnouncement = () => {
    dispatch(setLoadingState(true))
    const formdata = new FormData()

    if (postText && channelId) {
      formdata.append('text', postText)
      formdata.append('channel_id', channelId)
    } else {
      return
    }

    dispatch(
      createAnnouncementRequest(
        formdata,
        response => {
          dispatch(setLoadingState(false))
          setIsModalVisible(false)
          if (response && response.code === 200) {
            setPostText('')
            getInitialAnnouncementList()
          }
          dispatch(setLoadingState(false))
        },
        error => {
          dispatch(setLoadingState(false))
          setIsModalVisible(false)
          console.log('Error in Api ', error)
          Alert.alert('Failed to create announcement')
        },
      ),
    )
  }

  const getPaginationData = async () => {
    if (announcementList?.next !== null && announcementList.results) {
      // dispatch(setLoadingState(true))

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
        redirect: 'follow',
      }
      fetch(announcementList?.next, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setAnnouncementList({
            ...result,
            results: [
              ...(announcementList && announcementList.results),
              ...result.results,
            ],
          })
        })

        .catch(error => console.log('Error in getting new page', error))
        .finally(() => dispatch(setLoadingState(false)))
    }
  }

  const updateAnnouncement = () => {
    dispatch(setLoadingState(true))

    const formdata = new FormData()

    formdata.append('text', activeAnnouncement.text)
    formdata.append('announcement_id', activeAnnouncement.id)

    dispatch(
      updateAnnouncementRequest(
        formdata,
        () => {
          getInitialAnnouncementList()
          dispatch(setLoadingState(false))
          setIsModalVisible(false)
        },
        error => {
          dispatch(setLoadingState(false))
          setIsModalVisible(false)
          console.log('Error in update announcement ', error || '')
        },
      ),
    )
  }

  const postPress = () => {
    if (option === ANNOUNCEMENT_LIST_OPTIONS.EDIT) {
      if (!postText.length) {
        Alert.alert('Text required')
        return
      }
      if (
        activeAnnouncement &&
        activeAnnouncement.oldText !== activeAnnouncement.text
      ) {
        updateAnnouncement()
      }
      setOption('')
      setActiveAnnouncement(undefined)
    } else {
      if (!postText.length) {
        Alert.alert('Text required')
        return
      }
      createAnnouncement()
    }
  }

  const handlePinOptionPress = () => {
    if (!activeAnnouncement) return
    setOptionsModalVisible(false)
    // dispatch(setLoadingState(true))
    const formdata = new FormData()

    formdata.append(
      'type',
      activeAnnouncement.status === ANNOUNCEMENT_STATUS_TYPE.PI
        ? ANNOUNCEMENT_STATUS_TYPE.UNPIN
        : ANNOUNCEMENT_STATUS_TYPE.PI,
    )
    formdata.append('announcement_id', activeAnnouncement.id)

    dispatch(
      createAnnouncementStatusRequest(
        formdata,
        response => {
          dispatch(setLoadingState(false))
          if (response && response.code === 200) {
            getInitialAnnouncementList()
          }
          dispatch(setLoadingState(false))
          setOption('')
        },
        error => {
          dispatch(setLoadingState(false))
          setOption('')
          console.log('Error in Api ', error)
          Alert.alert('Failed to Pin announcement')
        },
      ),
    )
    setActiveAnnouncement(undefined)
  }

  const handleDeletePress = () => {
    if (!activeAnnouncement) return
    setOptionsModalVisible(false)
    dispatch(setLoadingState(true))

    const successCallback = response => {
      dispatch(setLoadingState(false))
      if (response && response.code === 200) {
        if (
          activeAnnouncement &&
          announcementList.results &&
          announcementList.results.length === 1
        ) {
          setAnnouncementList({})
        }
        getInitialAnnouncementList()
      }
      dispatch(setLoadingState(false))
      setOption('')
    }

    const failureCallback = error => {
      dispatch(setLoadingState(false))
      setOption('')
      console.log('Error in Api ', error)
      Alert.alert('Failed to delete announcement')
    }

    dispatch(
      deleteAnnouncementRequest(
        activeAnnouncement.id,
        successCallback,
        failureCallback,
      ),
    )

    setActiveAnnouncement(undefined)
  }

  const handleLongPress = useCallback(item => {
    setActiveAnnouncement({ ...item, oldText: item.text })
    setOptionsModalVisible(true)
  }, [])

  const renderItem = ({ item }) => (
    <Item
      handleLongPress={() => handleLongPress(item)}
      id={id}
      item={item}
      profileImage={profileImage}
      userId={userId}
    />
  )

  const handleEditOptionPress = () => {
    setOption(ANNOUNCEMENT_LIST_OPTIONS.EDIT)
    setOptionsModalVisible(false)
    setTimeout(() => {
      setIsModalVisible(true)
    }, 500)
  }

  const channelHasAnnouncements =
    announcementLoaded !== 'pending' &&
    !_.isEmpty(announcementList) &&
    announcementList.results &&
    Array.isArray(announcementList.results) &&
    announcementList.results.length

  return (
    <View style={[styles.mainView, { marginTop: responsiveSize(20) }]}>
      {announcementLoaded !== 'pending' &&
        !channelHasAnnouncements &&
        (userId !== id ? (
          <View style={styles.welcomeMessageView}>
            <Text style={styles.welcomeMessage}>
              This channel does not have any new announcements yet
            </Text>
          </View>
        ) : (
          <View style={styles.welcomeMessageView}>
            <Text style={styles.welcomeMessage}>
              You haven't posted a message for your community yet. Use this
              space to post generic content for your followers, such as the
              games you may be covering or your availability during match days.
            </Text>
          </View>
        ))}

      <View style={styles.flatListView}>
        <FlatList
          data={announcementList && announcementList.results}
          extraData={announcementList && announcementList.results}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item, index) => item.id || `key_${index.toString()}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyles}
          onEndReached={getPaginationData}
          onEndReachedThreshold={0.1}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: responsiveSize(10),
        }}
      >
        {userId === id && (
          <Pressable
            style={styles.postAnnouncememtBtn}
            onPress={() => {
              setIsModalVisible(true)
            }}
          >
            <Text style={styles.postAnnouncememtText}>
              Post an Announcement
            </Text>
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
          keyboardVerticalOffset={-((height - responsiveSize(280)) / 2) + 70}
        >
          <Pressable
            style={styles.transparentPressable}
            onPress={() => {
              Keyboard.dismiss()
              setIsModalVisible(false)
            }}
          />
          <View style={styles.announcementContentView}>
            <Pressable
              onPress={() => {
                Keyboard.dismiss()
                setIsModalVisible(false)
                setPostText('')
                if (option) setOption('')
              }}
            >
              <Image source={arrowLeft} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.threadName}>Type your announcement</Text>
            <Input
              multiline
              containerStyle={{
                height: responsiveSize(150),
                marginTop: responsiveSize(20),
              }}
              maxLength={400}
              returnKeyType="default"
              value={
                activeAnnouncement && option === ANNOUNCEMENT_LIST_OPTIONS.EDIT
                  ? activeAnnouncement.text
                  : postText
              }
              onChangeText={text => {
                if (activeAnnouncement) {
                  setActiveAnnouncement(state => ({ ...state, text }))
                } else {
                  setPostText(text)
                }
              }}
            />
            <Pressable
              disabled={loading}
              style={styles.postButton}
              onPress={_.debounce(postPress, 2000, {
                leading: true,
                trailing: false,
              })}
            >
              <Text style={styles.postText}>
                {option === ANNOUNCEMENT_LIST_OPTIONS.EDIT
                  ? 'Save your changes'
                  : 'Post'}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <BottomSheet
        visible={isOptionsModalVisible}
        onDismiss={() => setOptionsModalVisible(false)}
      >
        <View style={styles.modalParentView}>
          <Text style={styles.optionModalHeading}>Thread Selected</Text>
          <Pressable style={styles.rowView} onPress={handleEditOptionPress}>
            <Text style={styles.optionsText}>Edit</Text>
            <View
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    option === 'Edit' ? Colors.primary : 'transparent',
                },
              ]}
            />
          </Pressable>
          <Pressable
            style={styles.rowView}
            onPress={() => {
              setOption(ANNOUNCEMENT_LIST_OPTIONS.PIN_TO_FEED)
              handlePinOptionPress()
            }}
          >
            <Text style={styles.optionsText}>
              {activeAnnouncement &&
              activeAnnouncement.status === ANNOUNCEMENT_STATUS_TYPE.PI
                ? 'Unpin from Feed'
                : 'Pin to Feed'}
            </Text>
            <View
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    option === ANNOUNCEMENT_LIST_OPTIONS.PIN_TO_FEED
                      ? Colors.primary
                      : 'transparent',
                },
              ]}
            />
          </Pressable>
          <Pressable
            style={styles.rowView}
            onPress={() => {
              setOption(ANNOUNCEMENT_LIST_OPTIONS.DELETE)
              handleDeletePress()
            }}
          >
            <Text style={styles.optionsText}>Delete</Text>
            <View
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    option === ANNOUNCEMENT_LIST_OPTIONS.DELETE
                      ? Colors.primary
                      : 'transparent',
                },
              ]}
            />
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  )
}

export { CommunityTab }
