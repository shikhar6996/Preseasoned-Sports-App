import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  Modal,
  Pressable,
  Alert,
  Platform,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'

import { rupees } from '@/Assets/Images'
import { Button, Card, Header } from '@/Components'
import { ONLYNUMERIC_REGEX, ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { getBeneficiaryDetails } from '@/Store/Reducers/Common/BeneficiaryDetailsReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { postTransferPayout } from '@/Store/Reducers/Common/transferPayoutReducer'
import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const WithdrawEarnings = props => {
  const [coinValue, setCoinValue] = useState('')
  // const [walletBalance, setWalletBalance] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [beneficiaryDetails, setBeneficiaryDetails] = useState()
  const userData = useSelector(state => state.UserReducer.userData)
  const { username } = userData?.user_profile || {}
  const { walletBal } = props?.route?.params
  const dispatch = useDispatch()

  const tranferPayout = () => {
    const postTransferPayoutAmount = new FormData()
    postTransferPayoutAmount.append('amount', coinValue)
    dispatch(
      postTransferPayout(
        postTransferPayoutAmount,
        response => {
          console.log(response, 'response from tranferPayout')
          if (response?.code === 200) {
            if (response?.response?.status === 'ERROR') {
              Alert.alert(response?.response?.message, '')
            } else {
              navigationRef.navigate(ROUTES.EARNINGREQUESTPROCESSED)
            }
          } else if (response?.code === 400) {
            Alert.alert(response?.message, '')
          }
        },
        error => {
          console.log('error', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  useEffect(() => {
    dispatch(setLoadingState(true))
    dispatch(
      getBeneficiaryDetails(
        username,
        123,
        response => {
          if (response && response.code === 200) {
            dispatch(setLoadingState(false))
            setBeneficiaryDetails(response.response.data)
          } else {
            dispatch(setLoadingState(false))
            Alert.alert(response?.message)
          }
        },
        error => {
          console.log('Error in Api', error)
          Alert.alert('Failed to load Faq')
          dispatch(setLoadingState(false))
        },
      ),
    )
  }, [])
  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Withdraw"
        onPress={() => {
          goBack()
        }}
      />
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardVerticalOffset={responsiveSize(80)}
        style={styles.keyboardContentContainerStyle}
      >
        <View style={styles.mainView}>
          <Card cardContainerStyle={styles.cardContainerStyle}>
            <Text style={styles.walletBalanceText}>
              Total Earnings : {walletBal}
            </Text>
          </Card>

          <Text style={styles.withdrwalAmtText}>
            Please enter withdrawal amount
          </Text>

          <Card cardContainerStyle={styles.containerStyle}>
            <Image source={rupees} style={styles.ruppesIcon} />

            <View style={styles.textInputView}>
              <TextInput
                keyboardType="numeric"
                returnKeyType="default"
                selectionColor={Colors.white}
                style={styles.textInputStyles}
                value={coinValue}
                onChangeText={text => {
                  if (text.match(ONLYNUMERIC_REGEX) || text === '') {
                    setCoinValue(text)
                  }
                }}
                onSubmitEditing={() => { }}
              />
            </View>
          </Card>
          <Text style={styles.note}>
            {
              Platform.OS === 'ios'
                ?
                "The minimum withdrawal amount is INR 100."
                :
                "The minimum withdrawal amount is 5000 coins."
            }
          </Text>
          {Platform.OS === 'android' && <View style={styles.coinDetailView}>
            <Text style={styles.coinDetailText}>1 coin = 0.019 rupee</Text>
          </View>}

          <View style={styles.registerdBankDetailView}>
            <Text style={styles.registerdBankDetailText}>
              Registered Bank Details
            </Text>

            <View style={styles.viewWrapper}>
              {/* <View style={styles.selfCloseView} /> */}
              <View
                style={[
                  styles.bankNameView,
                  { marginLeft: 0, alignItems: 'center' },
                ]}
              >
                <Text style={styles.bankNameText}>ACCOUNT NUMBER</Text>

                <Text style={styles.bankNameText}>
                  {beneficiaryDetails
                    ? // eslint-disable-next-line no-unsafe-optional-chaining
                    '*'.repeat(beneficiaryDetails?.bankAccount?.length - 3) +
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    beneficiaryDetails?.bankAccount?.slice(-3)
                    : '**********'}
                </Text>
              </View>
            </View>
          </View>

          <Button
            containerStyle={{
              backgroundColor: !(
                coinValue?.trim() === '' ||
                walletBal < coinValue ||
                coinValue < (Platform.OS === 'ios' ? 100 : 5000)
              )
                ? Colors.primary
                : Colors.darkLiver,
              marginTop: responsiveSize(50),
            }}
            isButtonDisabled={
              coinValue?.trim() === '' ||
              walletBal < coinValue ||
              coinValue < (Platform.OS === 'ios' ? 100 : 5000)
            }
            onPress={() => {
              setIsModalVisible(true)
            }}
          >
            <Text style={styles.confirmWithdrawAmtText}>
              Confirm Withdrawal Amount
            </Text>
          </Button>
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
            <Text style={styles.confirmationText}>
              Are you sure you want to
            </Text>
            <Text style={styles.confirmationText}>
              {
                Platform.OS === 'ios' ?
                  "withdraw INR " + coinValue + "?"
                  :
                  "withdraw " + coinValue + " coins?"
              }
            </Text>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.pressableStyles}
                onPress={() => {
                  setIsModalVisible(false)
                }}
              >
                <Text style={{ ...styles.buttonText, color: Colors.secondary }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.pressableStyles,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={() => {
                  setIsModalVisible(false)
                  tranferPayout()
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export { WithdrawEarnings }
