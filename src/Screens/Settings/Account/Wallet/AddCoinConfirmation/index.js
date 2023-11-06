/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Text, View, Image } from 'react-native'

import { redCross, rightCheck } from '@/Assets/Images'
import { Button, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'

import { styles } from './styles'

const ConfirmationScreen = props => {
  const { paymentSuccess } = props.route.params ?? {}
  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Wallet"
        onPress={() => navigationRef.navigate(ROUTES.WALLET_SCREEN)}
      />
      {paymentSuccess && (
        <View style={styles.successView}>
          <Image
            defaultSource={rightCheck}
            source={rightCheck}
            style={styles.icon}
          />
          <Text style={styles.message}>
            Coins successfully added to {'\n'} Wallet!
          </Text>
          <Button
            containerStyle={styles.buttonStyle}
            onPress={() => {
              navigationRef.navigate(ROUTES.WALLET_SCREEN)
            }}
          >
            <Text style={styles.buttonText}>Back to Wallet</Text>
          </Button>
        </View>
      )}
      {!paymentSuccess && (
        <View style={styles.failureView}>
          <Image
            defaultSource={redCross}
            source={redCross}
            style={styles.icon}
          />
          <Text style={styles.message}>
            Sorry, we weren't able to add coins {'\n'} to your wallet at this
            time
          </Text>
          <Button
            containerStyle={styles.buttonStyle}
            onPress={() => {
              navigationRef.navigate(ROUTES.WALLET_SCREEN)
            }}
          >
            <Text style={styles.buttonText}>Back to Wallet</Text>
          </Button>
          <Button
            containerStyle={styles.buttonStyle}
            onPress={() => {
              navigationRef.navigate(ROUTES.CONTACT_US_SCREEN)
            }}
          >
            <Text style={styles.buttonText}>Contact Support</Text>
          </Button>
        </View>
      )}
    </View>
  )
}

export { ConfirmationScreen }
