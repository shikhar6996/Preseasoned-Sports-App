import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  textStyleDefault: {
    color: Colors.white,
    fontSize: responsiveSize(19),
    fontFamily: Fonts.GilroyBold,
    lineHeight: 20,
  },
  container: {
    backgroundColor: Colors.darkLiver,
    width: '100%',
    borderRadius: responsiveSize(12),
    paddingVertical: responsiveSize(18),
    marginTop: responsiveSize(85),
    alignItems: 'center',
    justifyContent: 'center',
  },
})
