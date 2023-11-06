import { StyleSheet } from 'react-native'

import { responsiveSize, respFontSize, Fonts, Colors } from '@/Utils'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginHorizontal: responsiveSize(52),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  keyboardContentContainerStyle: { flex: 1 },
  bankNameText: {
    color: Colors.darkSilver,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
  },
  registerdBankDetailView: {
    marginTop: responsiveSize(25),
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfCloseView: {
    width: responsiveSize(50),
    height: responsiveSize(50),
    backgroundColor: Colors.darkLiver,
    borderRadius: responsiveSize(12),
  },
  bankNameView: { marginLeft: responsiveSize(27) },
  registerdBankDetailText: {
    marginVertical: responsiveSize(20),
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    color: Colors.white,
  },
  walletBalanceText: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
    textAlign: 'center',
  },
  cardContainerStyle: {
    alignSelf: 'center',
    height: responsiveSize(42),
    minWidth: responsiveSize(264),
    backgroundColor: Colors.secondary,
    paddingHorizontal: responsiveSize(20),
  },
  containerStyle: {
    alignSelf: 'center',
    height: responsiveSize(126),
    width: responsiveSize(264),
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
  },
  confirmWithdrawAmtText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(17),
    lineHeight: 20,
  },
  withdrwalAmtText: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    textAlign: 'center',
    paddingVertical: responsiveSize(25),
  },
  note: {
    color: Colors.darkSilver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(12),
    marginTop: responsiveSize(5),
    textAlign: 'center',
  },
  ruppesIcon: {
    width: responsiveSize(57),
    height: responsiveSize(57),
    resizeMode: 'contain',
  },
  textInputView: {
    width: responsiveSize(130),
    height: responsiveSize(80),
    marginLeft: responsiveSize(30),
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  textInputStyles: {
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(40),
  },
  coinDetailView: { marginTop: responsiveSize(20) },

  confirmButton: {
    marginTop: responsiveSize(50),
    backgroundColor: Colors.primary,
  },

  coinDetailText: {
    fontSize: respFontSize(17),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.primary,
    textAlign: 'center',
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

  pressableStyles: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightBlack,
    width: responsiveSize(131),
    height: responsiveSize(28),
    borderRadius: responsiveSize(5),
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
  },
  confirmationText: {
    color: Colors.white,
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
