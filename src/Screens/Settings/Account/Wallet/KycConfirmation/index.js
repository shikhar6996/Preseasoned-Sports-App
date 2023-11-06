/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Text, View } from 'react-native'

import { Button, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'

import { styles } from './styles'

const KycConfirmationScreen = props => (
  <View style={styles.mainContainer}>
    <Header
      hasBackButton
      title="Withdraw"
      onPress={() => navigationRef.navigate(ROUTES.WALLET_SCREEN)}
    />
    <View style={styles.mainView}>
      <View style={styles.displayMessageView}>
        <Text style={styles.message}>
          To start withdrawing your earnings, you need to complete your KYC
          form.
        </Text>
      </View>
      <Button
        containerStyle={styles.buttonStyle}
        onPress={() => {
          navigationRef.navigate(ROUTES.KYC_STEP1, {
            lastScreen: ROUTES.WALLET_SCREEN,
          })
        }}
      >
        <Text style={styles.buttonText}>Complete KYC</Text>
      </Button>
      <Button
        containerStyle={styles.buttonStyle}
        onPress={() => {
          navigationRef.navigate(ROUTES.WALLET_SCREEN)
        }}
      >
        <Text style={styles.buttonText}>Back to Wallet</Text>
      </Button>
    </View>
  </View>
)

export { KycConfirmationScreen }
