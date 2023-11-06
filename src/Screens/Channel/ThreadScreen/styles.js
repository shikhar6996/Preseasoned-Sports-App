import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  itemSeparatorComponent: { height: responsiveSize(26) },
  feedInboxView: {
    marginTop: responsiveSize(-20),
    flexDirection: 'row',
    borderColor: Colors.primary,
  },
  feedView: {
    borderWidth: 1,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: responsiveSize(20),
    borderColor: Colors.primary,
  },
  feedText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    color: Colors.white,
  },

  arrowRightTouchStyles: { alignSelf: 'center' },
  arrowRight: { height: responsiveSize(15), width: responsiveSize(20) },
  keyboardContentContainerStyle: { flex: 1 },
})
