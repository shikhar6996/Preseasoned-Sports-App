import React from 'react'
import { View, Text, Image } from 'react-native'

import { logo } from '@/Assets/Images'

import { Header } from '@/Components'
import { Button } from '@/Components/Button'
import { navigationRef } from '@/Navigators/utils'

import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

export const LandingPage = () => (
  <View style={styles.mainContainer}>
    <Header title="Welcome!" />
    <View style={styles.mainView}>
      <Image source={logo} style={styles.logo} />
      <Text style={[styles.name, { marginBottom: responsiveSize(0) }]}>
        Preseasoned
      </Text>
      {/* <Text style={styles.name}>(beta)</Text> */}
      <Text style={styles.description}>Tune up, tune in</Text>
      <Button
        onPress={() => navigationRef.navigate('Onboarding')}
        containerStyle={{ backgroundColor: Colors.primary }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </Button>
    </View>
  </View>
)
