import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image, TextInput, Pressable } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { sortIcon } from '@/Assets/Images'
import { Header, Card, BottomSheet } from '@/Components'
import { ROUTES, NamedConstants } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'
import {
  getChannelDetails,
  getPopularWithCategoryList,
} from '@/Store/Reducers/Channels'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const SeeAllPopularCategoryList = ({ route: { params } }) => {
  const [channelData, setChannelData] = useState()
  const [sortModalIsVisible, setSortModalIsVisible] = useState(false)
  const [sortOption, setSortOption] = useState({
    key: NamedConstants.LIST_SORT_FILTERS.POPULAR,
    value: 'Default',
  })
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const token = useSelector(state => state.UserReducer.userData.token) || ''
  const focus = useIsFocused()

  const getListData = () => {
    dispatch(
      getPopularWithCategoryList(
        encodeURIComponent(text),
        params.categoryId,
        sortOption.key,
        20,
        1,
        data => {
          console.log('data', data)
          console.log('data results ', data?.results)

          // if (data && data?.results?.length > 0) {
          setChannelData(data)
          // }
        },
        error => {
          console.log('Error in Api ', error)
        },
      ),
    )
  }

  useEffect(() => {
    if (focus === true) {
      getListData()
    }
  }, [sortOption, focus])

  const getPaginationData = async () => {
    if (channelData?.next !== null && channelData.results) {
      dispatch(setLoadingState(true))

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
        redirect: 'follow',
      }

      fetch(`${channelData?.next}&name=${text}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setChannelData({
            ...result,
            results: [
              ...(channelData && channelData.results),
              ...result.results,
            ],
          })
        })

        .catch(error => console.log('Error in getting new page', error))
        .finally(() => dispatch(setLoadingState(false)))
    }
  }

  useEffect(() => {}, [channelData])

  const onItemPress = channelDetails => {
    const formdata = new FormData()
    formdata.append('channel_id', channelDetails?.channel_id)
    dispatch(
      getChannelDetails(
        formdata,
        response => {
          console.log('Successfully called get Channel Details', response)
          navigationRef.navigate(ROUTES.CHANNEL_DETAILS, {
            channelDetails: response,
          })
        },
        err => {
          console.log('Error in calling get Channel Details', err)
        },
      ),
    )
  }

  const channelListItem = ({ item, index }) => (
    <View style={[styles.cardView, { marginLeft: index % 2 ? '4%' : 0 }]}>
      <Card
        cardContainerStyle={{
          width: '100%',
          paddingHorizontal: responsiveSize(10),
        }}
        onPress={() => onItemPress(item)}
      >
        <View style={styles.imgProfileView}>
          <Image
            resizeMode="contain"
            source={{
              uri: item?.profile_image,
            }}
            style={styles.imageStyles}
          />
        </View>
        <Text numberOfLines={1} style={styles.cardTitleText}>
          {item?.channel_name}
        </Text>
        <Text style={styles.cardText}>Followers: {item?.follower_count}</Text>
      </Card>
    </View>
  )

  return (
    <View style={styles.parentContainer}>
      <Header hasBackButton title="Popular" onPress={() => goBack()} />
      <View style={styles.container}>
        <View
          style={[styles.yourChannelView, { marginTop: responsiveSize(27) }]}
        >
          <Text style={styles.yourChannelText}>Popular </Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            autoComplete="off"
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor={Colors.silver}
            returnKeyType="search"
            selectionColor={Colors.white}
            style={styles.textInputStyles}
            value={text}
            onChangeText={text => {
              setText(text)
            }}
            onSubmitEditing={() => {
              getListData()
            }}
          />
          <Pressable
            style={styles.sortView}
            onPress={() => {
              setSortModalIsVisible(true)
            }}
          >
            <Image source={sortIcon} style={styles.sortIcon} />
          </Pressable>
        </View>
        <View style={styles.sortByView}>
          <Text style={styles.sortByText}>Sorted by: {sortOption.value}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{
              width: '100%',
            }}
            data={channelData?.results}
            numColumns={2}
            renderItem={channelListItem}
            showsVerticalScrollIndicator={false}
            onEndReached={getPaginationData}
          />
        </View>
      </View>
      <BottomSheet
        visible={sortModalIsVisible}
        onDismiss={() => setSortModalIsVisible(false)}
      >
        <View style={styles.modalParentView}>
          <Text style={styles.sortModalHeading}>Sort by</Text>

          <Pressable
            style={styles.rowView}
            onPress={() => {
              setSortOption({
                key: NamedConstants.LIST_SORT_FILTERS.POPULAR,
                value: 'Default',
              })
              setSortModalIsVisible(false)
            }}
          >
            <Text style={styles.sortOptionsText}>Default </Text>
            <View
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    sortOption.value === 'Default'
                      ? Colors.primary
                      : 'transparent',
                },
              ]}
            />
          </Pressable>
          <Pressable
            style={styles.rowView}
            onPress={() => {
              setSortOption({
                key: NamedConstants.LIST_SORT_FILTERS.DESC,
                value: 'Latest',
              })
              setSortModalIsVisible(false)
            }}
          >
            <Text style={styles.sortOptionsText}>Date Followed: Latest </Text>
            <View
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    sortOption.value === 'Latest'
                      ? Colors.primary
                      : 'transparent',
                },
              ]}
            />
          </Pressable>
          <Pressable
            style={styles.rowView}
            onPress={() => {
              setSortOption({
                key: NamedConstants.LIST_SORT_FILTERS.ASC,
                value: 'Earliest',
              })
              setSortModalIsVisible(false)
            }}
          >
            <Text style={styles.sortOptionsText}>Date Followed: Earliest </Text>
            <View
              style={[
                styles.radioButton,
                {
                  backgroundColor:
                    sortOption.value === 'Earliest'
                      ? Colors.primary
                      : 'transparent',
                },
              ]}
            />
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  )
}

export { SeeAllPopularCategoryList }
