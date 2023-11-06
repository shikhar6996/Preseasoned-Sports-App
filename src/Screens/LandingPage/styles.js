import { StyleSheet } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  logo: {
    height: responsiveSize(142),
    width: responsiveSize(100),
    marginLeft: responsiveSize(20),
    marginBottom: responsiveSize(30),
    resizeMode: 'contain',
  },
  mainView: {
    marginTop: responsiveSize(200),
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
    fontSize: respFontSize(35),
    marginBottom: responsiveSize(15),
  },
  description: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(22),
    marginTop: responsiveSize(5),
  },
  nextBtn: {
    marginTop: responsiveSize(100),
    backgroundColor: Colors.darkLiver,
    width: '75%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(10),
  },
  nextButtonText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    lineHeight: 20,
  },
})
