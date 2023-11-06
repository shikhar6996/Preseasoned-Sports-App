import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'

import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

import { useDispatch } from 'react-redux'

import { Button, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { getEmailOtpForPasswordReset } from '@/Services/modules/user/sendOtpToEmail'
import { verifyUserOtp } from '@/Services/modules/user/verifyOtpUser'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors } from '@/Utils'

import { styles } from './styles'

const OtpScreen = props => {
  const {
    route: {
      params: { email },
    },
  } = props
  console.log('emaillll', email)
  const [otp, setOtp] = useState('')
  const [isbuttonEnabled, setbuttonEnabled] = useState(false)

  const inputRef = useRef(null)

  const dispatch = useDispatch()

  const CheckCode = async () => {
    dispatch(setLoadingState(true))

    if (!email) {
      Alert.alert('Error', 'Something went wrong! Please try after sometime.')
      return
    }
    try {
      if (otp) {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('otp', otp)
        const response = await verifyUserOtp(formData)

        if (response && response.code === 200) {
          setOtp('')
          inputRef.current?.clear()
          dispatch(setLoadingState(false))
          navigationRef.navigate(ROUTES.CONFIRMPASSWORDRESETSCREEN, { email })
        } else {
          dispatch(setLoadingState(false))
          Alert.alert(response?.message, '')
        }
      }
    } catch (error) {
      dispatch(setLoadingState(false))

      Alert.alert('', 'Failed to verify otp')
    }
  }

  const resendOtpToEmail = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Something went wrong! Please try after sometime.')
        return
      }
      const formData = new FormData()
      formData.append('email', email)
      const response = await getEmailOtpForPasswordReset(formData)
      console.log('Response from getEmail', response)
      if (response && response.code === 200) {
        return
      }
      Alert.alert('', 'Failed to send OTP')
    } catch (error) {
      console.log('Error in sending OTP to email ', error)
    }
  }
  useEffect(() => {
    if (otp.length > 3) {
      setbuttonEnabled(true)
    } else {
      setbuttonEnabled(false)
    }
  }, [JSON.stringify(otp)])

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Password Reset"
        onPress={() => {
          goBack()
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.mainView}
        >
          <View style={styles.passwordResetView}>
            <Text style={styles.passwordResetText}>Password</Text>
            <Text style={styles.passwordResetText}>Reset</Text>
          </View>
          <View style={styles.enterOtpView}>
            <Text style={styles.enterOtpText}>
              Please enter the OTP you have received
            </Text>
            <Text style={styles.enterOtpText}>
              on your email ID to set new pasword
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <View style={styles.smoothPinCodeInputView}>
              <SmoothPinCodeInput
                restrictToNumbers
                cellSize={49}
                cellSpacing={20}
                cellStyle={styles.cellStyle}
                cellStyleFocused={{
                  borderColor: Colors.primary,
                }}
                codeLength={4}
                ref={inputRef}
                value={otp}
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
              onPress={() => {
                setOtp('')
                resendOtpToEmail()
              }}
            >
              <Text style={styles.resendLinkText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export { OtpScreen }
