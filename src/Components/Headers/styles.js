import { StyleSheet } from 'react-native'

import { respFontSize, responsiveSize, Layout, Colors, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
  },
  headerContainerForTitle: {
    marginTop: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    alignSelf: 'center',
    color: Colors.white,
    // marginTop: responsiveSize(10),
  },
})
