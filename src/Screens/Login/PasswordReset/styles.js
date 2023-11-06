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
  enterEmailView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveSize(108),
  },
  enterEmailText: {
    padding: responsiveSize(2),
    color: Colors.silver,
    fontSize: respFontSize(16),
    fontFamily: Fonts.GilroyBold,
  },
  buttonWrapper: {
    marginTop: responsiveSize(29),
  },
  getLinkButton: { marginTop: responsiveSize(30) },
  getLinkText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    color: Colors.white,
    lineHeight: 20,
  },

  resendLinkText: {
    alignSelf: 'center',
    color: Colors.carmine,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    marginTop: responsiveSize(21),
  },
  // contactSupportText: {
  //   fontSize: respFontSize(17),
  //   fontFamily: Fonts.GilroyMedium,
  // },
  // contactSupportButton: { marginTop: responsiveSize(165) },
  errMsgText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.red,
    marginLeft: responsiveSize(10),
  },
})
