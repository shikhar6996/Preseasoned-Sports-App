import { StyleSheet, Dimensions } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: responsiveSize(40),
  },
  userImgView: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    marginTop: responsiveSize(23),
    left: responsiveSize(10),
    borderRadius: responsiveSize(25),
    backgroundColor: Colors.white,
    marginLeft: responsiveSize(10),
  },
  imageStyles: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    borderRadius: responsiveSize(25),
  },
  profileImg: {
    justifyContent: 'center',
    borderRadius: responsiveSize(60),
    alignSelf: 'center',
    height: responsiveSize(90),
    width: responsiveSize(90),
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: responsiveSize(60),
    height: responsiveSize(90),
    width: responsiveSize(90),
  },
  userDetailsView: {
    marginLeft: responsiveSize(20),
    justifyContent: 'center',
    flex: 1,
  },
  username: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    color: Colors.primary,
    marginBottom: responsiveSize(10),
  },
  profileWrapper: {
    flexDirection: 'row',
    marginTop: responsiveSize(20),
    marginBottom: responsiveSize(50),
  },
  optionWrapper: {
    borderRadius: responsiveSize(15),
    borderColor: Colors.primary,
    paddingHorizontal: responsiveSize(30),
    borderWidth: 1,
    paddingVertical: responsiveSize(20),
    marginTop: responsiveSize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconPicture: {
    height: responsiveSize(25),
    width: responsiveSize(25),
    resizeMode: 'contain',
  },
  title: {
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    color: Colors.white,
    marginLeft: responsiveSize(20),
  },
  arrow: {
    tintColor: Colors.white,
  },
  optionDescWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentModal: {
    borderRadius: responsiveSize(12),
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: responsiveSize(12),
    height: responsiveSize(186),
    width: responsiveSize(386),
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTosettingsView: {
    paddingTop: responsiveSize(26),
  },
  pressableStyles: {
    backgroundColor: Colors.darkSilver,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightBlack,
    width: responsiveSize(146),
    height: responsiveSize(52),
    borderRadius: responsiveSize(8),
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(14),
  },
  confirmationText: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveSize(20),
    width: '80%',
  },
})
