/* eslint-disable react/prop-types */
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import { Card } from '@/Components'
import { Colors, Fonts, respFontSize, responsiveSize } from '@/Utils'

const styles = StyleSheet.create({
  cardContainerStyle: {
    width: responsiveSize(188),
    height: responsiveSize(246),
    marginTop: responsiveSize(21),
  },
  profileView: {
    marginTop: responsiveSize(3),
    width: responsiveSize(78),
    height: responsiveSize(78),
    borderRadius: responsiveSize(50),
    overflow: 'hidden',
  },
  userImgStyles: {
    width: responsiveSize(78),
    height: responsiveSize(78),
    borderRadius: responsiveSize(50),
    backgroundColor: Colors.white,
  },
  sectionView: { justifyContent: 'center', alignItems: 'center' },
  channelNameText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    marginTop: respFontSize(22),
    marginHorizontal: responsiveSize(10),
  },
  followerCountText: {
    marginTop: responsiveSize(6),
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
  },
})

export const YourChannels = ({ item, index, onItemPress }) => (
  <Card
    cardContainerStyle={styles.cardContainerStyle}
    onPress={() => onItemPress(item)}
  >
    <View style={styles.profileView}>
      <Image
        resizeMode="contain"
        source={{ uri: item?.profile_image }}
        style={styles.userImgStyles}
      />
    </View>
    <View style={styles.sectionView}>
      <Text numberOfLines={2} style={styles.channelNameText}>
        {item?.channel_name ?? ''}
      </Text>
      <Text style={styles.followerCountText}>
        Followers: {item?.follower_count ?? 0}
      </Text>
    </View>
  </Card>
)
