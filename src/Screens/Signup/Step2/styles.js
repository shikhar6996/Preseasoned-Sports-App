import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  mainView: { flexDirection: 'column' },
  contentContainerStyle: {
    marginHorizontal: responsiveSize(45),
  },
  joinUsView: { marginTop: responsiveSize(40) },
  joinUsText: {
    color: Colors.white,
    fontSize: respFontSize(45),
    fontFamily: Fonts.GilroyBold,
  },
  description: {
    color: Colors.white,
    fontSize: respFontSize(18),
    fontFamily: Fonts.GilroyBold,
  },
  descriptionText: {
    marginLeft: responsiveSize(10),
    marginTop: responsiveSize(8),
    color: Colors.silver,
    fontSize: respFontSize(12),
    fontFamily: Fonts.GilroyMedium,
    width: '90%',
  },
  createUserNameText: {
    alignSelf: 'center',
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    marginBottom: responsiveSize(12),
  },
  descriptionView: { marginTop: responsiveSize(36) },
  inputWrapper: { marginTop: responsiveSize(33) },
  displayNameText: {
    alignSelf: 'center',
    fontSize: respFontSize(16),
    marginVertical: responsiveSize(14),
    color: Colors.silver,
    fontFamily: Fonts.GilroyBold,
  },
  nextButton: { marginTop: responsiveSize(36) },
  nextButtonText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    lineHeight: 20,
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
    marginTop: responsiveSize(27),
    alignSelf: 'center',
    height: responsiveSize(120 + 15),
    width: responsiveSize(120 + 15),
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
  stepText: {
    alignSelf: 'center',
    fontFamily: Fonts.GilroyBold,
    fontSize: responsiveSize(17),
    color: Colors.silver,
    marginBottom: responsiveSize(20),
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
  },
  textInputTitle: {
    marginTop: responsiveSize(30),
  },
  fillAllFieldsText: {
    color: Colors.red,
    fontSize: responsiveSize(17),
    fontFamily: Fonts.Gilroy,
    textAlign: 'center',
    marginTop: responsiveSize(30),
  },
  errMsgText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.red,
    marginLeft: responsiveSize(10),
  },
})
