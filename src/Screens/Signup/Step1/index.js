import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'

import { useDispatch } from 'react-redux'

import { Header, Input, Button } from '@/Components'

import { EMAIL_REGEX, ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { getEmailOtp } from '@/Services/modules'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors } from '@/Utils'

import { styles } from './styles'

const Step1 = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const dispatch = useDispatch()

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
  useEffect(() => {
    if (__DEV__) {
      setEmail('deep@getdefault.in')
    }
  }, [])

  const navigateToNextScreen = async () => {
    dispatch(setLoadingState(true))

    try {
      const formData = new FormData()
      formData.append('email', email)

      const response = await getEmailOtp(formData)
      console.log('Response from getEmail', response)
      dispatch(setLoadingState(false))
      if (response && response.code === 200) {
        navigationRef.navigate(ROUTES.VERIFY_EMAIL, {
          email,
        })
      } else {
        Alert.alert(response?.message, '')
      }
    } catch (error) {
      dispatch(setLoadingState(false))
      console.log('Error in sending OTP to email ', error)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Sign Up"
        onPress={() => {
          goBack()
        }}
      />

      <View style={styles.mainView}>
        <View>
          <View style={styles.joinUsView}>
            <Text style={styles.joinUsText}>Join us!</Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.description}>Let’s start with the basics.</Text>
            <Text style={styles.description}>
              Please enter your details below.
            </Text>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.textInputTitle}>Email</Text>
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
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            containerStyle={{
              backgroundColor: validateFields()
                ? Colors.primary
                : Colors.darkLiver,
            }}
            // isButtonDisabled={!validateFields()}
            onPress={() => {
              if (validateEmail()) {
                navigateToNextScreen()
              }
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Button>
          <Text style={[styles.textInputTitle, styles.stepText]}>
            Step 1 of 4
          </Text>
        </View>
      </View>
    </View>
  )
}

export { Step1 }
