import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginHorizontal: responsiveSize(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    fontSize: respFontSize(15),
    lineHeight: responsiveSize(28),
    textAlign: 'center',
  },
  displayMessageView: {
    backgroundColor: Colors.lightBlack,
    height: responsiveSize(170),
    width: responsiveSize(270),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(40),
    paddingHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(25),
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
