import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginHorizontal: responsiveSize(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  parentView: { alignItems: 'center', justifyContent: 'center' },
  backToWalletText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    lineHeight: 20,
  },
  processedText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(20),
    color: Colors.silver,
  },
})
