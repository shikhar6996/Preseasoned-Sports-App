import { StyleSheet, Platform } from 'react-native'

import {
  responsiveSize,
  Colors,
  respFontSize,
  Fonts,
  height,
  width,
} from '@/Utils'

const MODAL_TOP = Platform.OS === 'ios' ? 3 : 4

export const styles = StyleSheet.create({
  transparentPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  postAnnouncememtBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: responsiveSize(10),
    padding: responsiveSize(10),
    paddingHorizontal: responsiveSize(20),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainerView: {
    width: '100%',
    flexDirection: 'row',
  },
  contentView: {
    borderBottomRightRadius: responsiveSize(8),
    borderTopRightRadius: responsiveSize(8),
    borderBottomLeftRadius: responsiveSize(8),
    backgroundColor: Colors.lightBlack,
    flexDirection: 'row',
    flex: 1,
  },
  postAnnouncememtText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
  },
  sortView: {
    backgroundColor: Colors.lightBlack,
    paddingHorizontal: responsiveSize(10),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
    height: responsiveSize(40),
    width: responsiveSize(40),
  },
  sortIcon: {
    width: responsiveSize(25),
    resizeMode: 'contain',
    alignSelf: 'center',
    height: responsiveSize(25),
  },
  itemSeparatorComponent: { height: responsiveSize(26) },
  leftTriangleStyles: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: responsiveSize(13),
    borderRightWidth: responsiveSize(13),
    borderBottomWidth: responsiveSize(26),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.lightBlack,
    transform: [{ rotate: '-90deg' }],
    marginRight: responsiveSize(-1),
  },
  userImgView: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    marginTop: responsiveSize(20),
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
  pinImgStyles: {
    width: responsiveSize(25),
    height: responsiveSize(25),
    borderRadius: responsiveSize(25),
    marginHorizontal: responsiveSize(20),
    marginTop: responsiveSize(15),
    resizeMode: 'contain',
  },
  announcementMessage: {
    marginTop: responsiveSize(20),
    fontFamily: Fonts.Gilroy,
    fontSize: respFontSize(15),
    color: Colors.silver,
  },
  announcementView: {
    borderTopRightRadius: responsiveSize(8),
    borderBottomRightRadius: responsiveSize(8),
    justifyContent: 'center',
    marginHorizontal: responsiveSize(20),
    flex: 1,
  },
  keepReadingText: {
    marginTop: responsiveSize(20),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.primary,
    fontSize: respFontSize(12),
    alignSelf: 'flex-end',
  },
  dateView: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.lightBlack,
    paddingVertical: responsiveSize(10),
    marginTop: responsiveSize(15),
  },
  dateText: {
    color: Colors.white,
    fontFamily: Fonts.Gilroy,
    fontSize: respFontSize(9),
  },
  welcomeMessageView: {
    marginTop: responsiveSize(25),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: responsiveSize(10),
    // height: responsiveSize(200),
    padding: responsiveSize(22),
  },
  welcomeMessage: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(17),
    lineHeight: responsiveSize(26),
  },
  flatListStyles: { paddingBottom: responsiveSize(10) },
  flatListView: {
    flex: 1,
    marginTop: responsiveSize(20),
  },
  announcementContentView: {
    zIndex: 99,
    position: 'absolute',
    height: responsiveSize(360),
    width: responsiveSize(430),
    backgroundColor: Colors.lightBlack,
    padding: responsiveSize(30),
    borderRadius: responsiveSize(20),
    top: height / MODAL_TOP,
    left: width - (width - 20),
  },
  backIcon: {
    width: responsiveSize(25),
    resizeMode: 'contain',
    height: responsiveSize(25),
  },
  threadName: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    marginBottom: responsiveSize(5),
    alignSelf: 'center',
  },

  date: {
    color: Colors.primary,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(13),
    marginBottom: responsiveSize(4),
  },
  threadDescription: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(16),
    marginBottom: responsiveSize(5),
  },
  cardContainerStyle: {
    width: '100%',
    height: responsiveSize(130),
    marginTop: responsiveSize(21),
    alignItems: 'stretch',
    flex: 1,
  },
  flatlistView: {
    flex: 1,
    marginTop: responsiveSize(20),
    paddingBottom: responsiveSize(20),
  },
  mainView: {
    paddingHorizontal: responsiveSize(30),
    paddingBottom: responsiveSize(30),
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },

  textInputStyles: {
    borderBottomWidth: responsiveSize(3),
    borderColor: Colors.white,
    width: '100%',
    color: Colors.white,
    marginTop: responsiveSize(20),
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyMedium,
    paddingVertical: 0,
  },
  countThreadName: {
    fontSize: respFontSize(13),
    fontFamily: Fonts.GilroyMedium,
    alignSelf: 'flex-end',
    color: Colors.white,
    marginTop: responsiveSize(10),
  },
  postButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(8),
    marginTop: responsiveSize(30),
  },
  postText: {
    fontSize: respFontSize(16),
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    padding: responsiveSize(14),
  },
  modalParentView: {
    marginHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(40),
  },
  radioButton: {
    borderRadius: responsiveSize(10),
    width: responsiveSize(20),
    height: responsiveSize(20),
    borderWidth: 1,
    borderColor: Colors.silver,
  },
  optionModalHeading: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(15),
    marginBottom: responsiveSize(20),
  },
  optionsText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    paddingVertical: responsiveSize(12),
  },
})
