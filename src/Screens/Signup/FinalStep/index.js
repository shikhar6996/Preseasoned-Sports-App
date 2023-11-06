import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import {
  blankRectangle,
  defaultAvatar,
  pinIcon,
  blankRectangleSelected,
} from '@/Assets/Images'
import { Header, Button } from '@/Components'

import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { registerRequest } from '@/Store/Reducers/User'
import { Colors } from '@/Utils'

import { styles } from './styles'

const FinalProfile = navigation => {
  const [agreed, setAgreed] = useState(false)

  const { fcmToken } = useSelector(state => state.UserReducer)
  console.log(fcmToken, 'fcmToken from final Step ')

  const { params } = navigation?.route || {}

  const dispatch = useDispatch()

  const registerUser = () => {
    dispatch(setLoadingState(true))

    const formdata = new FormData()
    formdata.append('device_token', fcmToken)

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== '') formdata.append(key, value)
      }
      console.log('Register Request formdata ---', formdata)
      dispatch(
        registerRequest(
          formdata,
          () => {
            dispatch(setLoadingState(false))
            navigationRef.navigate(ROUTES.DASHBOARD)
          },
          () => {
            dispatch(setLoadingState(false))
          },
        ),
      )
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Confirm Account"
        onPress={() => {
          goBack()
        }}
      />

      <ScrollView style={[styles.mainView, styles.contentContainerStyle]}>
        <View style={styles.thatsItView}>
          <Text style={styles.thatsItText}>That's it!</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.description}>
            You’re done. You can confirm your {'\n'}profile or go back and edit.
          </Text>
        </View>
        <View style={styles.parentProfileContainer}>
          <View style={styles.imageView}>
            <View style={styles.profileImageStyles}>
              <Image
                resizeMode="contain"
                source={
                  params && params?.profile_image
                    ? { uri: (params && params?.profile_image.uri) || '' }
                    : defaultAvatar
                }
                style={styles.profileImageStyles}
              />
            </View>
            <Text style={styles.displayNameText}>
              {params.display_name || ''}
            </Text>
            <Text style={styles.userNameText}>@{params?.username || ''}</Text>
          </View>
        </View>

        <View style={styles.tacWrapper}>
          <TouchableOpacity
            style={styles.imgView}
            onPress={() => {
              setAgreed(!agreed)
            }}
          >
            <Image
              source={agreed ? blankRectangleSelected : blankRectangle}
              style={styles.blankRectangleImage}
            />
          </TouchableOpacity>

          <View style={styles.tacTextWrapper}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.tacText}>I agree to </Text>
              <Text
                onPress={() => {
                  navigationRef.navigate(ROUTES.TERMS_AND_CONDITIONS)
                }}
                style={{ ...styles.tacText, textDecorationLine: 'underline' }}
              >
                terms & conditions
              </Text>
            </View>
            <Text
              onPress={() => {
                navigationRef.navigate(ROUTES.PRIVACY_POLICY)
              }}
              style={{ ...styles.tacText, marginTop: 10 }}
            >
              <Text>and </Text>
              <Text style={{ textDecorationLine: 'underline' }}>
                privacy policy
              </Text>
            </Text>
          </View>
        </View>

        <Button
          containerStyle={{
            backgroundColor: agreed ? Colors.primary : Colors.darkLiver,
          }}
          onPress={() => {
            if (agreed) registerUser()
          }}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </Button>
      </ScrollView>
    </View>
  )
}

export { FinalProfile }
