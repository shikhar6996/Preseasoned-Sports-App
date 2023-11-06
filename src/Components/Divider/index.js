import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Colors, responsiveSize } from '@/Utils'

const styles = StyleSheet.create({
  hr: {
    backgroundColor: Colors.darkSilver,
    height: responsiveSize(1),
    marginVertical: responsiveSize(20),
    // marginTop: responsiveSize(30),
  },
})

const Divider = dividerStyles => (
  <View style={[styles.hr, dividerStyles || {}]} />
)

export default Divider
