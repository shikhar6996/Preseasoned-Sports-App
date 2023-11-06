/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Image } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { Header, Card } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef, goBack } from '@/Navigators/utils'
import {
  getAnotherUserChannelDetails,
  getChannelDetails,
  getChannelList,
} from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { responsiveSize } from '@/Utils'

import { styles } from './styles'

const SeeAllMyChannelList = props => {
  const [channelData, setChannelData] = useState()
  const dispatch = useDispatch()
  const token = useSelector(state => state.UserReducer.userData.token) || ''
  const { params } = props?.route ?? {}

  useEffect(() => {
    dispatch(setLoadingState(true))
    if (params && params.channelOwnerId) {
      dispatch(
        getAnotherUserChannelDetails(
          params.channelOwnerId,
          20,
          1,
          response => {
            if (response && response?.code === 200) {
              setChannelData(response)
              dispatch(setLoadingState(false))
            }
          },
          error => {
            console.log('Error in Api ', error)
            dispatch(setLoadingState(false))
          },
        ),
      )
    } else {
      dispatch(
        getChannelList(
          20,
          1,
          data => {
            if (data && data?.results?.length > 0) {
              setChannelData(data)
            }
            dispatch(setLoadingState(false))
          },
          error => {
            console.log('Error in Api ', error)
            dispatch(setLoadingState(false))
          },
        ),
      )
    }
  }, [])

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

      fetch(channelData?.next, requestOptions)
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
      <Header
        hasBackButton
        title={params && params.channelOwner ? 'Channels' : 'My Channels'}
        onPress={goBack}
      />

      <View style={styles.container}>
        <View
          style={[styles.yourChannelView, { marginTop: responsiveSize(27) }]}
        >
          <Text style={styles.yourChannelText}>
            {params && params.channelOwner
              ? `${params.channelOwner}'s Channels`
              : 'My Channels'}
          </Text>
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
    </View>
  )
}

export { SeeAllMyChannelList }
