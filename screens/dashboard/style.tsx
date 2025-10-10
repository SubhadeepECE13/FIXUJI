
import color from '@/themes/Colors.themes'
import { fontSizes, windowHeight, windowWidth } from '@/themes/Constants.themes'
import fonts from '@/themes/Fonts.themes'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: windowHeight(85),
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(5)
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    height: windowHeight(12),
    backgroundColor: color.whiteColor,
    paddingVertical: windowHeight(1),
    paddingHorizontal: windowWidth(5),
    borderRadius: 30
  },
  cardleft: {
    justifyContent: 'center'
  },
  cardRight: {
    justifyContent: 'center',
    paddingHorizontal: windowWidth(3),
    maxWidth: windowWidth(70)
  },
  profileImage: {
    width: windowHeight(8),
    height: windowHeight(8),
    borderRadius: 100
  },
  name: {
    fontSize: fontSizes.md,
    fontFamily: fonts.semiBold
  },
  subTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
    marginTop: -5
  },

  secondContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: windowHeight(1.5)
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: windowHeight(1),
    marginVertical: windowHeight(0.5)
  },
  heroImage: {
    width: windowWidth(50),
    height: windowHeight(18),
    resizeMode: 'contain'
  },
  tabContainer: {
    marginTop: windowHeight(1.5),
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: windowHeight(1.5),
    columnGap: windowHeight(1.5),
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
