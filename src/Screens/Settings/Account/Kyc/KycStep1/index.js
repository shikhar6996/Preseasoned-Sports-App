import React, { useState, useEffect } from 'react'
import { Alert, Text, View } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'

import { checkmark } from '@/Assets/Images'
import { Button, Header, Input } from '@/Components'
import { ALPHANUMERIC_REGEX, ONLYNUMERIC_REGEX, ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'
import {
  bankStatementRequest,
  panCardReducer,
} from '@/Store/Reducers/Common/kycReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { postKycVerfiyStatus } from '@/Store/Reducers/Common/postKycStatusReducer'
import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const KycStep1 = props => {
  const { params } = props?.route || {}

  const dispatch = useDispatch()
  const [panNumber, setPanNumber] = useState('')
  const [bankStatementNum, setbankStatementNum] = useState('')
  const [ifscCode, setIfscCode] = useState('')

  const [isKycStatus, setKycStatus] = useState()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')

  const [panFields, setPanFields] = useState({
    panNum: null,
    panError: '',
  })

  const [bankFields, setBankFields] = useState({
    bankAccNum: null,
    ifscCode: null,
    ifscError: '',
    bankAccError: '',
  })

  useEffect(() => {
    if (
      bankFields.bankAccNum &&
      bankFields.ifscCode &&
      panFields.panNum &&
      isKycStatus
    ) {
      setPanFields({
        panError: '',
        panNum: null,
      })
      setBankFields({
        bankAccNum: null,
        ifscCode: null,
        ifscError: '',
        bankAccError: '',
      })
      setIfscCode('')
      setPanNumber('')
      setbankStatementNum('')
      setPhoneNumber('')
      setAddress('')

      // navigationRef.navigate(ROUTES.KYC_VERIFIED_SCREEN, {
      //   panNum: panNumber,
      //   bankAcc: bankStatementNum,
      //   ifsc: ifscCode,
      //   lastScreen: params?.lastScreen || '',
      //   address: address,
      //   phoneNumber: phoneNumber,
      // })
    }
  }, [bankFields, panFields])

  const validatePanNumber = value => {
    if (value === '') return true
    if (!ALPHANUMERIC_REGEX.test(value)) {
      return false
    }
    return true
  }

  const validateBankAccountNumber = accNum => {
    if (accNum === '') return true
    if (!accNum.match(ONLYNUMERIC_REGEX)) {
      return false
    }
    return true
  }

  const validatePhoneNumber = phoneNum => {
    if (phoneNum === '') return true
    if (!phoneNum.match(ONLYNUMERIC_REGEX)) {
      return false
    }
    return true
  }

  const validateIfscCode = code => {
    if (code === '') return true
    //  on back press

    if (!ALPHANUMERIC_REGEX.test(code)) {
      return false
    }
    return true
  }

  const addBeneficiaryNow = () => {
    const postKycStatusVerify = new FormData()

    postKycStatusVerify.append('kyc_status', true)
    postKycStatusVerify.append('phone', phoneNumber)
    postKycStatusVerify.append('ifsc', ifscCode)
    postKycStatusVerify.append('address1', 'address')
    postKycStatusVerify.append('bank_account', bankStatementNum)

    dispatch(
      postKycVerfiyStatus(
        postKycStatusVerify,
        response => {
          if (response && response?.code === 200) {
            setKycStatus(
              navigationRef.navigate(ROUTES.KYC_VERIFIED_SCREEN, {
                panNum: panNumber,
                bankAcc: bankStatementNum,
                ifsc: ifscCode,
                lastScreen: params?.lastScreen || '',
                address,
                phoneNumber,
              }),
            )
          } else {
            dispatch(setLoadingState(false))
            Alert.alert(response?.beneficiaries)
          }
        },
        error => {
          console.log('error', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  const verifyBankAccountNow = () => {
    const obj2 = bankFields

    dispatch(setLoadingState(true))

    setBankFields({
      bankAccNum: null,
      ifscCode: null,
      ifscError: '',
      bankAccError: '',
    })

    dispatch(
      bankStatementRequest(
        { bankStatementNum, ifscCode },
        response => {
          if (response.response.accountStatus === 'VALID') {
            obj2.ifscCode = true
            obj2.bankAccNum = true

            addBeneficiaryNow()
          } else if (response.response.accountStatusCode.includes('IFSC')) {
            obj2.ifscCode = false
            obj2.ifscError = response.response.message
          } else {
            obj2.bankAccNum = false
            obj2.bankAccError = response.response.message
          }
          setBankFields({ ...bankFields, ...obj2 })

          dispatch(setLoadingState(false))

          console.log(response, 'response from bank statement number ')
        },
        error => {
          obj2.bankAccNum = false
          obj2.ifscCode = false
          obj2.bankAccError = 'Something went wrong!'
          obj2.ifscError = 'Something went wrong!'
          setBankFields({ ...bankFields, ...obj2 })
          dispatch(setLoadingState(false))
          console.log(error, 'error in Api bank statement number  ')
        },
      ),
    )
  }

  const onSubmitPress = () => {
    const obj = panFields
    const panCardFormData = new FormData()
    panCardFormData.append('pan_number', panNumber)

    dispatch(setLoadingState(true))

    setPanFields({
      panError: '',
      panNum: null,
    })

    dispatch(
      panCardReducer(
        panCardFormData,
        response => {
          if (response.response.valid) {
            obj.panNum = true

            verifyBankAccountNow()
          } else {
            obj.panNum = false
            obj.panError = response.response.message

            dispatch(setLoadingState(false))
          }

          setPanFields({ ...panFields, ...obj })
        },
        error => {
          // dispatch(setLoadingState(false))

          obj.panNum = false
          obj.panError = 'Something went wrong!'
          setPanFields({ ...panFields, ...obj })
        },
      ),
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="KYC"
        onPress={() => {
          goBack()
        }}
      />
      <KeyboardAwareScrollView style={styles.mainView}>
        <View style={styles.KycInputsWrapper}>
          <View style={styles.componentView}>
            <Text style={styles.commonTextInputTitle}>
              Please enter your PAN number
            </Text>
            <Input
              autoCapitalize="characters"
              hasIcon={!!panFields.panNum}
              iconSource={checkmark}
              inputStyle={styles.commonTextInputStyles}
              maxLength={10}
              returnKeyType="next"
              value={panNumber}
              onChangeText={value => {
                if (validatePanNumber(value)) setPanNumber(value)
              }}
            />
            {panFields.panNum === false && (
              <Text style={styles.errMsgText}>{panFields?.panError || ''}</Text>
            )}
          </View>
          <View style={styles.componentView}>
            <Text style={styles.commonTextInputTitle}>
              Please enter your Bank Account number
            </Text>
            <Input
              hasIcon={!!bankFields.bankAccNum}
              iconSource={checkmark}
              inputStyle={styles.commonTextInputStyles}
              keyboardType="number-pad"
              maxLength={16}
              returnKeyType="next"
              value={bankStatementNum}
              onChangeText={value => {
                if (validateBankAccountNumber(value)) setbankStatementNum(value)
              }}
            />
            {bankFields.bankAccNum === false && (
              <Text style={styles.errMsgText}>
                {bankFields?.bankAccError || ''}
              </Text>
            )}
          </View>
          <View style={styles.componentView}>
            <Text style={styles.commonTextInputTitle}>
              Please enter IFSC Code
            </Text>
            <Input
              autoCapitalize="characters"
              hasIcon={!!bankFields.ifscCode}
              iconSource={checkmark}
              inputStyle={styles.commonTextInputStyles}
              maxLength={11}
              returnKeyType="next"
              value={ifscCode}
              onChangeText={value => {
                if (validateIfscCode(value)) setIfscCode(value)
              }}
            />

            {bankFields.ifscCode === false && (
              <Text style={styles.errMsgText}>
                {bankFields?.ifscError || ''}
              </Text>
            )}
          </View>

          <View style={styles.componentView}>
            <Text style={styles.commonTextInputTitle}>
              Please enter your Phone Number
            </Text>
            <Input
              // hasIcon={!!phoneNumber}
              iconSource={checkmark}
              inputStyle={styles.commonTextInputStyles}
              keyboardType="number-pad"
              maxLength={10}
              returnKeyType="next"
              value={phoneNumber}
              onChangeText={value => {
                if (validatePhoneNumber(value)) setPhoneNumber(value)
              }}
            />

            {phoneNumber.length < 0 && (
              <Text style={styles.errMsgText}>This field cannot be empty</Text>
            )}
          </View>

          {/* <View style={styles.componentView}>
            <Text style={styles.commonTextInputTitle}>
              Please enter your Home Address
            </Text>

            <Input
              // hasIcon={!!address}
              iconSource={checkmark}
              inputStyle={styles.commonTextInputStyles}
              maxLength={300}
              returnKeyType="next"
              value={address}
              onChangeText={value => {
                setAddress(value)
              }}
            />
            {address.length < 0 && (
              <Text style={styles.errMsgText}>This field cannot be empty</Text>
            )}
          </View> */}
          <Button
            containerStyle={{
              backgroundColor:
                panNumber.length === 10 &&
                bankStatementNum.length > 0 &&
                ifscCode.length === 11 &&
                phoneNumber.length === 10 /* && 
                address.length > 0 */
                  ? Colors.primary
                  : Colors.darkLiver,
              marginTop: responsiveSize(100),
            }}
            isButtonDisabled={
              !(
                (
                  panNumber.length === 10 &&
                  ifscCode.length === 11 &&
                  phoneNumber.length === 10
                ) /* &&
                address.length > 0*/
              )
            }
            onPress={onSubmitPress}
          >
            <Text style={styles.submitKycText}>Submit KYC</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { KycStep1 }
