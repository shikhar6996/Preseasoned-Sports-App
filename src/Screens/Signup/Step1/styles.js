import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },

  mainView: {
    marginHorizontal: responsiveSize(40),
    flex: 1,
  },
  joinUsView: { marginTop: responsiveSize(50) },
  joinUsText: {
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
  inputWrapper: { marginTop: responsiveSize(30) },

  textInputTitle: {
    fontSize: respFontSize(16),
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    marginTop: responsiveSize(30),
    lineHeight: responsiveSize(20),
    marginBottom: responsiveSize(10),
  },
  stepText: { alignSelf: 'center' },
  nextButtonText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    color: Colors.white,
    lineHeight: 20,
  },
  errMsgText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.red,
    marginLeft: responsiveSize(10),
  },
})
