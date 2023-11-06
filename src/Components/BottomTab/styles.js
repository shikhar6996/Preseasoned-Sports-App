import { StyleSheet } from 'react-native'

import { Colors, responsiveSize } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    height: responsiveSize(64),
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: Colors.secondary,
    justifyContent: 'space-evenly',
  },
  iconPicture: {
    height: responsiveSize(35),
    width: responsiveSize(35),
    resizeMode: 'contain',
  },

  touchable: { justifyContent: 'center', width: '25%', alignItems: 'center' },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: -20, height: 40 },
    shadowOpacity: 0.2,
    transform: [{ rotate: '180deg' }],
    opacity: 0.4,
  },
})
