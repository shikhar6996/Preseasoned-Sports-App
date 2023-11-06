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

  yourChannelText: {
    fontFamily: Fonts.GilroyBold,
    color: Colors.primary,
    fontSize: respFontSize(20),
  },
  cardView: {
    marginTop: responsiveSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  cardContainerStyle: { width: '100%', paddingHorizontal: responsiveSize(10) },
  flatListView: { flex: 1 },
  contentContainerStyle: { width: '100%' },

  imgProfileView: {
    marginTop: responsiveSize(16),
    width: responsiveSize(70),
    height: responsiveSize(70),
    borderRadius: 50,
    overflow: 'hidden',
  },
  imageStyles: {
    width: responsiveSize(70),
    height: responsiveSize(70),
    borderRadius: 50,
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
})
