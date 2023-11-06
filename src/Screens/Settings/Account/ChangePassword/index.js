import React, { useState, useRef } from 'react'
import { Text, View, Alert, Modal, Pressable } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'

import { eye, eyeWithSlash } from '@/Assets/Images'
import { Button, Header, Input } from '@/Components'
import { PASSWORD_REGEX, ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { changePasswordApi } from '@/Services/modules/user/changePassword'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'
import { TextConstants } from '@/Utils/textConstants'

import { styles } from './styles'

const ChangePassword = () => {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [isOldPassVisible, setIsOldPassVisible] = useState(false)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const oldPassRef = useRef()
  const PasswordRef = useRef()
  const confirmPasswordInputRef = useRef()

  const [user, setUser] = useState({
    oldPassword: { value: '', isInvalid: false },
    password: { value: '', isInvalid: false },
    confirmPassword: { value: '', isInvalid: false },
  })
  const { token } = useSelector(state => state.UserReducer.userData)

  const dispatch = useDispatch()

  const validateOldPassword = () => {
    if (!PASSWORD_REGEX.test(user.oldPassword.value)) {
      return false
    }
    return true
  }
  const validateNewPassword = () => {
    if (!PASSWORD_REGEX.test(user.password.value)) {
      return false
    }
    return true
  }

  const validateConfirmPassword = () => {
    if (user.password.value !== user.confirmPassword.value) {
      return false
    }
    return true
  }
  const validateFields = () => {
    if (!validateOldPassword()) {
      return false
    }
    if (!validateNewPassword()) {
      return false
    }
    if (!validateConfirmPassword()) {
      return false
    }
    return true
  }
  const validateFieldsErrorMessages = () => {
    if (!validateOldPassword()) {
      setPasswordError('Invalid Old Password')
      return false
    }

    if (!validateNewPassword()) {
      // Alert.alert(
      //   'Invalid Password',
      //   'Password must be atleast 8 characters long and contain atleast one uppercase, one lowercase and one number',
      // )
      setNewPasswordError('Invalid Password')
      return false
    }
    if (!validateConfirmPassword()) {
      // Alert.alert('Invalid Confirm Password', 'Passwords do not match')
      setConfirmPasswordError('Invalid Confirm Password')
      return false
    }
    return true
  }

  const handleResetPassword = async () => {
    if (!token) {
      return
    }
    if (!validateConfirmPassword()) {
      dispatch(setLoadingState(false))
      return
    }

    const formData = new FormData()
    formData.append('old_password', user.oldPassword.value)
    formData.append('new_password', user.password.value)
    try {
      const response = await changePasswordApi(formData, token)
      dispatch(setLoadingState(false))
      if (response && response.code === 200) {
        setIsModalVisible(true)
      } else {
        Alert.alert(response?.message)
      }
    } catch (error) {
      dispatch(setLoadingState(false))
      console.log('Error', error)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Change Password"
        onPress={() => {
          goBack()
        }}
      />

      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.mainView}
        showsVerticalScrollIndicator={false}
      >
        {console.log('ValidatePassword', validateFields())}
        <View style={styles.buttonWrapper}>
          <View>
            <Text style={styles.enterNewPassText}>Enter old password</Text>
            <Input
              hasIcon
              iconPressDisabled={false}
              iconSource={!isOldPassVisible ? eyeWithSlash : eye}
              refs={oldPassRef}
              returnKeyLabel="next"
              returnKeyType="next"
              secureTextEntry={!isOldPassVisible}
              textContentType="password"
              value={user.oldPassword.value}
              onChangeText={text =>
                setUser(currentState => ({
                  ...currentState,
                  oldPassword: { ...currentState.oldPassword, value: text },
                }))
              }
              onFocus={() => {
                setPasswordError('')
              }}
              onIconPress={() => setIsOldPassVisible(!isOldPassVisible)}
              onSubmitEditing={() => PasswordRef.current?.focus()}
            />

            {passwordError !== '' && (
              <Text style={styles.errMsgText}>{passwordError}</Text>
            )}
          </View>
          <View style={styles.confirmPassView}>
            <Text style={styles.enterNewPassText}>Enter new password</Text>
            <Input
              hasIcon
              iconPressDisabled={false}
              iconSource={!isPassVisible ? eyeWithSlash : eye}
              refs={PasswordRef}
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
                setNewPasswordError('')
              }}
              onIconPress={() => setIsPassVisible(!isPassVisible)}
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />

            {newPasswordError !== '' && (
              <Text style={styles.errMsgText}>{newPasswordError}</Text>
            )}
          </View>
          <View style={styles.confirmPassView}>
            <Text style={styles.confirmPassText}>Confirm new password</Text>
            <Input
              hasIcon
              iconPressDisabled={false}
              iconSource={!isConfirmPassVisible ? eyeWithSlash : eye}
              refs={confirmPasswordInputRef}
              returnKeyLabel="done"
              returnKeyType="done"
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
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />

            {confirmPasswordError !== '' && (
              <Text style={styles.errMsgText}>{confirmPasswordError}</Text>
            )}
          </View>

          <View style={styles.resetBtn}>
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
                  handleResetPassword()
                }
              }}
            >
              <Text style={styles.resetPasswordText}>Reset Password</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.parentModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.passwordChangeText}>
              Password changed successfully
            </Text>
            <Pressable
              style={styles.pressableStyles}
              onPress={() => {
                setIsModalVisible(false)
                navigationRef.navigate(ROUTES.ACCOUNT_SCREEN)
              }}
            >
              <Text style={styles.backToSetText}>Back to Settings</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export { ChangePassword }
