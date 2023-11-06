import { StyleSheet } from 'react-native'

import { Colors, Fonts, width, height } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  logo: {
    height: responsiveSize(70),
    width: responsiveSize(50),
    marginLeft: responsiveSize(20),
    marginVertical: responsiveSize(16),
    resizeMode: 'contain',
  },
  childContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveSize(45),
  },

  hr: {
    backgroundColor: 'white',
    height: 1,
    marginVertical: responsiveSize(20),
  },
  heading: {
    fontSize: respFontSize(18),
    alignSelf: 'center',
    color: 'white',
    marginTop: responsiveSize(10),
  },
  name: {
    color: Colors.primary,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(16),
    marginBottom: responsiveSize(15),
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: responsiveSize(30),
  },
  swiperContainer: {
    marginTop: responsiveSize(20),
  },
  card: {
    borderRadius: responsiveSize(14),
    // backgroundColor: Colors.lightBlack,
    width: responsiveSize(272),
    height: responsiveSize(354),
    marginHorizontal: (width - responsiveSize(362)) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(10),
  },
  cardTextBold: {
    color: Colors.white,
    fontSize: respFontSize(22),
    fontFamily: Fonts.GilroyBold,
    textAlign: 'center',
    marginBottom: responsiveSize(25),
  },
  cardText: {
    color: Colors.white,
    fontSize: respFontSize(18),
    fontFamily: Fonts.Gilroy,
    textAlign: 'center',
  },
  paginationStyle: {
    // backgroundColor: Colors.secondary,
    // top: height - (height < 670 ? responsiveSize(330) : responsiveSize(510)),
    top: responsiveSize(570),
    zIndex: 9,
  },
  paginationStyleItem: {
    borderRadius: responsiveSize(10),
    width: responsiveSize(10),
    height: responsiveSize(10),
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    color: Colors.white,
    lineHeight: 20,
  },
})
