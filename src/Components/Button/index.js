/* eslint-disable react/prop-types */
import React from 'react'
import { Text, Pressable } from 'react-native'

import { styles } from './style'

const Button = ({
  textStyle,
  containerStyle,
  onPress,
  isButtonDisabled = false,
  ...props
}) => (
  <Pressable
    disabled={isButtonDisabled}
    style={[styles.container, containerStyle || {}]}
    onPress={onPress}
  >
    {/*  <Text style={[styles.textStyleDefault, textStyle || {}]} {...props} >{props.value}</> */}
    {props.children}
  </Pressable>
)

export { Button }
