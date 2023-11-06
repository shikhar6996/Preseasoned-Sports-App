import React from 'react'
import { Text, View, Image } from 'react-native'

import { rightCheck } from '@/Assets/Images'
import { Button, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'

import { responsiveSize } from '@/Utils'

import { styles } from './styles'

const EarningRequestProcessed = () => (
  <View style={styles.mainContainer}>
    <Header
      hasBackButton
      title="Withdraw"
      onPress={() => {
        navigationRef.navigate(ROUTES.WALLET_SCREEN)
      }}
    />
    <View style={styles.mainView}>
      <View style={styles.parentView}>
        <Image source={rightCheck} />
        <Text
          style={{ ...styles.processedText, marginTop: responsiveSize(17) }}
        >
          Your request has been
        </Text>
        <Text style={styles.processedText}>processed!</Text>
      </View>
      <Button
        containerStyle={styles.confirmButton}
        onPress={() => {
          navigationRef.navigate(ROUTES.WALLET_SCREEN)
        }}
      >
        <Text style={styles.backToWalletText}>Back To Wallet</Text>
      </Button>
    </View>
  </View>
)

export { EarningRequestProcessed }
