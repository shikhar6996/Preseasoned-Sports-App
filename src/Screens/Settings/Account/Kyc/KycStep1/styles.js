import { StyleSheet } from 'react-native'

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
  KycInputsWrapper: { paddingBottom: responsiveSize(20) },
  componentView: { marginTop: responsiveSize(40) },

  commonTextInputTitle: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    fontSize: respFontSize(15),
    marginBottom: responsiveSize(10),
    alignSelf: 'center',
  },

  uploadPanNumber: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    fontSize: respFontSize(14),
    alignSelf: 'center',
  },

  imgStyles: {
    height: responsiveSize(38),
    width: responsiveSize(38),
    marginBottom: responsiveSize(10),
  },
  noteText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    alignSelf: 'center',
  },
  errMsgText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.red,
    alignSelf: 'center',
  },
  submitKycText: {
    color: Colors.white,
    fontSize: responsiveSize(19),
    fontFamily: Fonts.GilroyBold,
    lineHeight: 20,
  },
  commonTextInputStyles: { textAlign: 'center' },
})
