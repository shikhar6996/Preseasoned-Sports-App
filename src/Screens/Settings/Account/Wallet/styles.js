import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgb(19 , 19 , 19)',
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginHorizontal: responsiveSize(45),
    paddingBottom: responsiveSize(40),
  },
  heading: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    lineHeight: responsiveSize(40),
    textAlign: 'center',
    marginTop: responsiveSize(40),
  },
  cardContainerStyle: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgb(0 , 0 , 0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: responsiveSize(25),
    paddingVertical: responsiveSize(20),
    marginTop: responsiveSize(10),
  },
  icon: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    resizeMode: 'contain',
  },
  walletBalance: {
    fontSize: respFontSize(40),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.primary,
  },
  description: {
    fontSize: respFontSize(13),
    lineHeight: responsiveSize(18),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
  },
  addCoinsBtn: {
    backgroundColor: Colors.primary,
  },
  note: {
    fontSize: respFontSize(12),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    marginTop: responsiveSize(10),
    textAlign: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: responsiveSize(19),
    lineHeight: 20,
    fontFamily: Fonts.GilroyBold,
  },
})
