import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image, TextInput, Pressable } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { sortIcon } from '@/Assets/Images'
import { Header, Card, BottomSheet } from '@/Components'
import { NamedConstants, ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'
import {
  getChannelDetails,
  getFollowedChannelList,
} from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

const SeeAllFollowedList = () => {
  const [channelData, setChannelData] = useState()
  const [sortModalIsVisible, setSortModalIsVisible] = useState(false)
  const [sortOption, setSortOption] = useState({
    key: 'Default',
    value: 'Default',
  })
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const token = useSelector(state => state.UserReducer.userData.token) || ''

  const getListData = () => {
    dispatch(setLoadingState(true))
    dispatch(
      getFollowedChannelList(
        sortOption.key,
        20,
        1,
        encodeURIComponent(text),
        data => {
          // if (data && data?.results?.length > 0) {
          setChannelData(data)
          // }
          dispatch(setLoadingState(false))
        },
        error => {
          console.log('Error in Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }
  useEffect(() => {
    getListData()
  }, [sortOption])

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
    formdata.append('channel_id', channelDetails?.channel)
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
        cardContainerStyle={styles.cardContainerStyle}
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
      <Header hasBackButton title="Following" onPress={() => goBack()} />
      <View style={styles.container}>
        <View
          style={[styles.yourChannelView, { marginTop: responsiveSize(27) }]}
        >
          <Text style={styles.yourChannelText}>Channels You Follow</Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.silver}
            returnKeyType="search"
            selectionColor={Colors.white}
            style={styles.textInputStyles}
            value={text}
            onChangeText={value => {
              setText(value)
              // setChannelData({ ...channelData, results: searchChannel(text) })
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
        <View style={styles.flatListView}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
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
              setSortOption({ key: 'Default', value: 'Default' })
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

export { SeeAllFollowedList }
