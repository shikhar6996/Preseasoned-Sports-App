import { StyleSheet } from 'react-native'

import { Colors } from '@/Utils'
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
    fontSize: respFontSize(35),
    marginBottom: responsiveSize(15),
  },
  description: {
    color: Colors.white,
    fontSize: respFontSize(22),
    marginTop: responsiveSize(5),
  },
  footerText: {
    color: Colors.darkSilver,
    fontSize: respFontSize(20),
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
})
