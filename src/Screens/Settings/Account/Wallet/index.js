import React, { useCallback, useState } from 'react'
import { Text, View, ScrollView, Image, Platform, Alert } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { rupees, wallet1 } from '@/Assets/Images'
import { Button, Card, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'
import { getKycStatus } from '@/Store/Reducers/Common/KycStatusReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { walletDetailsRequest } from '@/Store/Reducers/subscription'
import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const WalletScreen = props => {
  const dispatch = useDispatch()
  const [walletDetails, setWalletDetails] = useState('')
  const [isKycSubmitted, setKycSubmitted] = useState(false)

  const getWalletDetails = () => {
    // dispatch(setLoadingState(true))
    dispatch(
      walletDetailsRequest(
        response => {
          if (response && response?.code === 200) {
            setWalletDetails(response)
            dispatch(setLoadingState(false))
          }
          dispatch(setLoadingState(false))
        },
        error => {
          console.log('Error in Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  const checkKycStatus = () => {
    dispatch(
      getKycStatus(
        response => {
          console.log(response, 'response from kyc status api from earning  ')
          if (response?.kyc_status) {
            setKycSubmitted(response?.kyc_status)
          }
        },
        error => {
          console.log('error', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }
  useFocusEffect(
    useCallback(() => {
      let isActive = true
      if (isActive) {
        getWalletDetails()
        checkKycStatus()
      }
      return () => {
        isActive = false
      }
    }, []),
  )

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Wallet"
        onPress={() => {
          goBack()
        }}
      />
      <View style={styles.mainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Wallet Balance</Text>
          <Card cardContainerStyle={styles.cardContainerStyle}>
            <Image source={rupees} style={styles.icon} />
            <View style={{ flex: 1, marginLeft: responsiveSize(30) }}>
              <Text style={styles.walletBalance}>
                {walletDetails ? Math.round(walletDetails?.wallet_balance) : 0}
              </Text>
              <Text style={styles.description}>
                Use this coins balance to subscribe to channels. This balance
                cannot be exchanged for real money.
              </Text>
            </View>
          </Card>
          <Text style={styles.heading}>Total Earnings</Text>
          <Card cardContainerStyle={styles.cardContainerStyle}>
            <Image
              source={wallet1}
              style={{ tintColor: Colors.primary, ...styles.icon }}
            />
            <View style={{ flex: 1, marginLeft: responsiveSize(30) }}>
              <Text style={styles.walletBalance}>
                {walletDetails ? walletDetails?.total_earning : 0}
              </Text>
              <Text style={styles.description}>
                {Platform.OS === 'ios'
                  ? "This is your available monetary balance that you've earned from your content. This can be withdrawn to your verified bank account."
                  : 'This is a cumulative total of your lifetime earnings on Preaseasoned as a content creator'}
              </Text>
            </View>
          </Card>
          <Button
            containerStyle={styles.addCoinsBtn}
            onPress={() => {
              setTimeout(() => {
                Alert.alert(
                  'In case of failure, please contact support at preseasoned@altletics.com',
                  '',
                )
              }, 1000)
              navigationRef.navigate(ROUTES.ADD_COINS)
            }}
          >
            <Text style={styles.buttonText}>Add Coins to Wallet</Text>
          </Button>
          <Button
            containerStyle={{
              marginTop: responsiveSize(20),
              ...styles.addCoinsBtn,
            }}
            onPress={() => {
              if (isKycSubmitted) {
                navigationRef.navigate(ROUTES.WITHDRAWEARNINGS, {
                  lastScreen: ROUTES.WALLET_SCREEN,
                  walletBal: walletDetails?.total_earning,
                })
              } else {
                navigationRef.navigate(ROUTES.KYC_CONFRMATION, {
                  lastScreen: ROUTES.WALLET_SCREEN,
                })
              }
            }}
          >
            <Text style={styles.buttonText}>Withdraw Earnings</Text>
          </Button>
          <Text style={styles.note}>
            Please Note: KYC must be done to withdraw money
          </Text>
        </ScrollView>
      </View>
    </View>
  )
}
export { WalletScreen }
