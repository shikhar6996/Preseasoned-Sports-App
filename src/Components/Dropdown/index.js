/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React, { useRef, useState } from 'react'

import { Fragment } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'

import { dropdownArrow } from '@/Assets/Images'
import { Colors, Fonts, respFontSize, responsiveSize } from '@/Utils'

import { Input } from '../index'

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: Colors.secondary,
    width: '100%',
    height: responsiveSize(140),
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: responsiveSize(12),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  item: {
    padding: responsiveSize(10),
    paddingLeft: responsiveSize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
})
const itemSeparatorComponent = () => (
  <View
    style={{ height: responsiveSize(2), backgroundColor: Colors.darkSilver }}
  />
)

const Dropdown = ({ onSelect, data, label, isDisabled }) => {
  const [searchText, setSearchText] = useState('')
  const [visible, setVisible] = useState(false)
  const DropdownButton = useRef()
  const [dropdownTop, setDropdownTop] = useState(0)

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      console.log({ _fx, _fy, _w, h, _px, py })
      setDropdownTop(py + h)
    })
    console.log('OpenDropDown', visible)
    setVisible(true)
  }

  const toggleDropdown = () => {
    if (visible) {
      setSearchText('')
      setVisible(false)
    } else {
      //   openDropdown()
      setVisible(true)
    }
  }

  const onItemPress = item => {
    onSelect(item)
    setVisible(false)
    setSearchText(item?.label || '')
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        item.isSelected && {
          backgroundColor: Colors.primary,
        },
      ]}
      onPress={() => onItemPress(item)}
    >
      <Text style={{ color: Colors.white, fontSize: respFontSize(15) }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )

  const renderData = () => {
    if (data && Array.isArray(data) && data.length && searchText) {
      return data.filter(
        item => item.title && String(item.title).includes(searchText),
      )
    }
    return data
  }

  const renderDropdown = () => {
    if (visible) {
      return (
        <View
          style={{
            width: '100%',
          }}
        >
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}
          >
            <View style={[styles.dropdown /* { top: dropdownTop } */]}>
              {/* <FlatList
                data={data}
                ItemSeparatorComponent={itemSeparatorComponent}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                style={{
                  paddingTop: responsiveSize(10),
                }}
              /> */}
              <ScrollView>
                {data &&
                  Array.isArray(data) &&
                  data.map(item => (
                    <Fragment key={item.id}>
                      <TouchableOpacity
                        style={[
                          styles.item,
                          item.isSelected && {
                            backgroundColor: Colors.primary,
                          },
                        ]}
                        onPress={() => onItemPress(item)}
                      >
                        <Image
                          source={{ uri: item.category_image }}
                          style={{
                            height: responsiveSize(21),
                            width: responsiveSize(21),
                            resizeMode: 'contain',
                            tintColor: Colors.white,
                          }}
                        />
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: respFontSize(14),
                            marginLeft: responsiveSize(13),
                            fontFamily: Fonts.Gilroy,
                          }}
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: responsiveSize(2),
                          backgroundColor: Colors.darkSilver,
                        }}
                      />
                    </Fragment>
                  ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  return (
    <>
      <View style={{ marginTop: responsiveSize(20) }}>
        <Input
          hasIcon
          autoCapitalize="none"
          containerStyle={[
            {
              zIndex: 9,
              paddingLeft: responsiveSize(20),
              // marginTop: responsiveSize(20),
            },
            visible
              ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
              : {},
          ]}
          editable={false}
          iconPressDisabled={false}
          iconSource={dropdownArrow}
          iconStyle={{ height: responsiveSize(15), width: responsiveSize(15) }}
          placeholder={label}
          placeholderTextColor={Colors.silver}
          refs={DropdownButton}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onIconPress={toggleDropdown}
          onSubmitEditing={toggleDropdown}
        />
        <TouchableOpacity
          disabled={isDisabled}
          // activeOpacity={0.9}
          style={{
            width: '100%',
            zIndex: 10,
            height: responsiveSize(48),
            // backgroundColor: 'yellow',
            position: 'absolute',
          }}
          onPress={toggleDropdown}
        />
      </View>
      {renderDropdown()}
    </>
  )
}

export { Dropdown }
