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
  enterOtpView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveSize(108),
  },
  enterOtpText: {
    color: Colors.silver,
    fontSize: respFontSize(16),
    fontFamily: Fonts.GilroyBold,
  },
  buttonWrapper: {
    marginTop: responsiveSize(28),
  },
  smoothPinCodeInputView: { alignSelf: 'center' },
  confirmButton: { marginTop: responsiveSize(28) },
  confirmOtpText: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    lineHeight: 20,
  },
  resendLinkText: {
    marginTop: responsiveSize(21),
    alignSelf: 'center',
    color: Colors.carmine,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
  },
  cellStyle: {
    borderRadius: responsiveSize(10),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
})
