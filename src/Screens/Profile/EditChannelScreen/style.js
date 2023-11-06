import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  contentContainerStyle: {
    marginHorizontal: responsiveSize(45),
    paddingBottom: responsiveSize(40),
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
    marginTop: responsiveSize(27),
    alignSelf: 'center',
    height: responsiveSize(135),
    width: responsiveSize(135),
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
  switchView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginTop: responsiveSize(30),
  },
  switchOption: {
    color: Colors.white,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
  },
  subscriptionHeading: {
    color: Colors.silver,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    marginTop: responsiveSize(40),
    marginBottom: responsiveSize(30),
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
  createChannelText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    fontSize: responsiveSize(19),
    lineHeight: 20,
  },
  containerStyle: {
    alignSelf: 'center',
    height: responsiveSize(46),
    width: responsiveSize(270),
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    flex: 1,
  },
  ruppesIcon: {
    width: responsiveSize(25),
    height: responsiveSize(25),
    resizeMode: 'contain',
  },
  textInputView: {
    width: responsiveSize(90),
    height: responsiveSize(20),
    marginLeft: responsiveSize(30),
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  textInputStyles: {
    textAlign: 'center',
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(17),
  },
  cardText: {
    fontFamily: Fonts.Gilroy,
    fontSize: respFontSize(14),
    color: Colors.silver,
    marginLeft: responsiveSize(10),
  },
  errMsgText: {
    fontSize: respFontSize(12),
    marginTop: responsiveSize(10),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.red,
    marginLeft: responsiveSize(10),
  },
})
