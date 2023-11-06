import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: responsiveSize(30),
  },
  privacyView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: responsiveSize(10),
  },
  privacyText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    fontSize: respFontSize(17),
  },
  TacView: {
    paddingTop: responsiveSize(20),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  tacText: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    fontSize: respFontSize(15),
  },
  backToTopText: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.primary,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  backToTopView: { paddingVertical: responsiveSize(30) },
})
