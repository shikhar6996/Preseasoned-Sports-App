import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: { marginHorizontal: responsiveSize(45) },
  passwordResetView: { marginTop: responsiveSize(60) },
  passwordResetText: {
    color: Colors.white,
    fontSize: respFontSize(45),
    fontFamily: Fonts.GilroyBold,
  },
  enterNewPassText: {
    alignSelf: 'center',
    color: Colors.silver,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    marginBottom: responsiveSize(3),
  },
  confirmPassText: {
    marginTop: responsiveSize(50),
    marginBottom: responsiveSize(3),
    alignSelf: 'center',
    color: Colors.silver,

    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
  },
  buttonWrapper: {
    marginTop: responsiveSize(63),
  },
  resetPasswordText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    fontSize: responsiveSize(19),
    lineHeight: 20,
  },
  fillAllFieldsText: {
    color: Colors.red,
    fontSize: responsiveSize(17),
    fontFamily: Fonts.Gilroy,
    textAlign: 'center',
    marginTop: responsiveSize(30),
  },
  descriptionText: {
    marginLeft: responsiveSize(20),
    marginTop: responsiveSize(8),
    color: Colors.silver,
    fontSize: respFontSize(12),
    fontFamily: Fonts.GilroyMedium,
    width: '90%',
  },
})
