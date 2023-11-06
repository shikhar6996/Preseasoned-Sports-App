/* eslint-disable react-native/no-inline-styles */
import { Colors } from '@/Utils'
import React from 'react'
import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  Text,
  View,
} from 'react-native'

type StateType = {
  barHeight: number | null,
  deltaValue: number,
  value: number,
}

const initialValue = 500
const min = 100
const max = 500
const CIRCLE_DIAMETER = 10

export default class Slider extends React.Component<{}, StateType> {
  constructor(props) {
    super(props)

    this.state = {
      barHeight: null,
      deltaValue: 0,
      value: initialValue,
    }
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => this.onMove(gestureState),
    onPanResponderRelease: () => this.onEndMove(),
    onPanResponderTerminate: () => {},
  })

  onMove(gestureState: PanResponderGestureState) {
    const { barHeight } = this.state
    const newDeltaValue = this.getValueFromBottomOffset(
      -gestureState.dy,
      barHeight,
      min,
      max,
    )

    this.setState({
      deltaValue: newDeltaValue,
    })
  }

  onEndMove() {
    const { value, deltaValue } = this.state
    this.setState({ value: value + deltaValue, deltaValue: 0 })
  }

  onBarLayout = (event: LayoutChangeEvent) => {
    const { height: barHeight } = event.nativeEvent.layout
    this.setState({ barHeight })
  }

  capValueWithinRange = (value: number, range: number[]) => {
    if (value < range[0]) return range[0]
    if (value > range[1]) return range[1]
    return value
  }

  getValueFromBottomOffset = (
    offset: number,
    barHeight: number | null,
    rangeMin: number,
    rangeMax: number,
  ) => {
    if (barHeight === null) return 0
    return ((rangeMax - rangeMin) * offset) / barHeight
  }

  getBottomOffsetFromValue = (
    value: number,
    rangeMin: number,
    rangeMax: number,
    barHeight: number | null,
  ) => {
    if (barHeight === null) return 0
    const valueOffset = value - rangeMin
    const totalRange = rangeMax - rangeMin
    const percentage = valueOffset / totalRange
    return barHeight * percentage
  }

  render() {
    const { value, deltaValue, barHeight } = this.state
    const cappedValue = this.capValueWithinRange(value + deltaValue, [min, max])
    const bottomOffset = this.getBottomOffsetFromValue(
      cappedValue,
      min,
      max,
      barHeight,
    )

    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          paddingVertical: 20,
        }}
      >
        {/* <Text style={{ color: 'white' }}>
          {Math.floor(initialValue - cappedValue)}
        </Text> */}
        <View
          style={{
            justifyContent: 'center',
            flexGrow: 1,
            alignSelf: 'stretch',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: CIRCLE_DIAMETER,
              alignItems: 'center',
              paddingVertical: CIRCLE_DIAMETER / 2,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                width: 2,
                backgroundColor: Colors.primary,
                flexGrow: 1,
                opacity: 0.5,
              }}
              onLayout={this.onBarLayout}
            />
            <View
              style={{
                borderRadius: CIRCLE_DIAMETER / 2,
                width: CIRCLE_DIAMETER,
                height: CIRCLE_DIAMETER,
                backgroundColor: Colors.primary,
                position: 'absolute',
                bottom: bottomOffset || 0,
              }}
              {...this.panResponder.panHandlers}
            />
          </View>
        </View>
      </View>
    )
  }
}
