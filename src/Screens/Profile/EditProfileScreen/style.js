import { Dimensions, StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

const { width } = Dimensions.get('window')
export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  contentContainerStyle: {
    paddingHorizontal: responsiveSize(40),
    paddingBottom: responsiveSize(40),
  },
  textInputStyles: {
    borderRadius: responsiveSize(10),
    width: '100%',
    backgroundColor: Colors.lightBlack,
    padding: responsiveSize(13),
    fontFamily: Fonts.GilroyBold,
    paddingHorizontal: responsiveSize(20),
    color: Colors.white,
    marginBottom: responsiveSize(20),
    fontSize: respFontSize(16),
  },
  displayNameText: {
    alignSelf: 'center',
    fontSize: respFontSize(16),
    marginVertical: responsiveSize(14),
    color: Colors.silver,
    fontFamily: Fonts.GilroyBold,
  },
  camBtn: {
    position: 'absolute',
    right: responsiveSize(15),
    bottom: responsiveSize(15),
  },
  avatar: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: responsiveSize(60),
    height: responsiveSize(120),
    width: responsiveSize(120),
  },
  avatarConatiner: {
    alignSelf: 'center',
    height: responsiveSize(135),
    width: responsiveSize(135),
    overflow: 'hidden',
  },
  cameraIcon: {
    height: responsiveSize(30),
    width: responsiveSize(30),
  },
  count: {
    fontSize: respFontSize(13),
    fontFamily: Fonts.GilroyMedium,
    alignSelf: 'flex-end',
    color: Colors.silver,
    marginTop: responsiveSize(10),
  },
  profileImg: {
    justifyContent: 'center',
    borderRadius: responsiveSize(60),
    alignSelf: 'center',
    height: responsiveSize(120),
    width: responsiveSize(120),
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  modalParentView: {
    margin: responsiveSize(40),
    height: '12%',
  },
  modalText: {
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
  },
  iconsView: {
    height: responsiveSize(60),
    width: responsiveSize(60),
  },
  dividerStyles: { backgroundColor: 'white' },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  confirmationbutton: {
    backgroundColor: Colors.darkSilver,
    width: responsiveSize(110),
    height: responsiveSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(10),
  },
  textBtn: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    lineHeight: 20,
  },
  textInputTitle: {
    marginTop: responsiveSize(30),
  },
  categoryHeading: {
    color: Colors.silver,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    marginTop: responsiveSize(30),
  },
  visibilityHeading: {
    color: Colors.silver,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    marginTop: responsiveSize(50),
  },
  categoryMessage: {
    color: Colors.silver,
    fontSize: respFontSize(14),
    fontFamily: Fonts.Gilroy,
    marginTop: responsiveSize(50),
  },
  confirmButtonText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    lineHeight: 20,
  },
  item: {
    height: (width - responsiveSize(81) - responsiveSize(60)) / 3,
    width: (width - responsiveSize(81) - responsiveSize(60)) / 3,
    borderWidth: 1,
    borderColor: Colors.primary,
    margin: responsiveSize(10),
    paddingBottom: 0,
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(10),
  },
  img: { resizeMode: 'contain', flex: 1, marginTop: responsiveSize(10) },
  cardText: {
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    lineHeight: respFontSize(18),
    marginVertical: responsiveSize(10),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  fillAllFieldsText: {
    color: Colors.red,
    fontSize: responsiveSize(17),
    fontFamily: Fonts.Gilroy,
    textAlign: 'center',
    marginTop: responsiveSize(30),
  },
})
