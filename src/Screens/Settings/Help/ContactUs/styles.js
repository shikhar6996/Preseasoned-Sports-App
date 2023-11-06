import { StyleSheet } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  mainView: {
    paddingHorizontal: responsiveSize(40),
    marginTop: responsiveSize(20),
  },
  count: {
    fontSize: respFontSize(13),
    fontFamily: Fonts.GilroyMedium,
    alignSelf: 'flex-end',
    color: Colors.silver,
    marginTop: responsiveSize(10),
  },
  displayNameText: {
    alignSelf: 'center',
    fontSize: respFontSize(16),
    marginBottom: responsiveSize(14),
    marginTop: responsiveSize(30),
    color: Colors.silver,
    fontFamily: Fonts.GilroyBold,
  },
  CreateChannelBtn: {
    marginTop: responsiveSize(30),
  },
  fillAllFieldsText: {
    color: Colors.red,
    fontSize: responsiveSize(17),
    fontFamily: Fonts.Gilroy,
    textAlign: 'center',
    marginTop: responsiveSize(30),
  },
  successMessage: {
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyBold,
    fontSize: responsiveSize(20),
    color: Colors.silver,
  },
  message: {
    marginTop: responsiveSize(15),
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(45),
    color: Colors.white,
    textAlign: 'center',
  },
  checkIcon: {
    height: responsiveSize(69),
    width: responsiveSize(69),
    marginBottom: responsiveSize(10),
  },
  buttonText: {
    color: Colors.white,
    fontSize: responsiveSize(19),
    fontFamily: Fonts.GilroyBold,
    lineHeight: 20,
  },
})
