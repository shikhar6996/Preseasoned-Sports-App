import React from 'react'
import { View, Image, ActivityIndicator } from 'react-native'

import { useSelector } from 'react-redux'

import { logo, loader } from '@/Assets/Images'
import { Colors, responsiveSize } from '@/Utils'

export const IsLoadingHOC = WrappedComponent => {
  function HOC(props) {
    const { loading } = useSelector(state => state.CommonReducer.LoaderReducer)

    return (
      <>
        {loading && (
          <View
            style={{
              // backgroundColor: 'rgba(255,255,255,0.2)',
              // backgroundColor: 'black',
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 99,
              elevation: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator color={Colors.primary} size="large" />
            {/* <Image
              source={loader}
              style={{
                height: responsiveSize(142),
                width: responsiveSize(100),
                resizeMode: 'contain',
              }}
            /> */}
          </View>
        )}
        <WrappedComponent {...props} />
      </>
    )
  }
  return HOC
}
