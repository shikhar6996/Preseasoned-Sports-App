import React from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { useDispatch } from 'react-redux'

import { Button, Header, Input } from '@/Components'
import { EMAIL_REGEX, ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { getEmailOtpForPasswordReset } from '@/Services/modules/user/sendOtpToEmail'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const PasswordResetScreen = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')

  const validateFields = () => {
    if (!email.match(EMAIL_REGEX)) {
      return false
    }

    return true
  }

  const validateEmail = () => {
    if (!email.match(EMAIL_REGEX)) {
      setEmailError('Invalid Email Id')
      return false
    }

    return true
  }
  const verifyEmail = async () => {
    try {
      dispatch(setLoadingState(true))
      const formData = new FormData()
      formData.append('email', email)
      const response = await getEmailOtpForPasswordReset(formData)
      console.log('Response from getEmail', response)
      if (response && response.code === 200) {
        dispatch(setLoadingState(false))

        navigationRef.navigate(ROUTES.OTPSCREEN, { email })
      } else {
        dispatch(setLoadingState(false))

        Alert.alert(response?.message, '')
      }
    } catch (error) {
      dispatch(setLoadingState(false))
      if (error && error.code && error.message)
        Alert.alert('Failure', JSON.stringify(error.message))
      console.log('Error in sending OTP to email ', error)
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
        <View style={styles.enterEmailView}>
          <Text style={styles.enterEmailText}>Please enter your email</Text>
          <Text style={styles.enterEmailText}>
            A password reset OTP will be sent to you
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyLabel="done"
            returnKeyType="done"
            textContentType="emailAddress"
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => {
              setEmailError('')
            }}
          />
          {emailError !== '' && (
            <Text style={styles.errMsgText}>{emailError}</Text>
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
              if (validateEmail()) {
                verifyEmail()
              }
            }}
          >
            <Text style={styles.getLinkText}>Get OTP</Text>
          </Button>
        </View>

        {/* <Button containerStyle={{ marginTop: responsiveSize(183) }}>
        <Text>Contact Support</Text>
      </Button> */}
      </ScrollView>
    </View>
  )
}

export { PasswordResetScreen }
