/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import {
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native'

import { useIsFocused } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'

import { addIcon, folder } from '@/Assets/Images'
import { Header, Card, SubscribeChannelModal } from '@/Components'
import ChannelCard from '@/Components/ChannelCard'
import { NamedConstants, ROUTES } from '@/Constants'
import { navigationRef, goBack } from '@/Navigators/utils'
import { SeeAll } from '@/Screens/Dashboard/Components'

import {
  followUnfollowChannel,
  getChannelDetails,
  getPopularWithCategoryList,
} from '@/Store/Reducers/Channels'
import { Colors } from '@/Utils'

import { styles } from './styles'

const ItemSeparatorComponent = () => (
  <View style={styles.itemSeparatorComponent} />
)

const PopularChannelCategory = ({
  item,
  index,
  onItemPress,
  onFollowPress,
}) => (
  <Card
    cardContainerStyle={styles.cardContainerStyle}
    onPress={() => onItemPress(item)}
  >
    <ChannelCard
      channel={item}
      channelImageUri={item?.profile_image}
      channelName={item?.channel_name}
      channelUserId={item?.user?.id}
      channelUserName={item?.user?.username}
      followerCount={item?.follower_count}
      onFollowPress={() => onFollowPress(item, index)}
    />
  </Card>
)

const ChannelHeader = ({ title, style, arrayList, selectedSport }) => (
  <View style={[styles.yourChannelView, style]}>
    <Text style={styles.yourChannelText}>{title}</Text>
    {arrayList?.count > 5 && (
      <SeeAll
        params={{ categoryId: selectedSport?.id }}
        title="See All Popular"
      />
    )}
  </View>
)

export const SelectedSports = ({ route }) => {
  const dispatch = useDispatch()
  const focus = useIsFocused()
  // const userData = useSelector(state => state.UserReducer.userData)
  // const userId = userData?.user_profile?.id
  const [popularChannelList, setPopularChannelList] = useState()
  const [text, setText] = useState('')
  const [isSearchTextEnabled, setSearchTextEnabled] = useState(false)
  const [selectedSport, setSelectedSport] = useState(
    route?.params?.selectedSport,
  )

  const [openModal, setOpenModal] = useState(false)
  const [itemClicked, setItemClicked] = useState(null)

  useEffect(() => {
    if (!openModal) {
      setItemClicked(null)
    }
  }, [openModal])

  const getInitialChannels = () => {
    dispatch(
      getPopularWithCategoryList(
        encodeURIComponent(text),
        selectedSport?.id,
        'popular',
        5,
        1,
        data => {
          if (data) {
            setPopularChannelList(data)
            if (text === '') {
              setSearchTextEnabled(false)
            } else {
              setSearchTextEnabled(true)
            }
          }
        },
        error => {
          console.log('Error in Api ', error)
        },
      ),
    )
  }
  useEffect(() => {
    if (focus === true) {
      getInitialChannels()
      console.log('Focus called,', selectedSport)
      setOpenModal(false)
    }
    return () => {
      setOpenModal(false)
    }
  }, [focus])

  const onFollowPress = (item, index, changeStep) => {
    const formdata = new FormData()
    formdata.append('channel_id', item?.channel_id)
    formdata.append(
      'type',
      item?.is_follow
        ? NamedConstants.FOLLOW_TYPE.UNFOLLOW
        : NamedConstants.FOLLOW_TYPE.FOLLOW,
    )
    dispatch(
      followUnfollowChannel(
        formdata,
        response => {
          console.log('Successfully called followUnfollPowAI', response)
          if (response.code === 200) {
            if (typeof changeStep === 'function') {
              changeStep()
            }
            const newData = popularChannelList
            newData.results[index].is_follow =
              !newData.results[index]?.is_follow
            if (newData.results[index].is_follow) {
              newData.results[index].follower_count += 1
            } else {
              newData.results[index].follower_count -= 1
            }
            setPopularChannelList({ ...newData })
          }
        },
        err => {
          console.log('Error in calling get Channel Details', err)
        },
      ),
    )
    setOpenModal(false)
  }

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
        error => {
          console.log('Error in calling get Channel Details', error)
        },
      ),
    )
  }

  return (
    <View style={styles.headerView}>
      <Header
        hasBackButton
        title={selectedSport.title}
        onPress={() => {
          goBack()
        }}
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.mainView}
      >
        <View style={styles.welcomeView}>
          <Text style={styles.name}>{selectedSport.title}</Text>
          <View style={styles.folderView}>
            <Pressable
              onPress={() => {
                navigationRef.navigate(ROUTES.WALLET_SCREEN)
              }}
            >
              <Image source={folder} style={styles.imgIcon} />
            </Pressable>
            <Pressable
              onPress={() =>
                navigationRef.navigate(ROUTES.CREATECHANNEL, {
                  lastScreen: ROUTES.SELECTED_SPORTS,
                })
              }
            >
              <Image source={addIcon} style={styles.imgIcon} />
            </Pressable>
          </View>
        </View>

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
            // setChannelData({ ...channelData, results: searchChannel(text) })
          }}
          onSubmitEditing={() => {
            getInitialChannels()
          }}
        />

        {popularChannelList && (
          <ChannelHeader
            arrayList={popularChannelList}
            selectedSport={selectedSport}
            style={styles.channelHeader}
            title={
              !isSearchTextEnabled
                ? `Popular in ${selectedSport.title}`
                : `Results for : ${text}`
            }
          />
        )}

        {popularChannelList &&
          popularChannelList.results &&
          popularChannelList.results.length > 0 && (
            <FlatList
              horizontal
              data={popularChannelList?.results}
              ItemSeparatorComponent={ItemSeparatorComponent}
              keyExtractor={(_, index) => `PopularChannelListkey${index}`}
              renderItem={({ item, index }) => (
                <PopularChannelCategory
                  index={index}
                  item={item}
                  onFollowPress={() => {
                    setItemClicked({ item, index })
                    if (item.subscription_price > 0 && !item.is_follow) {
                      setOpenModal(true)
                    } else {
                      onFollowPress(item, index)
                    }
                  }}
                  onItemPress={onItemPress}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          )}
        {popularChannelList &&
          popularChannelList.results &&
          Array.isArray(popularChannelList.results) &&
          popularChannelList.results.length === 0 && (
            <Text style={styles.noDataFoundText}>Sorry, no results found.</Text>
          )}
      </ScrollView>
      {openModal && (
        <SubscribeChannelModal
          cancelPress={() => {
            setOpenModal(false)
          }}
          channelId={itemClicked?.item?.channel_id}
          customStyles={{
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          outsideAreaDisabled={false}
          subscription_price={itemClicked?.item?.subscription_price || 0}
          onConfirmPress={data => {
            onFollowPress(itemClicked?.item, itemClicked?.index, data)
          }}
          onOutsidePress={() => {
            setOpenModal(false)
          }}
        />
      )}
    </View>
  )
}
