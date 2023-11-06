/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  AppState,
} from 'react-native'

import { CommonActions } from '@react-navigation/native'

import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

import { useDispatch } from 'react-redux'

import { Button, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { goBack } from '@/Navigators/utils'

import { getEmailOtp, verifyOtp } from '@/Services/modules'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors } from '@/Utils'

import { styles } from './styles'

const VerifyEmail = props => {
  const {
    route: {
      params: { email },
    },
  } = props || {}
  console.log('navigation', props)
  const [otp, setOtp] = useState('')
  const [isbuttonEnabled, setbuttonEnabled] = useState(false)

  const [timeLeft, setTimeLeft] = useState(119)

  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const CheckCode = async () => {
    try {
      if (otp && email) {
        dispatch(setLoadingState(true))
        const formData = new FormData()
        formData.append('email', email)
        formData.append('otp', otp)

        const response = await verifyOtp(formData)

        if (response && response.code === 200) {
          setOtp('')
          inputRef.current?.clear()
          dispatch(setLoadingState(false))
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: ROUTES.SIGNUPSTEP2,
                  params: { email },
                },
              ],
            }),
          )
        } else {
          dispatch(setLoadingState(false))
          Alert.alert(response?.message, '')
        }
      }
    } catch (error) {
      setOtp('')
      inputRef.current?.clear()
      dispatch(setLoadingState(false))
      Alert.alert('Failed to verify otp')
      console.log('Error in verifying Otp', error)
    }
  }

  useEffect(() => {
    if (otp.length > 3) {
      setbuttonEnabled(true)
    } else {
      setbuttonEnabled(false)
    }
  }, [JSON.stringify(otp)])

  const handleResetButton = async () => {
    if (email) {
      const formData = new FormData()
      formData.append('email', email)
      try {
        dispatch(setLoadingState(true))
        const response = await getEmailOtp(formData)
        if (response && response.code === 200) dispatch(setLoadingState(false))
      } catch (error) {
        dispatch(setLoadingState(false))
        Alert.alert('', 'Something went wrong')
      }
    } else {
      dispatch(setLoadingState(false))
      Alert.alert('', 'Failed to send OTP')
    }
  }

  useEffect(() => {
    if (timeLeft <= -1) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const [wentDown, setWentDown] = useState(null)
  const [wentUp, setWentUp] = useState(null)

  useEffect(() => {
    console.log('AppState', appState)
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('AppState--', appState)
      console.log('nextAppState', nextAppState)
      if (appState.current.match(/background/) && nextAppState === 'active') {
        setWentUp(new Date().getTime())
      }

      if (appState.current.match(/inactive/) && nextAppState === 'background') {
        setWentDown(new Date().getTime())
      }
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [appState])

  useEffect(() => {
    if (wentDown && wentUp) {
      const diff = wentUp - wentDown
      const secDiff = Math.floor(diff / 1000)
      const newTime = timeLeft - secDiff
      if (newTime <= 0) {
        setTimeLeft(0)
      } else {
        setTimeLeft(newTime)
      }
      setWentDown(null)
      setWentUp(null)
    }
  }, [wentUp, wentDown])

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Verify Email"
        onPress={() => {
          goBack()
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.mainView}
        >
          <View style={styles.passwordResetView}>
            <Text style={styles.passwordResetText}>Verify</Text>
            <Text style={styles.passwordResetText}>Email</Text>
          </View>
          <View style={styles.enterOtpView}>
            <Text style={styles.enterOtpText}>
              Please enter the OTP you have received
            </Text>
            <Text style={styles.enterOtpText}>
              on your email ID to verify your email
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <View style={styles.smoothPinCodeInputView}>
              <SmoothPinCodeInput
                restrictToNumbers
                cellSize={49}
                cellSpacing={20}
                cellStyle={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.primary,
                }}
                cellStyleFocused={{
                  borderColor: Colors.primary,
                }}
                codeLength={4}
                ref={inputRef}
                value={otp}
                // onFulfill={CheckCode}
                onTextChange={otp => setOtp(otp)}
              />
            </View>
            <Button
              containerStyle={{
                backgroundColor: isbuttonEnabled
                  ? Colors.primary
                  : Colors.darkLiver,

                ...styles.confirmButton,
              }}
              onPress={CheckCode}
            >
              <Text style={styles.confirmOtpText}>Confirm OTP</Text>
            </Button>

            <TouchableOpacity
              disabled={timeLeft > 0}
              onPress={() => {
                console.log('onPress ')
                if (timeLeft < 0) setTimeLeft(119)
                setOtp('')
                handleResetButton()
              }}
            >
              <Text style={styles.resendLinkText}>
                {timeLeft !== -1
                  ? `Resend OTP in 0${parseInt(timeLeft / 60)} : ${
                      timeLeft % 60 > 9 ? timeLeft % 60 : '0' + (timeLeft % 60)
                    } `
                  : 'Didn’t receive OTP? '}
                {timeLeft <= -1 && (
                  <Text style={styles.resendLinkText}>Resend OTP</Text>
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.textInputTitle, styles.stepText]}>
            Step 2 of 4
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export { VerifyEmail }
