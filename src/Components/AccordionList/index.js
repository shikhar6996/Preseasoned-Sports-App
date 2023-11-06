/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
  Pressable,
  Image,
} from 'react-native'

import { arrowRight, cross } from '@/Assets/Images'
import { Colors, Fonts, respFontSize, responsiveSize } from '@/Utils'

const styles = StyleSheet.create({
  arrow: {
    transform: [{ rotate: '90deg' }],
    height: responsiveSize(15),
    width: responsiveSize(22),
  },
  cross: {
    height: responsiveSize(15),
    width: responsiveSize(16),
  },
  faqDescWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqWrapper: {
    borderRadius: responsiveSize(15),
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: responsiveSize(20),
    marginTop: responsiveSize(15),
    flex: 1,
  },
  title: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(14),
    color: Colors.white,
    flex: 1,
    marginRight: responsiveSize(5),
  },
  descriptionText: {
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    color: Colors.white,
    marginTop: responsiveSize(40),
  },
})

const AccordionListItem = ({ title, descriptionText }) => {
  const [open, setOpen] = useState(false)
  const animatedController = useRef(new Animated.Value(0)).current

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  })

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 600,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(animatedController, {
        duration: 600,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start()
    }
    setOpen(!open)
  }

  return (
    <Pressable style={styles.faqWrapper} onPress={toggleListItem}>
      <View style={styles.faqDescWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
          {open ? (
            <Image source={cross} style={styles.cross} />
          ) : (
            <Image source={arrowRight} style={styles.arrow} />
          )}
        </Animated.View>
      </View>
      <View>
        {open ? (
          <Text style={styles.descriptionText}>{descriptionText}</Text>
        ) : null}
      </View>
    </Pressable>
  )
}
export { AccordionListItem }
