/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { useDispatch } from 'react-redux'

import { eye, eyeWithSlash } from '@/Assets/Images'
import { Button, Header, Input } from '@/Components'
import { PASSWORD_REGEX, ROUTES } from '@/Constants'
import { goBack, navigateAndSimpleReset } from '@/Navigators/utils'

import { resetPassword } from '@/Services/modules/user/resetPass'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'
import { TextConstants } from '@/Utils/textConstants'

import { styles } from './styles'

const ConfirmPasswordResetScreen = props => {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false)
  const {
    route: {
      params: { email },
    },
  } = props
  const [user, setUser] = useState({
    confirmPassword: { value: '', isInvalid: false },
    password: { value: '', isInvalid: false },
  })
  const confirmPasswordInputRef = useRef(null)
  const dispatch = useDispatch()

  const validateFields = () => {
    if (!PASSWORD_REGEX.test(user.password.value)) {
      return false
    }
    if (user.password.value !== user.confirmPassword.value) {
      return false
    }

    return true
  }

  const validatePassword = () => {
    if (!PASSWORD_REGEX.test(user.password.value)) {
      Alert.alert(
        'Invalid Password',
        'Password must be atleast 8 characters long and contain atleast one uppercase, one lowercase and one number',
      )
      return false
    }
    if (user.password.value !== user.confirmPassword.value) {
      Alert.alert('Invalid Confirm Password', 'Passwords do not match')
      return false
    }
    return true
  }

  const handleResetPassword = async () => {
    dispatch(setLoadingState(true))

    if (!validatePassword()) {
      return
    }
    if (email) {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', user.password.value)
      try {
        const response = await resetPassword(formData)

        if (response && response.code === 200) {
          dispatch(setLoadingState(false))
          navigateAndSimpleReset(ROUTES.RESETDONE)
        } else {
          dispatch(setLoadingState(false))
          Alert.alert('', 'Failed to send OTP')
        }
      } catch (error) {
        dispatch(setLoadingState(false))
        console.log('Error', error)
      }
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Password Reset"
        onPress={() => {
          goBack()
        }}
      />
      <ScrollView bounces={false} style={styles.mainView}>
        <View style={styles.passwordResetView}>
          <Text style={styles.passwordResetText}>Password</Text>
          <Text style={styles.passwordResetText}>Reset</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Text style={styles.enterNewPassText}>Enter new password</Text>
          <Input
            hasIcon
            iconPressDisabled={false}
            iconSource={!isPassVisible ? eyeWithSlash : eye}
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
            onIconPress={() => setIsPassVisible(!isPassVisible)}
            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
          />

          <Text style={styles.descriptionText}>
            Please enter a minimum length of eight characters, at least one
            uppercase character, at least one lowercase character and at least
            one number
          </Text>

          <Text style={styles.confirmPassText}>Confirm new password</Text>
          <Input
            hasIcon
            iconPressDisabled={false}
            iconSource={!isConfirmPassVisible ? eyeWithSlash : eye}
            returnKeyLabel="go"
            returnKeyType="go"
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
            onIconPress={() => setIsConfirmPassVisible(!isConfirmPassVisible)}
          />

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
            isButtonDisabled={!validateFields()}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetPasswordText}>Reset Password</Text>
          </Button>
        </View>

        {/* <Button containerStyle={{ marginTop: responsiveSize(115) }}>
          <Text>Contact Support</Text>
        </Button> */}
      </ScrollView>
    </View>
  )
}

export { ConfirmPasswordResetScreen }
