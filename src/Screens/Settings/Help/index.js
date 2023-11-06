import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import { arrowRight, faqEdit, pencil } from '@/Assets/Images'
import { Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { responsiveSize } from '@/Utils'

import { styles } from './styles'

const HelpScreen = () => (
  <View style={styles.parentContainer}>
    <Header hasBackButton title="Help" onPress={goBack} />
    <View
      style={{
        paddingHorizontal: responsiveSize(40),
        marginTop: responsiveSize(30),
      }}
    >
      <Pressable
        style={styles.optionWrapper}
        onPress={() => navigationRef.navigate(ROUTES.FAQ_SCREEN)}
      >
        <View style={styles.optionDescWrapper}>
          <Image source={faqEdit} style={styles.iconPicture} />
          <Text style={styles.title}>FAQs </Text>
        </View>
        <View>
          <Image source={arrowRight} style={styles.arrow} />
        </View>
      </Pressable>

      <Pressable
        style={styles.optionWrapper}
        onPress={() => navigationRef.navigate(ROUTES.CONTACT_US_SCREEN)}
      >
        <View style={styles.optionDescWrapper}>
          <Image source={pencil} style={styles.iconPicture} />
          <Text style={styles.title}>Contact Us </Text>
        </View>
        <View>
          <Image source={arrowRight} style={styles.arrow} />
        </View>
      </Pressable>
    </View>
  </View>
)

export { HelpScreen }
