/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  Linking,
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
} from '@/Assets/Images'
import { BottomSheet, Header, Input } from '@/Components'

import { Button } from '@/Components/Button'
import Divider from '@/Components/Divider'
import { goBack, navigationRef } from '@/Navigators/utils'
import { getCategoryList } from '@/Store/Reducers/Common/CategoryReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { updateUserProfileRequest } from '@/Store/Reducers/User'
import { Colors, responsiveSize } from '@/Utils'

import { TextConstants } from '@/Utils/textConstants'

import { styles } from './style'

const Item = ({ id, title, category_image, isSelected, onPress }) => (
  <Pressable
    style={[
      styles.item,
      { backgroundColor: isSelected ? Colors.primary : Colors.secondary },
    ]}
    onPress={() => {
      onPress(id)
    }}
  >
    <Image
      source={{ uri: category_image }}
      style={[
        styles.img,
        {
          tintColor: isSelected ? Colors.white : undefined,
          height: '100%',
          width: '100%',
        },
      ]}
    />
    <Text
      style={[
        styles.cardText,
        { color: isSelected ? Colors.white : Colors.silver },
      ]}
    >
      {title}
    </Text>
  </Pressable>
)
export const EditProfile = props => {
  const userData = useSelector(state => state.UserReducer.userData)
  const { display_name, username, bio, profile_image, category } =
    userData?.user_profile || {}
  const [cameraModalIsVisible, setCameraModalIsVisible] = useState(false)
  const [profilePicture, setProfilePicture] = useState({ uri: profile_image })
  const [showDeleteView, setShowDeleteView] = useState(false)
  const [displayName, setDisplayName] = useState(display_name)
  const [userBio, setUserBio] = useState(bio)
  const [sportsList, setSportsList] = useState([])
  const displayChannelInputRef = useRef(null)
  const bioInputRef = useRef(null)
  const dispatch = useDispatch()

  const handleSportSelection = id => {
    setSportsList(
      sportsList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isSelected: !item.isSelected,
          }
        }
        return item
      }),
    )
  }

  useEffect(() => {
    // dispatch(setLoadingState(true))
    dispatch(
      getCategoryList(
        data => {
          if (data && data?.length > 0) {
            if (category && Array.isArray(category) && category.length) {
              const categoryListByTitle = category.map(
                item => item.category_title,
              )
              setSportsList(
                data.map(item => ({
                  ...item,
                  isSelected: categoryListByTitle.includes(item.title),
                })),
              )
            } else {
              setSportsList(data.map(item => ({ ...item, isSelected: false })))
            }
          }
          dispatch(setLoadingState(false))
        },
        error => {
          console.log('Error in Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }, [])

  const pickSingleWithCamera = (cropping = true, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping,
      width: 500,
      height: 500,
      // includeExif: true,
      mediaType,
    })
      .then(image => {
        console.log('received image', image)
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
      // includeExif: true,
      mediaType,
    })
      .then(image => {
        console.log('received image', image)
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

  const validateFields = () => {
    if (!profilePicture) {
      return false
    }
    if (displayName === '') {
      return false
    }
    if (userBio === '') {
      return false
    }

    return true
  }

  const validateOtherUserFields = () => {
    if (!profilePicture) {
      Alert.alert('', 'Profile picture required')
      return false
    }
    if (displayName === '') {
      Alert.alert('', 'Display Name required')
      return false
    }
    if (userBio === '') {
      Alert.alert('', 'Bio required')
      return false
    }
    // if (!sportsList.filter(item => item.isSelected).length) {
    //   Alert.alert('', 'Category required')
    //   return false
    // }
    return true
  }

  const editProfile = () => {
    if (!validateOtherUserFields()) {
      return
    }
    dispatch(setLoadingState(true))

    const selectedSportsById = sportsList.filter(item => item.isSelected)
    let selectedCategoryIds = ''
    if (selectedSportsById && selectedSportsById.length) {
      selectedSportsById.forEach((item, idx) => {
        if (idx === selectedSportsById.length - 1) {
          selectedCategoryIds += `${item.id}`
        } else selectedCategoryIds += `${item.id},`
      })
    }
    const formdata = new FormData()
    if (displayName !== display_name)
      formdata.append('display_name', displayName)
    if (userBio !== bio) formdata.append('bio', userBio)
    if (profilePicture.uri !== profile_image)
      formdata.append('profile_image', profilePicture)

    if (selectedCategoryIds === '') {
      selectedCategoryIds = 'deleted'
    }
    formdata.append('category', selectedCategoryIds)

    console.log('Update user profile Request formdata ---', formdata)
    dispatch(
      updateUserProfileRequest(
        formdata,
        () => {
          dispatch(setLoadingState(false))
          navigationRef.goBack()
        },
        () => {
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Edit Profile"
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
            setCameraModalIsVisible(true)
          }}
        >
          <View style={styles.profileImg}>
            <Image
              resizeMode="contain"
              source={
                profilePicture
                  ? {
                      uri: profilePicture?.uri,
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
        <View>
          <Text style={styles.displayNameText}>Create a Username</Text>
          <TextInput
            autoCorrect={false}
            editable={false}
            placeholder="Search"
            placeholderTextColor={Colors.silver}
            returnKeyType="search"
            selectionColor={Colors.white}
            style={styles.textInputStyles}
            value={`@${username}`}
          />
          <Text style={styles.displayNameText}>Display Name</Text>
          <Input
            editable
            maxLength={20}
            refs={displayChannelInputRef}
            returnKeyType="next"
            value={displayName}
            onChangeText={text => {
              setDisplayName(text)
            }}
            onSubmitEditing={() => bioInputRef.current?.focus()}
          />
          <Text style={styles.displayNameText}>Enter a Bio</Text>
          <Input
            editable
            multiline
            containerStyle={{ height: responsiveSize(120) }}
            maxLength={60}
            refs={bioInputRef}
            returnKeyType="default"
            value={userBio}
            onChangeText={text => {
              setUserBio(text)
            }}
          />

          <Text style={styles.count}>{userBio.length}/60</Text>
          <Text style={styles.displayNameText}>Sports Interests</Text>
          <View style={styles.container}>
            {sportsList &&
              sportsList.map((item, idx) => (
                <Item
                  key={`sportsKey${idx}`}
                  {...item}
                  onPress={handleSportSelection}
                />
              ))}
          </View>
        </View>

        {!validateFields() && (
          <Text style={styles.fillAllFieldsText}>
            {TextConstants.FILL_ALL_FIELDS}
          </Text>
        )}

        <Button
          containerStyle={{
            backgroundColor: validateFields()
              ? Colors.primary
              : Colors.darkLiver,
            marginTop: responsiveSize(30),
          }}
          onPress={editProfile}
        >
          <Text style={styles.confirmButtonText}>Save Changes</Text>
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
            <Text style={styles.modalText}>your profile picture?</Text>
            <Divider dividerStyles={styles.dividerStyles} />

            <View style={styles.buttonsContainer}>
              <Pressable
                style={styles.confirmationbutton}
                onPress={() => {
                  setProfilePicture(null)
                  setShowDeleteView(false)
                  setCameraModalIsVisible(false)
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
