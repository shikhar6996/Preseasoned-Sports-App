import { StyleSheet } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: responsiveSize(20),
  },
  welcomeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(22),
  },
  yourChannelView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  yourChannelText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.primary,
    fontSize: respFontSize(20),
  },
  cardContainerStyle: {
    width: responsiveSize(188),
    height: responsiveSize(246),
    marginTop: responsiveSize(21),
  },
  createChannelBtn: {
    borderRadius: responsiveSize(35),
    width: responsiveSize(300),
    alignSelf: 'center',
    marginTop: responsiveSize(30),
    backgroundColor: Colors.primary,
  },
  createchannelBtnText: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
    fontSize: responsiveSize(19),
    lineHeight: 20,
  },

  profileView: {
    marginTop: responsiveSize(3),
    width: responsiveSize(78),
    height: responsiveSize(78),
    borderRadius: responsiveSize(50),
    overflow: 'hidden',
  },
  sectionView: { justifyContent: 'center', alignItems: 'center' },
  sectionText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    marginTop: respFontSize(22),
    marginHorizontal: responsiveSize(10),
  },
  followerCountText: {
    marginTop: responsiveSize(6),
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(15),
    marginBottom: responsiveSize(5),
  },
  userImgStyles: {
    width: responsiveSize(78),
    height: responsiveSize(78),
    borderRadius: responsiveSize(50),
    backgroundColor: Colors.white,
  },
  followView: {
    marginVertical: responsiveSize(20),
    lineHeight: responsiveSize(20),
  },

  imgIcon: {
    height: responsiveSize(22),
    width: responsiveSize(25),
    resizeMode: 'contain',
  },
  name: {
    color: Colors.white,
    fontSize: respFontSize(25),
    fontFamily: Fonts.GilroyBold,
    maxWidth: '80%',
  },
  folderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '15%',
  },
})
