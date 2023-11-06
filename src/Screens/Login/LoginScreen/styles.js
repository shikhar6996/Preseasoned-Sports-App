import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  mainView: { flexDirection: 'column' },
  contentContainerStyle: { marginHorizontal: responsiveSize(40) },
  welcomeView: { marginTop: responsiveSize(50) },
  welcomeText: {
    color: Colors.white,
    fontSize: respFontSize(45),
    fontFamily: Fonts.GilroyBold,
  },
  description: {
    color: Colors.silver,
    fontSize: respFontSize(18),
    fontFamily: Fonts.GilroyBold,
  },
  descriptionView: {
    width: '75%',
    marginTop: responsiveSize(36),
  },
  wrongEmailView: {
    width: '75%',
    marginTop: responsiveSize(36),
  },
  loginText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    color: Colors.white,
    lineHeight: 20,
  },
  wrongEmailText: {
    width: '130%',
    color: Colors.carmine,
    fontSize: respFontSize(16),
    fontFamily: Fonts.Gilroy,
  },
  inputWrapper: { marginTop: responsiveSize(30) },

  textInputTitle: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    marginTop: responsiveSize(30),
    marginBottom: responsiveSize(3),
  },
  passwordText: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    marginTop: responsiveSize(35),
    marginBottom: responsiveSize(3),
  },

  forgotPasswordText: {
    alignSelf: 'center',
    color: Colors.carmine,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    marginTop: responsiveSize(22),
  },
  fillAllFieldsText: {
    color: Colors.red,
    fontSize: responsiveSize(17),
    fontFamily: Fonts.Gilroy,
    textAlign: 'center',
    marginTop: responsiveSize(30),
  },
  errMsgText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.red,
    marginLeft: responsiveSize(10),
  },
})
