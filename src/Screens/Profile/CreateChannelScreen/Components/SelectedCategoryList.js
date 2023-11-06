/* eslint-disable react/self-closing-comp */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment } from 'react'
import {
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    marginTop: responsiveSize(15),
    // justifyContent: 'space-around',
  },
  item: {
    height: (width - responsiveSize(90) - responsiveSize(30)) / 3,
    width: (width - responsiveSize(90) - responsiveSize(30)) / 3,
    borderWidth: 1,
    borderColor: Colors.primary,
    margin: responsiveSize(5),
    paddingBottom: 0,
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(10),
  },
  cardText: {
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    lineHeight: respFontSize(18),
    marginVertical: responsiveSize(10),
    textAlign: 'center',
  },
  img: { resizeMode: 'contain', flex: 1, marginTop: responsiveSize(10) },
  closeButton: {
    position: 'absolute',
    right: responsiveSize(6),
    top: responsiveSize(2),
  },
})

// eslint-disable-next-line react/prop-types
const Item = ({ id, title, category_image, isSelected, onPress }) => (
  <View style={[styles.item, { backgroundColor: Colors.secondary }]}>
    <Pressable
      hitSlop={10}
      style={styles.closeButton}
      onPress={() => {
        onPress(id)
      }}
    >
      <Text
        style={{
          color: Colors.silver,
        }}
      >
        X
      </Text>
    </Pressable>
    <Image
      source={{ uri: category_image || '' }}
      style={[
        styles.img,
        {
          tintColor: Colors.silver,
          height: '100%',
          width: '100%',
        },
      ]}
    />
    <Text style={styles.cardText}>{title}</Text>
  </View>
)

export const SelectedCategoryList = ({ items, onPress }) => {
  if (items && Array.isArray(items)) {
    return (
      <View style={styles.container}>
        {items.map(item => {
          if (item.isSelected)
            return <Item key={item.id} onPress={onPress} {...item} />
          return <Fragment key={item.id}></Fragment>
        })}
      </View>
    )
  }
  return <></>
}
