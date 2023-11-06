import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  mainView: { flexDirection: 'column' },
  contentContainerStyle: { marginHorizontal: responsiveSize(45) },
  thatsItView: { marginTop: responsiveSize(64) },
  thatsItText: {
    marginTop: responsiveSize(25),
    color: Colors.white,
    fontSize: respFontSize(45),
    fontFamily: Fonts.GilroyBold,
  },
  description: {
    color: Colors.silver,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
  },
  descriptionView: { marginTop: responsiveSize(36) },
  displayNameText: {
    marginTop: responsiveSize(17),
    color: Colors.white,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    textAlign: 'center',
  },
  userNameText: {
    marginTop: responsiveSize(8),
    color: Colors.silver,
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyBold,
    textAlign: 'center',
  },
  parentProfileContainer: {
    marginTop: responsiveSize(43),
  },
  imageView: {
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    alignItems: 'center',
    height: responsiveSize(272),
    width: responsiveSize(237),
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: Colors.primary,
    paddingHorizontal: responsiveSize(10),
  },
  profileImageStyles: {
    justifyContent: 'center',
    borderRadius: responsiveSize(60),
    height: responsiveSize(117),
    width: responsiveSize(116),
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },

  confirmText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    color: Colors.white,
    lineHeight: 20,
  },

  tacText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.darkSilver,
    fontFamily: Fonts.GilroyBold,
    fontSize: responsiveSize(17),
    textAlign: 'center',
  },
  imgView: {
    width: responsiveSize(18),
    height: responsiveSize(18),
    marginRight: responsiveSize(10),
    // marginTop: responsiveSize(5),
  },
  blankRectangleImage: {
    resizeMode: 'contain',
    width: responsiveSize(18),
    height: responsiveSize(18),
  },
  tacWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  tacTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
})
