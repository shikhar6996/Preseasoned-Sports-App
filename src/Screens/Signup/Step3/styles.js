import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  mainView: { flex: 1, flexDirection: 'column' },
  contentContainerStyle: { marginHorizontal: responsiveSize(45) },
  joinUsView: {
    marginTop: responsiveSize(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinUsText: {
    color: Colors.white,
    fontSize: respFontSize(45),
    fontFamily: Fonts.GilroyBold,
  },
  skipButton: {
    backgroundColor: Colors.darkLiver,
    width: responsiveSize(75),
    height: responsiveSize(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(10),
  },
  skipText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(13),
    // textDecorationLine: 'underline',
  },
  description: {
    color: Colors.silver,
    fontSize: respFontSize(16),
    fontFamily: Fonts.GilroyBold,
  },
  descriptionView: { marginTop: responsiveSize(36) },
  inputWrapper: { marginTop: responsiveSize(30) },

  item: {
    height: responsiveSize(110),
    width: responsiveSize(115),
    borderWidth: 1,
    borderColor: Colors.primary,
    margin: responsiveSize(10),
    paddingBottom: 0,
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveSize(10),
  },
  cardText: {
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    lineHeight: respFontSize(18),
    marginVertical: responsiveSize(10),
    textAlign: 'center',
  },
  img: { resizeMode: 'contain', flex: 1, marginTop: responsiveSize(10) },
  nextBtnText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    fontSize: respFontSize(17),
    lineHeight: 20,
  },
  textInputTitle: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    marginTop: responsiveSize(30),
    marginBottom: responsiveSize(10),
  },
  stepText: { alignSelf: 'center' },
})
