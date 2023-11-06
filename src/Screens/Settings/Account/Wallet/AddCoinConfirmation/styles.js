import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  successView: {
    marginHorizontal: responsiveSize(40),
    flex: 1,
    marginTop: responsiveSize(300),
  },
  icon: {
    height: responsiveSize(70),
    width: responsiveSize(70),
    alignSelf: 'center',
  },
  message: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    fontSize: respFontSize(19),
    lineHeight: responsiveSize(36),
    textAlign: 'center',
    marginVertical: responsiveSize(20),
  },
  failureView: {
    marginHorizontal: responsiveSize(40),
    flex: 1,
    marginTop: responsiveSize(250),
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    marginTop: responsiveSize(25),
  },
  buttonText: {
    color: Colors.white,
    fontSize: responsiveSize(19),
    fontFamily: Fonts.GilroyBold,
    lineHeight: 20,
  },
})
