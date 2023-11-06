import React, { Component } from 'react'

import {
  View,
  Animated,
  FlatList,
  Image,
  Dimensions,
  Text,
  Pressable,
} from 'react-native'

import { arrowDown, arrowUp } from '@/Assets/Images'
import { Colors, Fonts, responsiveSize } from '@/Utils'

import { styles } from './styles'

const { width, height } = Dimensions.get('window')
export class Carousel extends Component {
  xOffset_scrollDot: Animated.Value

  constructor(props) {
    super(props)
    this.state = {}
    this.xOffset_scrollDot = new Animated.Value(0)
  }

  // eslint-disable-next-line class-methods-use-this

  renderPage = (item, page_width, page_height) => (
    <Pressable
      onPress={() => this.props?.onItemPress(item)}
      style={{
        width: page_width,
        height: page_height,
      }}
    >
      <View style={styles.caraouselView}>
        <View style={styles.profileView}>
          <Image
            resizeMode="contain"
            source={{
              uri: item?.profile_image,
            }}
            style={styles.profileImgStyles}
          />
        </View>
        <View style={styles.descriptionViews}>
          <Text
            numberOfLines={3}
            style={[
              styles.caraouselText,
              { fontFamily: Fonts.GilroyBold, width: '100%' },
            ]}
          >
            {item?.channel_name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.caraouselText, { paddingTop: 1 }]}>
              Followers: {item?.follower_count}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )

  renderView = carouselData => {
    const CAROUSAL_DOT_WIDTH = 8
    const CAROUSAL_DOT_GAP = 10
    const CAROUSEL_WIDTH = width - responsiveSize(50)
    const CAROUSEL_HEIGHT = responsiveSize(150)
    const activeDotOffset = this.xOffset_scrollDot.interpolate({
      inputRange: [0, carouselData.length * CAROUSEL_WIDTH],
      outputRange: [
        0,
        carouselData.length * (CAROUSAL_DOT_WIDTH + CAROUSAL_DOT_GAP),
      ],
    })

    return (
      <View
        style={{
          height: responsiveSize(175),
          marginTop: responsiveSize(20),
          // justifyContent: 'center',
          alignSelf: 'center',
          // alignItems: 'center',
          width: CAROUSEL_WIDTH,
        }}
      >
        <FlatList
          horizontal
          pagingEnabled
          bounces={false}
          data={carouselData}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) =>
            this.renderPage(item, CAROUSEL_WIDTH, CAROUSEL_HEIGHT)
          }
          showsHorizontalScrollIndicator={false}
          onScroll={({
            nativeEvent: {
              contentOffset: { x },
            },
          }) => {
            Animated.timing(this.xOffset_scrollDot, {
              toValue: x,
              duration: 0,
              useNativeDriver: false,
            }).start()
          }}
        />

        {/* indicators */}
        <View style={{ alignSelf: 'center' }}>
          {carouselData?.length > 0 && (
            <View style={[styles.indicatorWrapper]}>
              <View>
                <FlatList
                  // contentContainerStyle={{ alignItems: 'center' }}
                  horizontal
                  bounces={false}
                  data={carouselData}
                  ItemSeparatorComponent={() => (
                    <View style={{ width: CAROUSAL_DOT_GAP }} />
                  )}
                  keyExtractor={(item, index) => index}
                  renderItem={item => (
                    <View
                      style={[
                        styles.dot,
                        // dotColor && { backgroundColor: dotColor },
                        {
                          borderColor: Colors.white,
                          backgroundColor: Colors.white,
                        },
                      ]}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  style={styles.indicatorWrapper}
                />
                <Animated.View
                  style={[
                    styles.dot,
                    styles.activeDot,
                    this.props?.activeDotColor && {
                      backgroundColor: this.props?.activeDotColor,
                      borderColor: this.props?.activeDotColor,
                    },
                    {
                      transform: [
                        {
                          translateX: activeDotOffset,
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }

  render() {
    const carouselImages = this.props?.carouselImg
    const carouselData = this.props?.carouselData

    if (carouselData) {
      return this.renderView(carouselData)
    }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {this.renderCarouselComponent(carouselImages)}
      </View>
    )
  }
}
