import { StyleSheet } from 'react-native'

import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  mainView: {
    paddingHorizontal: responsiveSize(40),
  },
  optionWrapper: {
    borderRadius: responsiveSize(15),
    borderColor: Colors.primary,
    paddingHorizontal: responsiveSize(30),
    borderWidth: 1,
    paddingVertical: responsiveSize(20),
    marginTop: responsiveSize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconPicture: {
    height: responsiveSize(25),
    width: responsiveSize(25),
    resizeMode: 'contain',
  },
  title: {
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    color: Colors.white,
    marginLeft: responsiveSize(20),
  },
  arrow: {
    tintColor: Colors.white,
    height: responsiveSize(18),
    width: responsiveSize(25),
  },
  optionDescWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
