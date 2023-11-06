/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Platform,
  ScrollView,
  Pressable,
  Image,
  Alert,
  Linking,
} from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  cameraIcon,
  cameraOutline,
  deleteIcon,
  gallery,
  successIconCircle,
  crossIcon,
  eye,
  eyeWithSlash,
  defaultAvatar,
} from '@/Assets/Images'
import { BottomSheet, Header, Input } from '@/Components'

import { Button } from '@/Components/Button'
import Divider from '@/Components/Divider'
import { endpoints, PASSWORD_REGEX, ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'

import api from '@/Services/api'
import { Colors, responsiveSize } from '@/Utils'

import { TextConstants } from '@/Utils/textConstants'

import { styles } from './styles'

const Step2 = props => {
  const { params } = props?.route || {}
  console.log('step22', params)
  const [cameraModalIsVisible, setCameraModalIsVisible] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [showDeleteView, setShowDeleteView] = useState(false)
  const [isValidUserName, setIsValidUserName] = useState(null)
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false)
  const [isUsernameBlur, setIsUserNameBlur] = useState(false)

  const [profileImageError, setProfileImageError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [displayNameError, setDisplayNameError] = useState('')
  const [bioError, setbioError] = useState('')

  const userNameInputRef = useRef(null)
  const displayNameInputRef = useRef(null)
  const bioInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const confirmPasswordInputRef = useRef(null)

  const [user, setUser] = useState({
    username: { value: '', hasError: false },
    displayName: { value: '', hasError: false },
    bio: { value: '', hasError: false },
    confirmPassword: { value: '', isInvalid: false },
    password: { value: '', isInvalid: false },
  })

  const validateFields = () => {
    const { username, displayName, bio } = user

    if (!profilePicture) {
      return false
    }
    if (!PASSWORD_REGEX.test(user.password.value)) {
      return false
    }
    if (user.password.value !== user.confirmPassword.value) {
      return false
    }
    if (username.value === '') {
      return false
    }
    if (displayName.value === '') {
      return false
    }
    if (bio.value === '') {
      return false
    }

    return true
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
          // width: image.width,
          // height: image.height,
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
          // width: image.width,
          // height: image.height,
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

  const checkIsValidUserName = () => {
    if (user.username.value) {
      setIsUserNameBlur(true)
      api
        .post(endpoints.check_username, { username: user.username.value })
        .then(res => {
          if (res.status === 200) {
            setIsValidUserName(!res.data.status)
          }
        })
        .catch(error => console.log(error))
    }
  }
  useEffect(() => {
    setIsValidUserName(isValidUserName)
  })

  const validatePassword = () => {
    if (!PASSWORD_REGEX.test(user.password.value)) {
      // Alert.alert(
      //   'Invalid Password',
      //   'Password must be atleast 8 characters long and contain atleast one uppercase, one lowercase and one number',
      // )
      setPasswordError('Invalid Password.')
      return false
    }
    if (user.password.value !== user.confirmPassword.value) {
      // Alert.alert('Invalid Confirm Password', 'Passwords do not match')
      setConfirmPasswordError('Invalid Confirm Password.')
      return false
    }
    return true
  }

  const validateOtherUserFields = () => {

    const { username, displayName, bio } = user
let status = true

    if (!profilePicture) {
      Alert.alert('Profile Picture required')
      setProfileImageError('Profile Picture required')
      // return false
      status = false
    }
    else if (!validatePassword()) {
      // return false
      status = false
    }
   else if (username.value === '') {
      setUserNameError('Username required')
      // return false
      status = false
    }
   else if (displayName.value === '') {
      setDisplayNameError('Display Name required')
      // return false
      status = false
    }
   else if (bio.value === '') {
      setbioError('Bio required')
      // return false
      status = false
    }

    if(profilePicture &&!status){
      Alert.alert("Some of the fields have invalid or no information.","")
    }
    return status
  }

  const navigateToNextScreen = () => {
    if (!validateOtherUserFields()) {
      return
    }
   

    const { username, displayName, bio } = user
    if (
      username.value?.trim() &&
      displayName.value?.trim() &&
      bio.value?.trim() &&
      isValidUserName &&
      profilePicture
    )
      navigationRef.navigate(ROUTES.SIGNUPSTEP3, {
        ...params,
        password: user.password.value,
        confirm_password: user.confirmPassword.value,
        username: username.value?.trim(),
        profile_image: profilePicture ?? null,
        display_name: displayName.value?.trim(),
        bio: bio.value?.trim(),
      })
  }

  return (
    <View style={styles.mainContainer}>
      <Header title="Create Profile" />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        style={{ ...styles.mainView }}
      >
        <KeyboardAwareScrollView extraScrollHeight={50}>
          <View style={styles.joinUsView}>
            <Text style={styles.joinUsText}>Join us!</Text>
          </View>
          <Pressable
            style={styles.avatarConatiner}
            onPress={() => {
              setProfileImageError('')
              setCameraModalIsVisible(true)
            }}
          >
            <View style={styles.profileImg}>
              <Image
                defaultSource={defaultAvatar}
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

          {profileImageError !== '' && (
            <Text style={[styles.errMsgText, { alignSelf: 'center' }]}>
              {profileImageError}
            </Text>
          )}

          <View style={styles.inputWrapper}>
            <Text style={[styles.createUserNameText]}>Email</Text>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              inputStyle={{ color: Colors.silver }}
              keyboardType="email-address"
              returnKeyLabel="go"
              returnKeyType="go"
              textContentType="emailAddress"
              value={params?.email || ''}
            />
            <Text style={[styles.textInputTitle, styles.createUserNameText]}>
              Password
            </Text>
            <Input
              hasIcon
              autoCapitalize="none"
              autoCorrect={false}
              iconPressDisabled={false}
              iconSource={isPassVisible ? eye : eyeWithSlash}
              refs={passwordInputRef}
              returnKeyLabel="next"
              returnKeyType="next"
              secureTextEntry={!isPassVisible}
              textContentType="password"
              value={user.password.value}
              onChangeText={text =>
                setUser(currentState => ({
                  ...currentState,
                  password: { ...currentState.password, value: text },
                }))
              }
              onFocus={() => {
                setPasswordError('')
              }}
              onIconPress={() => setIsPassVisible(!isPassVisible)}
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />

            {passwordError !== '' && (
              <Text style={styles.errMsgText}>{passwordError}</Text>
            )}

            <Text style={styles.descriptionText}>
              Please enter a minimum length of eight characters, at least one
              uppercase character, at least one lowercase character and at least
              one number
            </Text>

            <Text style={[styles.textInputTitle, styles.createUserNameText]}>
              Confirm Password
            </Text>
            <Input
              hasIcon
              autoCapitalize="none"
              autoCorrect={false}
              iconPressDisabled={false}
              iconSource={isConfirmPassVisible ? eye : eyeWithSlash}
              refs={confirmPasswordInputRef}
              returnKeyLabel="next"
              returnKeyType="next"
              secureTextEntry={!isConfirmPassVisible}
              textContentType="password"
              value={user.confirmPassword.value}
              onChangeText={text =>
                setUser(currentState => ({
                  ...currentState,
                  confirmPassword: {
                    ...currentState.confirmPassword,
                    value: text,
                  },
                }))
              }
              onFocus={() => {
                setConfirmPasswordError('')
              }}
              onIconPress={() => setIsConfirmPassVisible(!isConfirmPassVisible)}
              onSubmitEditing={() => userNameInputRef.current?.focus()}
            />
            {confirmPasswordError !== '' && (
              <Text style={styles.errMsgText}>{confirmPasswordError}</Text>
            )}

            <Text style={[styles.textInputTitle, styles.createUserNameText]}>
              Create a Username
            </Text>

            <Input
              autoCapitalize="none"
              containerStyle={
                isUsernameBlur &&
                isValidUserName &&
                user.username.value.length > 0
                  ? { borderColor: Colors.green }
                  : user.username.value.length > 0 &&
                    isUsernameBlur &&
                    !isValidUserName
                  ? { borderColor: Colors.carmine }
                  : undefined
              }
              hasIcon={isUsernameBlur && user.username.value.length > 0}
              iconSource={isValidUserName ? successIconCircle : crossIcon}
              maxLength={30}
              refs={userNameInputRef}
              returnKeyType="next"
              value={user.username.value}
              onBlur={checkIsValidUserName}
              onChangeText={text => {
                setIsUserNameBlur(false)
                setUser(currentState => ({
                  ...currentState,
                  username: {
                    hasError: false,
                    value: text.trim(),
                  },
                }))
              }}
              onFocus={() => {
                setUserNameError('')
              }}
              onSubmitEditing={() => displayNameInputRef.current?.focus()}
            />

            {userNameError !== '' && (
              <Text style={styles.errMsgText}>{userNameError}</Text>
            )}

            <Text style={styles.descriptionText}>
              This cannot be changed later
            </Text>
            <Text style={styles.displayNameText}>Display Name</Text>
            <Input
              maxLength={20}
              refs={displayNameInputRef}
              returnKeyType="next"
              value={user.displayName.value}
              onChangeText={text => {
                setUser(currentState => ({
                  ...currentState,
                  displayName: {
                    ...currentState.displayName,
                    value: text,
                  },
                }))
              }}
              onFocus={() => {
                setDisplayNameError('')
              }}
              onSubmitEditing={() => bioInputRef.current?.focus()}
            />

            {displayNameError !== '' && (
              <Text style={styles.errMsgText}>{displayNameError}</Text>
            )}

            <Text style={styles.displayNameText}>Enter a bio</Text>
            <Input
              multiline
              containerStyle={{ height: responsiveSize(120) }}
              maxLength={60}
              refs={bioInputRef}
              // returnKeyLabel="done"
              returnKeyType="default"
              value={user.bio.value}
              onChangeText={text => {
                setUser(currentState => ({
                  ...currentState,
                  bio: {
                    ...currentState.bio,
                    value: text,
                  },
                }))
              }}
              onFocus={() => {
                setbioError('')
              }}
            />
            {bioError !== '' && (
              <Text style={styles.errMsgText}>{bioError}</Text>
            )}

            <Text style={styles.count}>{user.bio.value.length}/60</Text>
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
            // isButtonDisabled={!validateFields()}
            onPress={() => {
              if (validateOtherUserFields()) {
                navigateToNextScreen()
              }
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Button>
          <Text style={[styles.textInputTitle, styles.stepText]}>
            Step 3 of 4
          </Text>
        </KeyboardAwareScrollView>
      </ScrollView>
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

export { Step2 }
