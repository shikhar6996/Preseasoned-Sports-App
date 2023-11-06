/* eslint-disable camelcase */
/* eslint-disable no-useless-return */
import React, { useRef, useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useDispatch, useSelector } from 'react-redux'

import { rightCheck } from '@/Assets/Images'
import { Button, Header, Input } from '@/Components'
import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { contactUs } from '@/Store/Reducers/Common/ContactUsReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors, responsiveSize } from '@/Utils'

import { TextConstants } from '@/Utils/textConstants'

import { styles } from './styles'

const ContactUsScreen = () => {
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const messageInputRef = useRef(null)
  const userData = useSelector(state => state.UserReducer.userData)
  const { display_name, email } = userData?.user_profile || {}
  const dispatch = useDispatch()

  const validateFields = () => {
    if (message.trim() === '') {
      return false
    }

    return true
  }

  const handleSubmit = () => {
    dispatch(setLoadingState(true))

    const formdata = new FormData()

    formdata.append('name', display_name)
    formdata.append('email', email)
    formdata.append('message', message)

    dispatch(
      contactUs(
        formdata,
        response => {
          if (response && response.code === 200) {
            dispatch(setLoadingState(false))
            setSuccess(true)
          } else {
            dispatch(setLoadingState(false))
            Alert.alert(JSON.stringify(response))
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

  return (
    <View style={styles.parentContainer}>
      <Header hasBackButton title="Contact Us" onPress={goBack} />
      {!success && (
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={{ paddingBottom: responsiveSize(50) }}
          showsVerticalScrollIndicator={false}
          style={styles.mainView}
        >
          <Text style={styles.displayNameText}>Name</Text>
          <Input
            editable={false}
            inputStyle={{ color: Colors.silver }}
            maxLength={20}
            returnKeyType="next"
            value={display_name}
          />
          <Text style={styles.displayNameText}>Email Id</Text>
          <Input
            editable={false}
            inputStyle={{ color: Colors.silver }}
            maxLength={30}
            returnKeyType="next"
            value={email}
          />
          <Text style={styles.displayNameText}>
            Please leave us a message here
          </Text>
          <Input
            multiline
            containerStyle={{
              height: responsiveSize(300),
              paddingVertical: responsiveSize(5),
            }}
            maxLength={300}
            refs={messageInputRef}
            returnKeyType="default"
            value={message}
            onChangeText={text => {
              setMessage(text)
            }}
          />

          <Text style={styles.count}>{message.length}/300</Text>
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
            isButtonDisabled={!validateFields()}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Button>
        </KeyboardAwareScrollView>
      )}

      {success && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: responsiveSize(44),
          }}
        >
          <Image source={rightCheck} style={styles.checkIcon} />
          <Text style={styles.successMessage}>Submitted Successfully</Text>
          <Text style={styles.successMessage}>Thank you for your message!</Text>
          <Text style={styles.successMessage}>We’ll be in touch with</Text>
          <Text style={styles.successMessage}>you shortly.</Text>

          <Button
            containerStyle={{ backgroundColor: Colors.primary }}
            onPress={() => {
              navigationRef.navigate(ROUTES.HELP_SCREEN)
            }}
          >
            <Text style={styles.buttonText}>Back To Settings</Text>
          </Button>
        </View>
      )}
    </View>
  )
}

export { ContactUsScreen }
