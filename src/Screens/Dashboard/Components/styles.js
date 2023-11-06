import { StyleSheet } from 'react-native'
import { responsiveSize, Colors, respFontSize, Fonts } from '@/Utils'

export const styles = StyleSheet.create({
  seeAllView: {
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkLiver,
    height: responsiveSize(30),
    width: responsiveSize(67),
  },
  seeAllText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    // textDecorationLine: 'underline',
    fontSize: respFontSize(13),
  },

  cardContainerStyle: {
    width: responsiveSize(188),
    height: responsiveSize(246),
    marginTop: responsiveSize(21),
  },
  profileView: {
    backgroundColor: 'yellow',
    marginTop: responsiveSize(3),
    width: responsiveSize(78),
    height: responsiveSize(78),
    borderRadius: responsiveSize(50),
    overflow: 'hidden',
  },
  userImgStyles: {
    width: responsiveSize(78),
    height: responsiveSize(78),
    borderRadius: responsiveSize(50),
    backgroundColor: Colors.white,
  },
  sectionView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveSize(10),
  },
  sectionText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    marginTop: respFontSize(10),
    alignSelf: 'center',
  },
  userNameText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(15),
    marginTop: respFontSize(5),
  },
  followerCountText: {
    marginTop: responsiveSize(5),
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
  },
  followButton: {
    marginTop: responsiveSize(12),
    alignSelf: 'center',
    width: responsiveSize(101),
    borderRadius: responsiveSize(6),
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  followText: {
    padding: responsiveSize(2),
    alignSelf: 'center',
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
    fontSize: respFontSize(12),
  },
})
