import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  parentContainer: {
    marginTop: responsiveSize(20),
    paddingHorizontal: responsiveSize(25),
    flex: 1,
  },
  pushNotifyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pushNotifyText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(17),
  },
  descText: {
    paddingTop: responsiveSize(10),
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(15),
    width: '80%',
  },
  inAppView: {
    marginTop: responsiveSize(44),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
