import { StyleSheet, Dimensions } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  profilePictureView: {
    backgroundColor: Colors.white,
    height: responsiveSize(165),
    width: responsiveSize(165),
    borderRadius: responsiveSize(100),
    overflow: 'hidden',
  },
  mainContainer: {
    flex: 1,
  },
  insideContainer: {
    marginHorizontal: responsiveSize(30),
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginTop: responsiveSize(20),
    width: '100%',
  },
  userNameContainer: {
    flex: 1,
    marginLeft: responsiveSize(20),
    flexDirection: 'column',
  },
  nameText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(20),
    color: Colors.white,
    marginBottom: responsiveSize(8),
  },
  usernameText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    color: Colors.silver,
    marginBottom: responsiveSize(8),
  },
  bioText: {
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(15),
    color: Colors.silver,
    marginBottom: responsiveSize(8),
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: responsiveSize(10),
    paddingVertical: responsiveSize(10),
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  editBtnText: {
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(13),
    color: Colors.silver,
  },
  defaultAvatarImg: {
    alignSelf: 'center',
    height: responsiveSize(165),
    width: responsiveSize(165),
    borderRadius: responsiveSize(100),
    resizeMode: 'contain',
  },
  interestHeading: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    fontSize: respFontSize(17),
    marginTop: responsiveSize(30),
  },
  yourChannelText: {
    fontSize: respFontSize(20),
    color: Colors.primary,
    fontFamily: Fonts.GilroyBold,
  },
  createChannelBtn: {
    borderRadius: responsiveSize(35),
    width: responsiveSize(300),
    alignSelf: 'center',
    paddingVertical: responsiveSize(20),
    marginTop: responsiveSize(30),
    backgroundColor: Colors.primary,
  },
  createchannelBtnText: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
    fontSize: responsiveSize(19),
    lineHeight: 20,
  },
  categoryTitle: {
    color: Colors.white,
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyMedium,
    lineHeight: respFontSize(24),
  },
  mainCategoryView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: responsiveSize(20),
  },
  item: {
    height: (width - responsiveSize(60) - responsiveSize(62)) / 3,
    width: (width - responsiveSize(60) - responsiveSize(62)) / 3,
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
  seeAllView: {
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBlack,
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(8),
  },
  seeAllText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    // textDecorationLine: 'underline',
    fontSize: respFontSize(13),
    padding: responsiveSize(5),
  },
  channelHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(30),
  },
})
