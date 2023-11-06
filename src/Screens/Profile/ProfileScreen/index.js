/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { Image, Text, View, Pressable, ScrollView } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'
import { getChannelDetails, getChannelList } from '@/Store/Reducers/Channels'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { Colors, responsiveSize } from '@/Utils'

import { YourChannels } from './components/Channels'
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
const ProfileScreen = () => {
  const dispatch = useDispatch()
  const userData = useSelector(state => state.UserReducer.userData)
  const [channelList, setChannelList] = useState([])
  const focus = useIsFocused()

  const { display_name, username, bio, profile_image, category } =
    userData?.user_profile || {}

  const getYourChannels = () => {
    // dispatch(setLoadingState(true))
    dispatch(
      getChannelList(
        5,
        1,
        channeldata => {
          if (channeldata && channeldata?.code === 200) {
            setChannelList(channeldata)
            dispatch(setLoadingState(false))
          }
        },
        error => {
          dispatch(setLoadingState(false))
          console.log('Error in Api ', error)
        },
      ),
    )
  }
  useEffect(() => {
    if (focus === true) {
      getYourChannels()
    }
  }, [focus])

  const onItemPress = channelDetails => {
    const formdata = new FormData()
    formdata.append('channel_id', channelDetails?.channel)
    dispatch(
      getChannelDetails(
        formdata,
        response => {
          console.log('Successfully called get Channel Details', response)
          navigationRef.navigate(ROUTES.CHANNEL_DETAILS, {
            lastScreen: ROUTES.PROFILESCREEN,
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
    <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <Header title="Profile" />
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
                <Text style={styles.nameText}>{display_name || ''} </Text>
                <Text style={styles.usernameText}>{`@${username}`}</Text>
                <Text style={styles.bioText}>{bio || ''}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    navigationRef.navigate(ROUTES.EDIT_PROFILE_SCREEN, {
                      username: { username },
                    })
                  }
                >
                  <Text style={styles.editBtnText}> Edit Your Profile</Text>
                </Pressable>
                {channelList?.count > 0 && (
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      navigationRef.navigate(ROUTES.CREATECHANNEL, {
                        lastScreen: ROUTES.PROFILESCREEN,
                      })
                    }}
                  >
                    <Text style={styles.editBtnText}> Create a channel </Text>
                  </Pressable>
                )}
              </View>
            </View>
            {category && category.length > 0 && (
              <Text style={styles.interestHeading}> Your interests </Text>
            )}
            <View style={styles.mainCategoryView}>
              {category &&
                category.length > 0 &&
                category.map(item => <Item key={item.id} {...item} />)}
            </View>
            <View style={styles.channelHeaderView}>
              {channelList.count > 0 && (
                <Text style={styles.yourChannelText}>My channels</Text>
              )}
              {channelList?.count > 5 && (
                <Pressable
                  style={styles.seeAllView}
                  onPress={() => {
                    navigationRef.navigate(ROUTES.SEE_ALL_MYCHANNEL_LIST)
                  }}
                >
                  <Text style={styles.seeAllText}>See all</Text>
                </Pressable>
              )}
            </View>

            {channelList?.count === 0 && (
              <Button
                containerStyle={styles.createChannelBtn}
                onPress={() => {
                  navigationRef.navigate(ROUTES.CREATECHANNEL, {
                    lastScreen: ROUTES.PROFILESCREEN,
                  })
                }}
              >
                <Text style={styles.createchannelBtnText}>
                  Create a channel
                </Text>
              </Button>
            )}

            <FlatList
              horizontal
              contentContainerStyle={{ marginBottom: responsiveSize(50) }}
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
export { ProfileScreen }
