import { StyleSheet } from 'react-native'

import { Colors, Fonts, respFontSize, responsiveSize } from '@/Utils'

export const styles = StyleSheet.create({
  newThreadview: {
    backgroundColor: Colors.primary,
    borderRadius: responsiveSize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  threadView: {
    marginRight: responsiveSize(10),
    height: responsiveSize(20),
    alignSelf: 'flex-end',
    bottom: responsiveSize(5),
  },
  newThreadText: {
    color: Colors.white,
    alignSelf: 'center',
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(7),
    paddingVertical: responsiveSize(5),
    paddingHorizontal: responsiveSize(10),
  },
  parentView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  profileView: {
    backgroundColor: Colors.white,
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
  sectionView: {
    alignItems: 'center',
    marginHorizontal: responsiveSize(10),
  },
  sectionText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(14),
    marginTop: respFontSize(6),
  },
  followerCountText: {
    paddingTop: responsiveSize(4),
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
  },
  userNameText: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    paddingTop: respFontSize(4),
  },
  followView: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: responsiveSize(7),
    lineHeight: responsiveSize(20),
  },
})
