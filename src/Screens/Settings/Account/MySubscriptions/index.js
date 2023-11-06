import React, { useState, useRef } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { useDispatch } from 'react-redux'

import { Button, Header, Input } from '@/Components'
import { goBack, navigateAndSimpleReset } from '@/Navigators/utils'

import { styles } from './styles'

const MySubscriptionScreen = props => {
  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="My Subscriptions"
        onPress={() => {
          goBack()
        }}
      />
    </View>
  )
}

export { MySubscriptionScreen }
