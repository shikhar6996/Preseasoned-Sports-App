/* eslint-disable react/prop-types */
import React from 'react'
import { View, TextInput, Image, Pressable } from 'react-native'

import { Colors } from '@/Utils'

import { styles } from './styles'

const Input = ({
  refs,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  inputStyle,
  iconStyle,
  containerStyle,
  onIconPress,
  iconPressDisabled = true,
  hasIcon = false,
  iconSource = undefined,

  multiline = false,

  ...props
}) => (
  <View style={[styles.container, containerStyle || {}]}>
    <TextInput
      autoCorrect={false}
      placeholder={placeholder}
      ref={refs}
      secureTextEntry={secureTextEntry}
      selectionColor={Colors.white}
      style={[styles.textInputStyle, inputStyle || {}]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      {...props}
    />
    {hasIcon && iconSource && (
      <Pressable
        disabled={iconPressDisabled}
        hitSlop={10}
        style={styles.iconContainer}
        onPress={onIconPress}
      >
        <Image source={iconSource} style={[styles.icon, iconStyle || {}]} />
      </Pressable>
    )}
  </View>
)

export { Input }
