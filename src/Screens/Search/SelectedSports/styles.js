import { StyleSheet } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: responsiveSize(20),
    backgroundColor: Colors.secondary,
  },
  welcomeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(22),
  },
  yourChannelView: {
    backgroundColor: Colors.secondary,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerView: { backgroundColor: Colors.secondary, flex: 1 },

  yourChannelText: {
    backgroundColor: Colors.secondary,
    fontFamily: Fonts.GilroyBold,
    color: Colors.primary,
    fontSize: respFontSize(20),
  },
  textInputStyles: {
    borderRadius: responsiveSize(10),
    width: '100%',
    backgroundColor: Colors.lightBlack,
    padding: responsiveSize(14),
    fontFamily: Fonts.GilroyMedium,
    paddingHorizontal: responsiveSize(13),
    color: Colors.silver,
  },
  channelHeader: {
    marginTop: responsiveSize(27),

    color: Colors.secondary,
  },
  noDataFoundText: {
    fontSize: responsiveSize(20),
    color: Colors.silver,
    marginTop: responsiveSize(19),
  },
  itemSeparatorComponent: { width: responsiveSize(30) },
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
  },
  createchannelBtnText: { fontFamily: Fonts.GilroyMedium },

  profileView: {
    marginTop: responsiveSize(3),
    width: responsiveSize(78),
    height: responsiveSize(78),
    borderRadius: responsiveSize(50),
    overflow: 'hidden',
  },
  sectionView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  sectionText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    marginTop: respFontSize(22),
    marginHorizontal: responsiveSize(10),
  },
  userNameText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(14),
  },
  followerCountText: {
    backgroundColor: 'yellow',
    marginTop: responsiveSize(6),
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
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
