import { StyleSheet, Platform } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    paddingHorizontal: responsiveSize(50),
    flex: 1,
  },
  greetingView: {
    marginTop: responsiveSize(64),
    alignSelf: 'center',
    width: responsiveSize(324),
    height: responsiveSize(88),
    backgroundColor: Colors.lightBlack,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: responsiveSize(12),
  },
  greetingText: {
    paddingHorizontal: responsiveSize(55),
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(13),
  },
  congratsText: {
    paddingTop: responsiveSize(5),
    alignSelf: 'center',
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(13),
  },
  componentView: { marginTop: responsiveSize(44) },
  enterPanNumberText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.primary,
    fontSize: respFontSize(15),
    marginBottom: responsiveSize(10),
    alignSelf: 'center',
  },

  noteText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    alignSelf: 'center',
    paddingHorizontal: responsiveSize(20),
    textAlign: 'center',
  },

  viewStyle: {
    color: Colors.white,
    fontSize: responsiveSize(20),
    fontFamily: Fonts.GilroyMedium,
    flex: 1,
    textAlignVertical: 'top',
    lineHeight:
      Platform.OS === 'android' ? responsiveSize(24) : responsiveSize(20),
    paddingVertical: 0,
    marginTop: Platform.OS === 'android' ? 6 : 0,
  },
  container: {
    width: '100%',
    borderRadius: responsiveSize(12),
    borderColor: Colors.primary,
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(12),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: responsiveSize(25),
    width: responsiveSize(25),
    resizeMode: 'contain',
  },
  iconContainer: {},
  sectionValueText: {
    alignSelf: 'center',
    width: '90%',
    textAlign: 'center',
    color: Colors.white,
  },
})
