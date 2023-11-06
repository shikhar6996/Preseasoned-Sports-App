import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

import { rightCheck } from '@/Assets/Images'
import { Button, Header } from '@/Components'

import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'
import { Colors } from '@/Utils'

import { styles } from './styles'

const ResetDone = () => (
  <View style={styles.mainContainer}>
    <Header title="Reset done" />
    <ScrollView
      bounces={false}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      style={styles.mainView}
    >
      <Image source={rightCheck} />
      <Text style={styles.message}>Password changed</Text>
      <Text style={{ ...styles.message, marginTop: 0 }}>successfully</Text>
      <Button
        containerStyle={{ backgroundColor: Colors.primary }}
        onPress={() => {
          navigationRef.navigate(ROUTES.LOGINSCREEN)
        }}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </Button>
    </ScrollView>
  </View>
)

export { ResetDone }
