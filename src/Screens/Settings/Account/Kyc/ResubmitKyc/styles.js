import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    paddingHorizontal: responsiveSize(50),
    paddingBottom: responsiveSize(70),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    lineHeight: responsiveSize(30),
    textAlign: 'center',
  },
  displayMessageView: {
    backgroundColor: Colors.lightBlack,
    height: responsiveSize(400),
    width: responsiveSize(320),
    borderRadius: responsiveSize(12),
    paddingHorizontal: responsiveSize(25),
    paddingVertical: responsiveSize(40),
  },
  buttonText: {
    color: Colors.white,
    fontSize: responsiveSize(19),
    fontFamily: Fonts.GilroyBold,
    lineHeight: 20,
  },
})
