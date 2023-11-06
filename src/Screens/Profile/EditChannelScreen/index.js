/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  Linking,
  Switch,
  Platform,
  TextInput,
} from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useDispatch, useSelector } from 'react-redux'

import {
  cameraIcon,
  cameraOutline,
  defaultAvatar,
  deleteIcon,
  gallery,
  rupees,
} from '@/Assets/Images'
import { BottomSheet, Header, Input, Dropdown, Card } from '@/Components'

import { Button } from '@/Components/Button'
import Divider from '@/Components/Divider'
import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'
import { editChannelApi } from '@/Services/modules'
import { getCategoryList } from '@/Store/Reducers/Common/CategoryReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'

import { TextConstants } from '@/Utils/textConstants'

import { SelectedCategoryList } from '../CreateChannelScreen/Components/SelectedCategoryList'
import { styles } from './style'

export const EditChannel = props => {
  const { channelDetails } = props?.route?.params || {}

  const [cameraModalIsVisible, setCameraModalIsVisible] = useState(false)
  const [profilePicture, setProfilePicture] = useState({
    uri: channelDetails?.profile_image,
  })
  const [showDeleteView, setShowDeleteView] = useState(false)
  const [bio, setBio] = useState(channelDetails?.channel_bio)

  const [categoryList, setCategoryList] = useState([])

  const [profileImageError, setProfileImageError] = useState('')
  // const [channelNameError, setChannelNameError] = useState('')
  const [bioError, setbioError] = useState('')
  // const [categoryError, setCategoryError] = useState('')
  // const [priceError, setPriceError] = useState('')

  const bioInputRef = useRef(null)
  const dispatch = useDispatch()

  const token = useSelector(state => state.UserReducer.userData.token) || ''

  const validateFields = () => {
    if (!profilePicture) {
      return false
    }
    if (bio === '') {
      return false
    }

    return true
  }

  const pickSingleWithCamera = (cropping = true, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping,
      width: 500,
      height: 500,
      mediaType,
    })
      .then(image => {
        setProfilePicture({
          uri: image.path,
          type: image.mime,
          name:
            Platform.OS === 'ios'
              ? image.filename
              : Math.random().toString(36).slice(-5),
        })
        setCameraModalIsVisible(false)
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

  const pickSingleWithGallery = (cropping = true, mediaType = 'photo') => {
    ImagePicker.openPicker({
      cropping,
      width: 500,
      height: 500,
      mediaType,
    })
      .then(image => {
        setProfilePicture({
          uri: image.path,
          type: image.mime,
          name:
            Platform.OS === 'ios'
              ? image.filename
              : Math.random().toString(36).slice(-5),
        })
        setCameraModalIsVisible(false)
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

  const validateOtherUserFields = () => {
    if (!profilePicture) {
      setProfileImageError('Profile Picture is required')
      return false
    }
    if (bio === '') {
      setbioError('Channel Bio is required')
      return false
    }

    return true
  }

  const updateChannel = async () => {
    if (!validateOtherUserFields()) {
      return
    }
    dispatch(setLoadingState(true))

    const formdata = new FormData()

    formdata.append('channel_bio', bio)
    if (profilePicture?.type) {
      formdata.append('profile_image', profilePicture)
    }

    try {
      const response = await editChannelApi(formdata, channelDetails?.id, token)

      if (response && response.code === 200) {
        Alert.alert('Channel Updated Successfully')
        dispatch(setLoadingState(false))
        navigationRef.navigate(ROUTES.CHANNEL_DETAILS, {
          channelDetails: response,
        })
      } else {
        dispatch(setLoadingState(false))
        Alert.alert(response?.message)
      }
    } catch (error) {
      dispatch(setLoadingState(false))
      console.log('Error in Api', error)
      Alert.alert('Failed to update channel')
    }
  }

  useEffect(() => {
    if (channelDetails?.category && channelDetails?.category?.length > 0) {
      dispatch(setLoadingState(true))
      dispatch(
        getCategoryList(
          categorydata => {
            if (
              categorydata &&
              Array.isArray(categorydata) &&
              categorydata.length > 0
            ) {
              const arr = []
              channelDetails?.category.forEach(elem => {
                categorydata?.forEach(item => {
                  if (elem.category === item.id) {
                    arr.push({ ...item, isSelected: true })
                  }
                })
              })
              setCategoryList(arr)
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
  }, [channelDetails?.category])

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Edit Channel"
        onPress={() => {
          goBack()
        }}
      />
      <KeyboardAwareScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
        extraScrollHeight={50}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={styles.avatarConatiner}
          onPress={() => {
            setProfileImageError('')
            setCameraModalIsVisible(true)
          }}
        >
          <View style={styles.profileImg}>
            <Image
              resizeMode="contain"
              source={
                profilePicture
                  ? {
                      uri: profilePicture.uri,
                    }
                  : defaultAvatar
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.camBtn}>
            <Image source={cameraIcon} style={styles.cameraIcon} />
          </View>
        </Pressable>

        {profileImageError !== '' && (
          <Text style={[styles.errMsgText, { alignSelf: 'center' }]}>
            {profileImageError}
          </Text>
        )}

        <View style={styles.inputWrapper}>
          <Text style={styles.displayNameText}>Channel Name</Text>
          <Input
            editable={false}
            inputStyle={{ color: Colors.silver }}
            value={channelDetails?.name}
          />
          <Text style={styles.displayNameText}>Channel Bio</Text>
          <Input
            multiline
            containerStyle={{ height: responsiveSize(120) }}
            maxLength={60}
            refs={bioInputRef}
            returnKeyType="default"
            value={bio}
            onChangeText={text => {
              setBio(text)
            }}
            onFocus={() => {
              setbioError('')
            }}
          />
          {bioError !== '' && <Text style={styles.errMsgText}>{bioError}</Text>}

          <Text style={styles.count}>{bio.length}/60</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.categoryHeading}>Choose a Category</Text>
          <Dropdown
            isDisabled
            label="Search"
            style={{ color: Colors.silver }}
          />
          {categoryList && (
            <SelectedCategoryList items={categoryList} onPress={() => {}} />
          )}

          <Text style={styles.visibilityHeading}>Channel Visibilty</Text>
          <View style={styles.switchView}>
            <Text style={styles.switchOption}>Free</Text>
            <Switch
              disabled
              ios_backgroundColor="#3e3e3e"
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1 }] }}
              thumbColor={Colors.primary}
              trackColor={{ false: Colors.darkLiver, true: Colors.white }}
              value={channelDetails?.channel_visibility === 'PR'}
              onValueChange={() => {}}
            />
            <Text style={styles.switchOption}>Premium</Text>
          </View>

          {channelDetails?.channel_visibility === 'PR' && (
            <>
              <Text style={styles.subscriptionHeading}>
                Set a monthly Subscription Price
              </Text>
              <Card cardContainerStyle={styles.containerStyle}>
                <Image source={rupees} style={styles.ruppesIcon} />

                <View style={styles.textInputView}>
                  <TextInput
                    editable={false}
                    style={styles.textInputStyles}
                    value={channelDetails?.subscription_price?.toString()}
                  />
                </View>
                <Text style={styles.cardText}>Per month</Text>
              </Card>
            </>
          )}
        </View>

        {!validateFields() && (
          <Text style={styles.fillAllFieldsText}>
            {TextConstants.FILL_ALL_FIELDS}
          </Text>
        )}

        <Button
          containerStyle={[
            styles.CreateChannelBtn,
            {
              backgroundColor: validateFields()
                ? Colors.primary
                : Colors.darkLiver,
            },
          ]}
          // isButtonDisabled={!validateFields()}
          onPress={updateChannel}
        >
          <Text style={styles.createChannelText}>Update Channel</Text>
        </Button>
      </KeyboardAwareScrollView>

      <BottomSheet
        visible={cameraModalIsVisible}
        onDismiss={() => setCameraModalIsVisible(false)}
      >
        {!showDeleteView && (
          <View style={styles.modalParentView}>
            <Text style={styles.modalText}>Select a profile picture</Text>
            <Divider dividerStyles={styles.dividerStyles} />

            <View style={styles.iconsContainer}>
              <Pressable
                onPress={() => {
                  pickSingleWithCamera()
                }}
              >
                <Image source={cameraOutline} style={styles.iconsView} />
              </Pressable>
              <Pressable
                onPress={() => {
                  pickSingleWithGallery()
                }}
              >
                <Image source={gallery} style={styles.iconsView} />
              </Pressable>
              <Pressable onPress={() => setShowDeleteView(true)}>
                <Image source={deleteIcon} style={styles.iconsView} />
              </Pressable>
            </View>
          </View>
        )}
        {showDeleteView && (
          <View
            style={{ ...styles.modalParentView, marginTop: responsiveSize(20) }}
          >
            <Text style={styles.modalText}>
              Are you sure you want to change
            </Text>
            <Text style={styles.modalText}> your profile picture?</Text>
            <Divider dividerStyles={styles.dividerStyles} />

            <View style={styles.buttonsContainer}>
              <Pressable
                style={styles.confirmationbutton}
                onPress={() => {
                  setProfilePicture(null)
                  setShowDeleteView(false)
                }}
              >
                <Text style={styles.textBtn}>Confirm</Text>
              </Pressable>
              <Pressable
                style={{
                  ...styles.confirmationbutton,
                  marginLeft: responsiveSize(20),
                }}
                onPress={() => setShowDeleteView(false)}
              >
                <Text style={styles.textBtn}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        )}
      </BottomSheet>
    </View>
  )
}
