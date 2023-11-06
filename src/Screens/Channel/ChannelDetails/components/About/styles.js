import { Platform, StyleSheet } from 'react-native'

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
  parentContainer: {
    paddingHorizontal: responsiveSize(43),
    paddingVertical: responsiveSize(38),
  },
  tellUsAboutChannelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tellUsAboutChannelText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    color: Colors.white,
    paddingBottom: responsiveSize(5),
  },
  commonButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: responsiveSize(20),
  },
  commonButton: {
    backgroundColor: Colors.darkSilver,
    width: responsiveSize(159),
    height: responsiveSize(42),
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  commonButtonText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
  },
  aboutChannelParaText: {
    width: '100%',
    height: responsiveSize(200),
    fontFamily: Fonts.Gilroy,
    fontSize: respFontSize(15),
    color: Colors.silver,
  },
  editIconPressable: { height: responsiveSize(19), width: responsiveSize(22) },
  editIcon: {
    height: responsiveSize(19),
    width: responsiveSize(22),
    resizeMode: 'contain',
  },
  scrollViewParent: {
    paddingTop: responsiveSize(30),
    flex: 1,
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
  transparentPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
})
