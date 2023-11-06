/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { eye, eyeWithSlash } from '@/Assets/Images'
import { Button, Header, Input } from '@/Components'

import { EMAIL_REGEX, PASSWORD_REGEX, ROUTES } from '@/Constants'
import {
  goBack,
  navigateAndSimpleReset,
  navigationRef,
} from '@/Navigators/utils'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { loginRequest } from '@/Store/Reducers/User'
import { Colors, responsiveSize } from '@/Utils'

import { TextConstants } from '@/Utils/textConstants'

import { styles } from './styles'

const LoginScreen = props => {
  const dispatch = useDispatch()
  const [isbuttonEnabled, setbuttonEnabled] = useState(false)

  const { userDataFailureMsg, fcmToken } = useSelector(
    state => state.UserReducer,
  )
  const [userCreds, setUserCreds] = useState({
    email: { value: '', isInvalid: false },
    password: { value: '', isInvalid: false },
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isLoginError, setIsLoginError] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const validatePassword = () => {
    if (!PASSWORD_REGEX.test(userCreds.password.value)) {
      return false
    }
    return true
  }

  const validateEmail = () => {
    if (!userCreds.email.value.match(EMAIL_REGEX)) {
      return false
    }

    return true
  }

  const validateFields = () => {
    if (!validateEmail()) {
      return false
    }

    if (!validatePassword()) {
      return false
    }

    return true
  }

  const validateFieldsErrorMessages = () => {
    if (!validateEmail()) {
      setEmailError('Invalid Email Id')
      return false
    }

    if (!validatePassword()) {
      setPasswordError('Invalid Password', '')
      return false
    }

    return true
  }

  // useEffect(() => {
  //   if (
  //     userCreds.email.value.length > 0 &&
  //     userCreds.password.value.length > 0
  //   ) {
  //     setbuttonEnabled(true)
  //   } else {
  //     setbuttonEnabled(false)
  //   }
  // }, [JSON.stringify(userCreds)])

  const WrongEmailPasswordComponent = useCallback(
    () => (
      <View style={styles.wrongEmailView}>
        <Text style={styles.wrongEmailText}>
          Sorry, either the username or password entered is incorrect.
        </Text>
      </View>
    ),
    [],
  )

  const EnterUserNamebelowComponent = useCallback(
    () => (
      <View style={styles.descriptionView}>
        <Text style={styles.description}>
          Please enter your email & password below.
        </Text>
      </View>
    ),
    [],
  )

  const handleLogin = () => {
    setIsLoginError(false)
    dispatch(setLoadingState(true))
    const formdata = new FormData()
    formdata.append('email', userCreds.email.value)
    formdata.append('password', userCreds.password.value)
    formdata.append('device_token', fcmToken)
    dispatch(
      loginRequest(
        formdata,
        data => {
          dispatch(setLoadingState(false))
          navigateAndSimpleReset(ROUTES.DASHBOARD)
        },
        err => {
          setIsLoginError(true)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Log In"
        onPress={() => {
          // goBack()
          navigationRef.navigate(ROUTES.ONBOARDING, {})
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ ...styles.mainView, ...styles.contentContainerStyle }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        >
          <View style={styles.welcomeView}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeText}>back!</Text>
          </View>
          {isLoginError ? (
            <WrongEmailPasswordComponent />
          ) : (
            <EnterUserNamebelowComponent />
          )}

          <View style={styles.inputWrapper}>
            <Text style={styles.textInputTitle}>Email</Text>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              refs={emailInputRef}
              returnKeyLabel="next"
              returnKeyType="next"
              value={userCreds.email.value}
              onChangeText={text =>
                setUserCreds(user => ({
                  ...user,
                  email: { ...user.email, value: text },
                }))
              }
              onFocus={() => {
                setEmailError('')
              }}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            {emailError !== '' && (
              <Text style={styles.errMsgText}>{emailError}</Text>
            )}

            <Text style={styles.passwordText}>Password</Text>
            <Input
              hasIcon
              autoCapitalize="none"
              iconPressDisabled={false}
              iconSource={isVisible ? eye : eyeWithSlash}
              refs={passwordInputRef}
              returnKeyLabel="done"
              returnKeyType="done"
              secureTextEntry={!isVisible}
              value={userCreds.password.value}
              onChangeText={text =>
                setUserCreds(user => ({
                  ...user,
                  password: { ...user.password, value: text },
                }))
              }
              onFocus={() => {
                setPasswordError('')
              }}
              onIconPress={() => setIsVisible(!isVisible)}
            />
            {passwordError !== '' && (
              <Text style={styles.errMsgText}>{passwordError}</Text>
            )}
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
              if (validateFieldsErrorMessages()) {
                handleLogin()
              }
            }}
          >
            <Text style={styles.loginText}>Log In</Text>
          </Button>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => {
            navigationRef.navigate(ROUTES.PASSWORDRESETSCREEN)
          }}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export { LoginScreen }
