/* eslint-disable react/prop-types */
import React from 'react'
import { Image, Text, View, Pressable } from 'react-native'

import PropTypes from 'prop-types'

import { HeaderBackArrow } from '@/Assets/Images'

import { responsiveSize } from '@/Utils'

import Divider from '../Divider'
import { styles } from './styles'

export const Header = ({
  title,
  hasBackButton,
  onPress,
  hasRightIcon,
  rightIcon,
  onIconPress,
}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContainerForTitle}>
      <Text style={styles.heading}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          width: '100%',
          paddingHorizontal: responsiveSize(50),
        }}
      >
        {hasBackButton && (
          <Pressable hitSlop={20} onPress={onPress}>
            <Image
              source={HeaderBackArrow}
              style={{
                height: responsiveSize(28),
                width: responsiveSize(28),
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        )}

        {hasRightIcon && (
          <Pressable onPress={onIconPress}>
            <Image
              source={rightIcon}
              style={{
                height: responsiveSize(30),
                width: responsiveSize(30),
                resizeMode: 'contain',
                // tintColor: Colors.white,
              }}
            />
          </Pressable>
        )}
      </View>
    </View>

    <Divider />
  </View>
)

Header.defaultProps = {
  title: 'Welcome',
  hasBackButton: false,
}
Header.propTypes = {
  title: PropTypes.string,
  hasBackButton: PropTypes.bool,
}
