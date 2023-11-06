import { StyleSheet, Dimensions } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

const { width, height } = Dimensions.get('window')
export const styles = StyleSheet.create({
  heading: {
    color: Colors.white,
    fontSize: respFontSize(25),
    fontFamily: Fonts.GilroyBold,
    marginBottom: responsiveSize(20),
  },
  textInputStyles: {
    borderRadius: responsiveSize(10),
    width: '100%',
    backgroundColor: Colors.lightBlack,
    padding: responsiveSize(13),
    fontFamily: Fonts.GilroyMedium,
    paddingHorizontal: responsiveSize(20),
    color: Colors.white,
    marginBottom: responsiveSize(20),
  },
  img: { resizeMode: 'contain', flex: 1, marginTop: responsiveSize(10) },
  cardText: {
    fontSize: respFontSize(15),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.silver,
    lineHeight: respFontSize(18),
    marginVertical: responsiveSize(10),
    textAlign: 'center',
  },
  item: {
    height: (width - responsiveSize(60) - responsiveSize(60)) / 3,
    width: (width - responsiveSize(60) - responsiveSize(60)) / 3,
    borderWidth: 1,
    borderColor: Colors.primary,
    margin: responsiveSize(10),
    paddingBottom: 0,
    borderRadius: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveSize(10),
  },
  container: {
    paddingHorizontal: responsiveSize(30),
  },
  flatListStyles: { height: '100%' },
})
