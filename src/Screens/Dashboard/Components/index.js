/* eslint-disable react/prop-types */
import React from 'react'
import { TouchableOpacity, View, Pressable, Text } from 'react-native'

import { Card } from '@/Components'
import ChannelCard from '@/Components/ChannelCard'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'
import { Colors } from '@/Utils'

import { styles } from './styles'

export const SeeAll = ({ title, params }) => {
  const getNavRoute = () => {
    switch (title) {
      case 'Your Channels':
        return ROUTES.SEE_ALL_MYCHANNEL_LIST

      case 'Channels You Follow':
        return ROUTES.SEE_ALL_FOLLOWED_LIST

      case 'Popular Channels':
        return ROUTES.SEE_ALL_POPULAR_LIST

      case 'See All Popular':
        return ROUTES.SEE_ALL_POPULAR_CATEGORY_LIST

      default:
        return ROUTES.DASHBOARD
    }
  }
  return (
    <Pressable
      style={styles.seeAllView}
      onPress={() => {
        navigationRef.navigate(getNavRoute(title), params)
      }}
    >
      <Text style={styles.seeAllText}>See all</Text>
    </Pressable>
  )
}

export const Follow = ({ item, id, onFollowPress }) => (
  <TouchableOpacity
    style={[
      styles.followButton,
      { backgroundColor: item?.is_follow ? Colors.primary : 'transparent' },
    ]}
    onPress={onFollowPress}
  >
    <Text style={styles.followText}>
      {item?.is_follow ? 'Unfollow' : 'Follow'}
    </Text>
  </TouchableOpacity>
)

export const ChannelsYouFollow = ({ item, index, onItemPress }) => (
  <Card
    cardContainerStyle={styles.cardContainerStyle}
    onPress={() => onItemPress(item)}
  >
    <ChannelCard
      channelImageUri={item?.profile_image}
      channelName={item?.channel_name}
      channelUserId={item?.user?.id}
      channelUserName={item?.user?.username}
      followerCount={item?.follower_count}
      newThreadStatus={item?.read_status}
    />
  </Card>
)

export const PopularChannels = ({
  item,
  index,
  onItemPress,
  onFollowPress,
  userId,
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
      followerCount={item.follower_count}
      onFollowPress={onFollowPress}
    />
  </Card>
)
