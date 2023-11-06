import React from 'react'

import { View, Image } from 'react-native'

import PropTypes from 'prop-types'

import { logo } from '@/Assets/Images'
import { Layout } from '@/Utils'

const Brand = ({ height, width, mode }) => {
  const layout = Layout()
  return (
    <View style={{ height, width }}>
      <Image resizeMode={mode} source={logo} style={layout.fullSize} />
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
}

Brand.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
}

export default Brand
