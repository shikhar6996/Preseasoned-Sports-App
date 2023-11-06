import { StyleSheet } from 'react-native'
import { responsiveSize, Fonts, Colors, respFontSize } from '@/Utils'

const CAROUSAL_DOT_WIDTH = 8
export const styles = StyleSheet.create({
  dot: {
    width: CAROUSAL_DOT_WIDTH,
    height: CAROUSAL_DOT_WIDTH,
    borderRadius: CAROUSAL_DOT_WIDTH,
    zIndex: 10,
    borderWidth: 1,
  },
  activeDot: {
    width: CAROUSAL_DOT_WIDTH,
    height: CAROUSAL_DOT_WIDTH,
    borderRadius: CAROUSAL_DOT_WIDTH,
    position: 'absolute',
    zIndex: 10,
  },
  indicatorWrapper: {
    flexDirection: 'row',
    width: '100%',
  },

  mainView: {
    marginHorizontal: responsiveSize(33),
  },
  welcomeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  yourChannelView: {
    marginTop: responsiveSize(22),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  yourChannelText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.primary,
    fontSize: respFontSize(20),
  },
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
    textDecorationLine: 'underline',
    fontSize: respFontSize(13),
  },
  caraouselView: {
    // width: responsiveSize(400),
    // marginTop: responsiveSize(21),
    alignItems: 'center',
    borderRadius: responsiveSize(12),
    borderColor: Colors.primary,
    height: responsiveSize(146),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  profileView: {
    justifyContent: 'center',
    borderRadius: responsiveSize(60),
    alignSelf: 'center',
    height: responsiveSize(78),
    width: responsiveSize(78),
    backgroundColor: 'white',
    overflow: 'hidden',
    marginLeft: responsiveSize(12),
  },
  profileImgStyles: {
    flex: 1,
    alignSelf: 'center',
    borderRadius: responsiveSize(60),
    height: responsiveSize(120),
    width: responsiveSize(120),
  },
  descriptionViews: {
    width: responsiveSize(164),
    height: responsiveSize(79),
    flex: 1,
    marginLeft: responsiveSize(21),
    justifyContent: 'center',
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
  arrowImgStyles: {
    marginTop: responsiveSize(5),
    alignSelf: 'center',
    height: responsiveSize(14),
    width: responsiveSize(14),
    marginLeft: responsiveSize(5),
  },
  caraouselText: {
    marginTop: responsiveSize(5),
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(15),
    color: Colors.silver,
  },
  logoutText: { fontFamily: Fonts.GilroyBold, fontSize: respFontSize(17) },
})
