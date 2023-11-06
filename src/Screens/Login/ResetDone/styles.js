import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    marginTop: responsiveSize(148),
    marginHorizontal: responsiveSize(38),
  },
  passwordResetText: {
    color: Colors.white,
    fontSize: respFontSize(45),
    fontFamily: Fonts.GilroyMedium,
  },
  successMessage: {
    marginTop: responsiveSize(15),
    fontFamily: Fonts.GilroyBold,
    fontSize: responsiveSize(20),
    color: Colors.silver,
  },
  message: {
    marginTop: responsiveSize(15),
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(45),
    color: Colors.white,
    textAlign: 'center',
  },
  buttonText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    fontSize: responsiveSize(19),
    lineHeight: 20,
  },
})
