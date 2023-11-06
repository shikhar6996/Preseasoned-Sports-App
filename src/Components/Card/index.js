/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, Pressable } from 'react-native'

import { Colors, responsiveSize } from '@/Utils'

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderRadius: responsiveSize(10),
    borderWidth: 1,
  },
})

export const Card = ({ onPress, children, cardContainerStyle = {} }) => (
  <Pressable style={[styles.mainView, cardContainerStyle]} onPress={onPress}>
    {children}
  </Pressable>
)
