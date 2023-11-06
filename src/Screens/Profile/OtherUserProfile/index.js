/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { Image, Text, View, Pressable, ScrollView } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import { Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef, goBack, push } from '@/Navigators/utils'
import {
  getAnotherUserChannelDetails,
  getChannelDetails,
} from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'

import { YourChannels } from '../ProfileScreen/components/Channels'
import { styles } from './styles'

const Item = ({ category_title, category_profile }) => (
  <View style={[styles.item, { backgroundColor: Colors.secondary }]}>
    <Image
      source={{ uri: category_profile }}
      style={[
        styles.img,
        {
          tintColor: Colors.silver,
          height: '100%',
          width: '100%',
        },
      ]}
    />
    <Text style={styles.cardText}>{category_title}</Text>
  </View>
)
const ChannelFlatListSeperator = () => (
  <View style={{ width: responsiveSize(30) }} />
)
const OtherUserProfileScreen = props => {
  const dispatch = useDispatch()
  const { channelUserId, anotherUser } = props?.route?.params || ''
  const [channelList, setChannelList] = useState({})
  const [channelOwnerId, setChannelOwnerId] = useState(channelUserId)

  const { display_name, username, bio, profile_image, category } =
    anotherUser || {}

  const getYourChannels = () => {
    dispatch(setLoadingState(true))
    dispatch(
      getAnotherUserChannelDetails(
        channelOwnerId,
        5,
        1,
        response => {
          if (response && response?.code === 200) {
            setChannelList(response)
            dispatch(setLoadingState(false))
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
  useEffect(() => {
    getYourChannels()
  }, [])

  const onItemPress = channelDetails => {
    const formdata = new FormData()
    formdata.append('channel_id', channelDetails?.channel)
    dispatch(
      getChannelDetails(
        formdata,
        response => {
          console.log('Successfully called get Channel Details', response)
          push(ROUTES.CHANNEL_DETAILS, {
            lastScreen: ROUTES.OTHER_USER_PROFILE,
            channelDetails: response,
          })
        },
        err => {
          console.log('Error in calling get Channel Details', err)
        },
      ),
    )
  }
  return (
    <View style={{ backgroundColor: Colors.secondary, flex: 1 }}>
      <Header hasBackButton title="Profile" onPress={goBack} />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.insideContainer}>
            <View style={styles.userInfoContainer}>
              <View style={styles.profilePictureView}>
                <Image
                  source={{ uri: profile_image }}
                  style={styles.defaultAvatarImg}
                />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.nameText}>{display_name || ''}</Text>
                <Text style={styles.usernameText}>{`@${username}`}</Text>
                <Text style={styles.bioText}>{bio || ''}</Text>
              </View>
            </View>
            {category && category.length > 0 && (
              <Text style={styles.interestHeading}>
                {`${username}'s`} interests
              </Text>
            )}
            <View style={styles.mainCategoryView}>
              {category &&
                category.length > 0 &&
                category.map(item => <Item key={item.id} {...item} />)}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: responsiveSize(30),
              }}
            >
              {channelList.count > 0 && (
                <Text style={styles.yourChannelText}>
                  {`@${username}'s`} channels
                </Text>
              )}
              {channelList?.count > 5 && (
                <Pressable
                  style={styles.seeAllView}
                  onPress={() => {
                    navigationRef.navigate(ROUTES.SEE_ALL_MYCHANNEL_LIST, {
                      channelOwnerId,
                      channelOwner: username,
                    })
                  }}
                >
                  <Text style={styles.seeAllText}>See all</Text>
                </Pressable>
              )}
            </View>

            <FlatList
              horizontal
              data={channelList?.results}
              ItemSeparatorComponent={ChannelFlatListSeperator}
              keyExtractor={(_, idx) => `userChannelsKey${idx}`}
              renderItem={({ item, index }) => (
                <YourChannels item={item} onItemPress={onItemPress} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
export { OtherUserProfileScreen }
