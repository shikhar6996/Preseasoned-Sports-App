import { StyleSheet } from 'react-native'

import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.secondary, flex: 1 },
  mainUpperView: {
    paddingHorizontal: responsiveSize(30),
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
  },
  avatar: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: responsiveSize(60),
    height: responsiveSize(120),
    width: responsiveSize(120),
    resizeMode: 'contain',
  },
  avatarContainer: {
    alignSelf: 'center',
    height: responsiveSize(135),
    width: responsiveSize(135),
    overflow: 'hidden',
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
  channelDetailsView: {
    marginLeft: responsiveSize(15),
    marginRight: responsiveSize(10),
    justifyContent: 'center',
    flex: 1,
  },
  channelName: {
    color: Colors.white,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    marginBottom: responsiveSize(5),
  },
  bioView: {
    flexDirection: 'row',
    marginTop: responsiveSize(20),
    width: '100%',
  },
  followersView: {
    borderWidth: 1,
    borderRadius: responsiveSize(10),
    borderColor: Colors.primary,
    padding: responsiveSize(10),
    flexDirection: 'row',
  },
  followersInnerView: {
    justifyContent: 'space-between',
  },
  bio: {
    color: Colors.white,
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyMedium,
    marginLeft: responsiveSize(30),
    flex: 1,
    lineHeight: responsiveSize(25),
  },
  followerIcon: {
    height: responsiveSize(25),
    width: responsiveSize(25),
    resizeMode: 'contain',
  },
  count: {
    color: Colors.primary,
    fontSize: respFontSize(18),
    fontFamily: Fonts.GilroyMedium,
    marginLeft: responsiveSize(10),
    textAlign: 'center',
  },
  heading: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    alignSelf: 'center',
    color: Colors.white,
  },
  button: {
    borderTopLeftRadius: responsiveSize(12),
    borderTopRightRadius: responsiveSize(12),
    width: '33.4%',
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: responsiveSize(10),
    paddingVertical: responsiveSize(15),
  },
  editBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: responsiveSize(10),
    paddingHorizontal: responsiveSize(25),
    borderRadius: responsiveSize(10),
    marginTop: responsiveSize(10),
  },
  buttonText: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(13),
  },
  followButton: {
    alignSelf: 'center',
    width: responsiveSize(101),
    borderRadius: responsiveSize(6),
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followText: {
    alignSelf: 'center',
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
    fontSize: respFontSize(12),
  },
  edit: {
    height: responsiveSize(20),
    width: responsiveSize(20),
    resizeMode: 'contain',
  },
})
