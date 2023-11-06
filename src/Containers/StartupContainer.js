import React from 'react'
import { View, Text } from 'react-native'

import { useTheme } from '@/Hooks'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Text style={Fonts.textCenter}>Welcome</Text>
    </View>
  )
}

export default StartupContainer
