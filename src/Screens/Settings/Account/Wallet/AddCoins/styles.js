import { Dimensions, StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

const windowHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    marginHorizontal: responsiveSize(45),
  },
  scrollViewParent: {
    flex: 1,
    flexGrow: windowHeight,
  },
  note: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.silver,
    fontSize: respFontSize(16),
    marginTop: responsiveSize(110),
    lineHeight: responsiveSize(30),
    textAlign: 'center',
  },
  coinDescriptionCard: {
    height: responsiveSize(40),
    width: responsiveSize(300),
    borderWidth: responsiveSize(1),
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: responsiveSize(15),
    backgroundColor: 'rgb(0 , 0 , 0)',
  },
  amountINR: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
    fontSize: respFontSize(15),
    alignSelf: 'flex-end',
    marginRight: responsiveSize(18),
  },
  amountCoins: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
    fontSize: respFontSize(15),
    alignItems: 'flex-start',
    marginLeft: responsiveSize(18),
  },
  cardText: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.primary,
    fontSize: respFontSize(16),
  },
  icon: {
    height: responsiveSize(20),
    width: responsiveSize(20),
  },
  leftTriangleStyles: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: responsiveSize(8),
    borderRightWidth: responsiveSize(8),
    borderBottomWidth: responsiveSize(16),
    marginTop: responsiveSize(20),
    marginRight: responsiveSize(-1),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.darkLiver,
    transform: [{ rotate: '-90deg' }],
  },
  rightTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: responsiveSize(8),
    borderRightWidth: responsiveSize(8),
    borderBottomWidth: responsiveSize(16),
    marginTop: responsiveSize(20),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.darkLiver,
    transform: [{ rotate: '90deg' }],
    marginLeft: responsiveSize(-1),
  },
  highlightedViewRupees: {
    borderRadius: responsiveSize(10),
    height: responsiveSize(40),
    width: responsiveSize(150),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveSize(10),
  },
  highlightedViewCoins: {
    borderRadius: responsiveSize(10),
    height: responsiveSize(40),
    width: responsiveSize(150),
    justifyContent: 'center',
    marginVertical: responsiveSize(10),
  },
  coinsView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginLeft: -10,
  },
  rupeesView: { flexDirection: 'row', marginRight: -10 },
  sliderView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: responsiveSize(20),
  },
  buttonConfirm: {
    backgroundColor: Colors.primary,
    marginTop: responsiveSize(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveSize(20),
  },
  confirmPaymentText: {
    color: Colors.white,
    fontSize: responsiveSize(19),
    fontFamily: Fonts.GilroyBold,
    lineHeight: 20,
  },
})
