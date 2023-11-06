import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    paddingHorizontal: responsiveSize(45),
    backgroundColor: Colors.secondary,
  },
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
    marginBottom: responsiveSize(3),
    alignSelf: 'center',
    color: Colors.silver,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
  },
  buttonWrapper: {
    paddingTop: responsiveSize(55),
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
  },
  confirmPassView: { paddingTop: responsiveSize(70) },
  resetBtn: {
    paddingTop: responsiveSize(55),
  },
  parentModal: {
    borderRadius: responsiveSize(12),
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: responsiveSize(12),
    height: responsiveSize(158),
    width: responsiveSize(386),
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTosettingsView: {
    paddingTop: responsiveSize(26),
  },
  pressableStyles: {
    backgroundColor: Colors.darkSilver,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightBlack,
    width: responsiveSize(179),
    height: responsiveSize(52),
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    marginTop: responsiveSize(20),
  },
  backToSetText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(14),
  },
  passwordChangeText: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
  },
  errMsgText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.red,
    marginLeft: responsiveSize(10),
  },
})
