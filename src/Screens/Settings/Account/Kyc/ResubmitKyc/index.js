import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Button, Card, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'

import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const ResubmitKyc = () => (
  <View style={styles.mainContainer}>
    <Header
      hasBackButton
      title="KYC"
      onPress={() => navigationRef.navigate(ROUTES.ACCOUNT_SCREEN)}
    />
    <ScrollView contentContainerStyle={styles.mainView}>
      <View style={styles.displayMessageView}>
        <Text style={styles.messageText}>
          Sorry we were not {'\n'}able to verify your KYC details due to an
          error{'\n'} in either your PAN number {'\n'}or Bank Details.{'\n\n'}{' '}
          Please Re-submit your details or contact us for more support
        </Text>
      </View>
      <Button
        containerStyle={{ backgroundColor: Colors.primary }}
        onPress={() => {
          navigationRef.navigate(ROUTES.KYC_STEP1)
        }}
      >
        <Text style={styles.buttonText}>Re-submit KYC</Text>
      </Button>
      <Button
        containerStyle={{
          backgroundColor: Colors.primary,
          marginTop: responsiveSize(20),
        }}
        onPress={() => {
          navigationRef.navigate(ROUTES.HELP_SCREEN)
        }}
      >
        <Text style={styles.buttonText}>Contact Us</Text>
      </Button>
    </ScrollView>
  </View>
)

export { ResubmitKyc }
