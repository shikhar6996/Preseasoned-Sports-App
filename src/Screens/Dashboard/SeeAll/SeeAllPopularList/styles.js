import { StyleSheet } from 'react-native'

import { responsiveSize, Fonts, Colors, respFontSize } from '@/Utils'

export const styles = StyleSheet.create({
  parentContainer: { flex: 1, backgroundColor: Colors.secondary },
  container: { flex: 1, paddingHorizontal: responsiveSize(31) },
  yourChannelView: {
    marginTop: responsiveSize(22),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  sortView: {
    height: responsiveSize(50),
    width: responsiveSize(50),
    backgroundColor: Colors.lightBlack,
    paddingHorizontal: responsiveSize(10),
    borderRadius: responsiveSize(10),
    justifyContent: 'center',
  },
  sortIcon: {
    height: responsiveSize(25),
    width: responsiveSize(25),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  yourChannelText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.white,
    fontSize: respFontSize(20),
  },
  textInputView: {
    flexDirection: 'row',
    marginTop: responsiveSize(17),
    height: responsiveSize(50),
    justifyContent: 'space-around',
  },
  textInputStyles: {
    borderRadius: responsiveSize(10),
    width: '85%',
    backgroundColor: Colors.lightBlack,
    paddingHorizontal: responsiveSize(13),
    fontFamily: Fonts.GilroyMedium,
    color: Colors.white,
  },
  sortByView: { marginTop: responsiveSize(23) },
  sortByText: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: responsiveSize(24),
  },
  contentContainerStyle: { width: '100%' },
  cardView: {
    marginTop: responsiveSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  flatListView: { flex: 1 },
  cardContainerStyle: { width: '100%', paddingHorizontal: responsiveSize(10) },
  imgProfileView: {
    marginTop: responsiveSize(16),
    width: responsiveSize(70),
    height: responsiveSize(70),
    borderRadius: responsiveSize(50),
    overflow: 'hidden',
  },
  imageStyles: {
    width: responsiveSize(70),
    height: responsiveSize(70),
    borderRadius: responsiveSize(50),
    backgroundColor: 'white',
  },

  cardText: {
    color: Colors.silver,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(12),
    marginTop: respFontSize(3),
    marginBottom: responsiveSize(17),
  },
  cardTitleText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyBold,
    fontSize: respFontSize(12),
    marginTop: responsiveSize(6),
  },
  modalParentView: {
    marginHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(40),
  },
  sortModalHeading: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(15),
    marginBottom: responsiveSize(40),
  },
  sortOptionsText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: respFontSize(14),
    marginBottom: responsiveSize(13),
  },
  radioButton: {
    borderRadius: responsiveSize(10),
    width: responsiveSize(20),
    height: responsiveSize(20),
    borderWidth: 1,
    borderColor: Colors.silver,
  },
  rowView: { flexDirection: 'row', justifyContent: 'space-between' },
})
