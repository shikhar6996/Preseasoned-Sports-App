import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '@/Utils'
import { respFontSize, responsiveSize } from '@/Utils/responsiveSize'
export const styles = StyleSheet.create({
  parentHeaderView: { backgroundColor: Colors.secondary, flex: 1 },
  mainView: {
    paddingHorizontal: responsiveSize(40),
    backgroundColor: Colors.secondary,
    marginTop: responsiveSize(40),
    paddingBottom: responsiveSize(119),
    backgroundColor: Colors.secondary,
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
  },
  optionDescWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentModal: {
    borderRadius: responsiveSize(12),
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: responsiveSize(12),
    height: responsiveSize(186),
    width: responsiveSize(386),
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTosettingsView: {
    paddingTop: responsiveSize(26),
  },
  pressableStyles: {
    backgroundColor: Colors.darkSilver,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightBlack,
    width: responsiveSize(146),
    height: responsiveSize(52),
    borderRadius: responsiveSize(8),
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(14),
  },
  confirmationText: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveSize(20),
    width: '80%',
  },
})
