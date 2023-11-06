/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react'
import { Text, TextInput, FlatList, Pressable, Image, View } from 'react-native'

import { useDispatch } from 'react-redux'

import { Header } from '@/Components'

import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'
import { getCategoryList } from '@/Store/Reducers/Common/CategoryReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors } from '@/Utils'

import { styles } from './style'

const Item = ({ id, title, category_image, isSelected, onPress }) => (
  <Pressable style={styles.item} onPress={onPress}>
    <Image
      source={{ uri: category_image }}
      style={[
        styles.img,
        {
          tintColor: isSelected ? Colors.white : undefined,
          height: '100%',
          width: '100%',
        },
      ]}
    />
    <Text style={styles.cardText}>{title}</Text>
  </Pressable>
)

const HeaderComponent = React.memo(({ searchText, searchUser }) => (
  <>
    <Text style={styles.heading}>Explore Sports</Text>
    <TextInput
      autoCorrect={false}
      placeholder="Search"
      placeholderTextColor={Colors.silver}
      returnKeyType="search"
      selectionColor={Colors.white}
      style={styles.textInputStyles}
      value={searchText}
      onChangeText={text => {
        searchUser(text)
      }}
    />
  </>
))
const ExploreScreen = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [sportsList, setSportsList] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const searchUser = text => {
    setSearchText(text)
    const filteredSportsList = sportsList?.filter(listItem =>
      listItem.title.toLowerCase().includes(text.toLowerCase()),
    )
    setFilteredData(filteredSportsList)
  }

  const renderItem = ({ item }) => (
    <Item
      {...item}
      onPress={() => {
        navigationRef.navigate(ROUTES.SELECTED_SPORTS, {
          selectedSport: item,
          selectedSportImage: item.category_image ?? '',
        })
      }}
    />
  )

  useEffect(() => {
    dispatch(setLoadingState(true))
    dispatch(
      getCategoryList(
        data => {
          if (data && data?.length > 0) {
            setSportsList(data.map(item => ({ ...item, isSelected: false })))
          }
          dispatch(setLoadingState(false))
        },
        error => {
          console.log('Error in Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }, [])

  useEffect(() => {
    setFilteredData(sportsList)
  }, [sportsList])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <Header title="Explore" />
      <FlatList
        bounces={false}
        contentContainerStyle={styles.container}
        data={filteredData}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <HeaderComponent searchText={searchText} searchUser={searchUser} />
        }
        numColumns={3}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.flatListStyles}
      />
    </View>
  )
}
export { ExploreScreen }
