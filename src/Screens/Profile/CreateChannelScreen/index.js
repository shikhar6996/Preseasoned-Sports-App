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

import { useDispatch } from 'react-redux'

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
import { ONLYNUMERIC_REGEX, ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'
import { createChannelRequest } from '@/Store/Reducers/Channels'
import { getCategoryList } from '@/Store/Reducers/Common/CategoryReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'

import { TextConstants } from '@/Utils/textConstants'

import { SelectedCategoryList } from './Components/SelectedCategoryList'
import { styles } from './style'

export const CreateChannel = props => {
  console.log(props, 'createChannel in create channel')

  const { params } = props?.route || {}

  const [cameraModalIsVisible, setCameraModalIsVisible] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [showDeleteView, setShowDeleteView] = useState(false)
  const [channelName, setChannelName] = useState('')
  const [bio, setBio] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [isEnabled, setIsEnabled] = useState(false)
  const [subscriptionFee, setSubscriptionFee] = useState('')

  const [profileImageError, setProfileImageError] = useState('')
  const [channelNameError, setChannelNameError] = useState('')
  const [bioError, setbioError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [priceError, setPriceError] = useState('')

  const displayChannelInputRef = useRef(null)
  const bioInputRef = useRef(null)

  const dispatch = useDispatch()

  const validateFields = () => {
    if (!profilePicture) {
      return false
    }
    if (channelName === '') {
      return false
    }
    if (bio === '') {
      return false
    }
    if (!categoryList.filter(item => item.isSelected).length) {
      return false
    }
    if (
      isEnabled &&
      (subscriptionFee === '' || !subscriptionFee.match(/^(\d+(\.\d+)?)$/))
    ) {
      return false
    }
    return true
  }

  const emptyFieldAlert = () => {
    if(!profilePicture){
      Alert.alert('Profile Picture is required')
    }
    else if ( (channelName.length === 0  || bio.length === 0 || !categoryList.filter(item => item.isSelected).length) ) {
      Alert.alert('Some of the fields have invalid or no information.')
    }
  }

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

  const validateOtherUserFields = () => {
    if (!profilePicture) {
      // Alert.alert('Profile Picture is required')
      setProfileImageError('Profile Picture is required')
      return false
    } else if (channelName === '') {
      setChannelNameError('Channel Name is required')
      return false
    } else if (bio === '') {
      setbioError('Channel Bio is required')
      return false
    } else if (!categoryList.filter(item => item.isSelected).length) {
      setCategoryError('Channel Category is required')
      return false
    } else if (
      isEnabled &&
      (subscriptionFee === '' || !subscriptionFee.match(/^(\d+(\.\d+)?)$/))
    ) {
      setPriceError('Invalid Subscription Price')
      return false
    }
    return true
  }

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  useEffect(() => {
    dispatch(setLoadingState(true))
    dispatch(
      getCategoryList(
        categorydata => {
          if (
            categorydata &&
            Array.isArray(categorydata) &&
            categorydata.length > 0
          ) {
            setCategoryList(
              categorydata.map(item => ({ ...item, isSelected: false })),
              console.log('categorylist---->', categorydata),
            )
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

  const createChannel = () => {
  emptyFieldAlert()

    if (!validateOtherUserFields()) {
      return
    }
    dispatch(setLoadingState(true))

    const selectedSportsById = categoryList.filter(item => item.isSelected)
    let selectedCaetegoryIds = ''
    if (selectedSportsById && selectedSportsById.length) {
      selectedSportsById.forEach((item, idx) => {
        if (idx === selectedSportsById.length - 1) {
          selectedCaetegoryIds += `${item.id}`
        } else selectedCaetegoryIds += `${item.id},`
      })
    }
    const formdata = new FormData()

    formdata.append('name', channelName)
    formdata.append('channel_bio', bio)
    formdata.append('profile_image', profilePicture)
    formdata.append('category', selectedCaetegoryIds)
    formdata.append('channel_visibility', isEnabled ? 'PR' : 'FR')
    formdata.append(
      'subscription_price',
      subscriptionFee ? parseInt(subscriptionFee, 10) : 0,
    )

    dispatch(
      createChannelRequest(
        formdata,
        response => {
          if (response && response.code === 200) {
            console.log(response, 'response from create')
            Alert.alert('Channel Created Successfully')
            dispatch(setLoadingState(false))
            navigationRef.navigate(ROUTES.CHANNEL_DETAILS, {
              lastScreen: params.lastScreen || '',
              channelDetails: response,
            })
          } else {
            dispatch(setLoadingState(false))
            Alert.alert(response?.message)
          }
        },
        error => {
          dispatch(setLoadingState(false))
          console.log('Error in Api', error)
          Alert.alert('Failed to create channel')
        },
      ),
    )
  }

  const handleDropdownSelection = (selectedItem = undefined) => {
    setCategoryError('')
    if (selectedItem) {
      setCategoryList(
        categoryList.map(item => {
          if (selectedItem.id === item.id || selectedItem === item.id)
            return { ...item, isSelected: !item.isSelected }
          return item
        }),
      )
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Create Channel"
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
            maxLength={40}
            refs={displayChannelInputRef}
            returnKeyType="next"
            value={channelName}
            onChangeText={text => {
              setChannelName(text)
            }}
            onFocus={() => {
              setChannelNameError('')
            }}
            onSubmitEditing={() => bioInputRef.current?.focus()}
          />
          {channelNameError !== '' && (
            <Text style={styles.errMsgText}>{channelNameError}</Text>
          )}

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
            data={categoryList}
            label="Search"
            onSelect={handleDropdownSelection}
          />
          {categoryList && (
            <SelectedCategoryList
              items={categoryList}
              onPress={handleDropdownSelection}
            />
          )}

          {categoryError !== '' && (
            <Text style={styles.errMsgText}>{categoryError}</Text>
          )}

          {categoryList.filter(item => item.isSelected).length === 0 && (
            <Text style={styles.categoryMessage}>
              Please select at least one category
            </Text>
          )}
          <Text style={styles.visibilityHeading}>Channel Visibilty</Text>
          <View style={styles.switchView}>
            <Text style={styles.switchOption}>Free</Text>
            <Switch
              ios_backgroundColor="#3e3e3e"
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1 }] }}
              thumbColor={isEnabled ? Colors.primary : Colors.primary}
              trackColor={{ false: Colors.darkLiver, true: Colors.white }}
              value={isEnabled}
              onValueChange={toggleSwitch}
            />
            <Text style={styles.switchOption}>Premium</Text>
          </View>

          {isEnabled && (
            <>
              <Text style={styles.subscriptionHeading}>
                Set a monthly Subscription Price
              </Text>
              <Card cardContainerStyle={styles.containerStyle}>
                <Image source={rupees} style={styles.ruppesIcon} />

                <View style={styles.textInputView}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={7}
                    returnKeyType="next"
                    selectionColor={Colors.white}
                    style={styles.textInputStyles}
                    value={subscriptionFee}
                    onChangeText={text => {
                      if (text.match(ONLYNUMERIC_REGEX) || text === '') {
                        setSubscriptionFee(text)
                      }
                    }}
                    onFocus={() => {
                      setPriceError('')
                    }}
                    // onSubmitEditing={() => {}}
                  />
                </View>
                <Text style={styles.cardText}>Per month</Text>
              </Card>

              {priceError !== '' && (
                <Text style={styles.errMsgText}>{priceError}</Text>
              )}
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
          onPress={() => {
           createChannel() 
          }}
        >
          <Text style={styles.createChannelText}>Create Channel</Text>
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
