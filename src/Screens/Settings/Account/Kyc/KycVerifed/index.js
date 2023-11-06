import React from 'react'
import { Text, View, Image } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { checkmark } from '@/Assets/Images'
import { Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'

import { styles } from './styles'

const Section = ({ value, title }) => (
  <>
    <Text style={styles.enterPanNumberText}>{title} </Text>
    <View style={styles.container}>
      <Text style={styles.sectionValueText}>{value}</Text>
      <View style={styles.iconContainer}>
        <Image source={checkmark} style={styles.icon} />
      </View>
    </View>
  </>
)

const KycVerifiedScreen = props => {
  const { panNum, ifsc, bankAcc, lastScreen, phoneNumber, address } =
    props?.route?.params

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="KYC"
        onPress={() => {
          if (lastScreen === ROUTES.WALLET_SCREEN) {
            navigationRef.navigate(ROUTES.WALLET_SCREEN)
          } else {
            navigationRef.navigate(ROUTES.ACCOUNT_SCREEN)
          }
        }}
      />
      <KeyboardAwareScrollView style={styles.mainView}>
        <View style={styles.greetingView}>
          <Text style={styles.greetingText}>Congratulations! Your KYC</Text>
          <Text style={styles.congratsText}>application has been approved</Text>
        </View>

        <View style={styles.componentView}>
          <Section title="PAN Number Verified" value={panNum} />
        </View>

        <View style={styles.componentView}>
          <Section title="Bank Account Verified" value={bankAcc} />
        </View>

        <View style={styles.componentView}>
          <Section title="IFSC Code" value={ifsc} />
        </View>

        {/* <View style={styles.componentView}>
          <Section title="Address Verified" value={address} />
        </View> */}

        <View style={styles.componentView}>
          <Section title="Phone Number Verified" value={phoneNumber} />

          <Text style={styles.noteText}>
            Please note : To make any changes please contact us
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export { KycVerifiedScreen }
