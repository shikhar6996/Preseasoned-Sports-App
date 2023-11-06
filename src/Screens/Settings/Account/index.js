/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, Text, View, Modal } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import {
  arrowRight,
  KycIcon,
  Lock,
  SubscriptionIcon,
  Wallet,
} from '@/Assets/Images'
import { Header } from '@/Components'
import { ROUTES } from '@/Constants'
import {
  navigateAndSimpleReset,
  navigationRef,
  goBack,
} from '@/Navigators/utils'

import { getKycStatus } from '@/Store/Reducers/Common/KycStatusReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { styles } from './styles'
import { Colors } from '@/Utils'
import { logoutUser } from '@/Store/Reducers/User'
import { setActiveTab } from '@/Store/Reducers/Common/BottomTabReducer'
import { userDeleteService } from '@/Services/modules/user/userDeleteService'

const AccountOptions = [
  { id: 0, iconImage: Lock, title: 'Change Password' },
  { id: 1, iconImage: Wallet, title: 'Wallet' },
  { id: 2, iconImage: KycIcon, title: 'KYC' },
  { id: 3, iconImage: SubscriptionIcon, title: 'Delete Account' },
  // { id: 3, iconImage: SubscriptionIcon, title: 'My Subscriptions' },
]

const AccountScreen = props => {
  const [kycStatus, setKycStatus] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const dispatch = useDispatch()
  const userData = useSelector(state => state.UserReducer.userData)
  const { username, profile_image, email, token } = userData?.user_profile || {}

  const handleOptionPress = value => {
    switch (value) {
      case 0:
        navigationRef.navigate(ROUTES.CHANGE_PASSWORD)
        break
      case 1:
        dispatch(setLoadingState(true))
        navigationRef.navigate(ROUTES.WALLET_SCREEN)
        break
      case 2:
        navigationRef.navigate(ROUTES.KYC_STEP1)
        break
      case 3:
        setIsModalVisible(true)
        break
      case 4:
        navigationRef.navigate(ROUTES.MY_SUBSCRIPTION_SCREEN)
        break
      default:
        break
    }
  }

  const getKYCStatus = () => {
    dispatch(
      getKycStatus(
        response => {
          if (response && response.code === 200) {
            setKycStatus(response)
            if (response?.kyc_status === true) {
              Alert.alert('', 'KYC already submitted.')
            } else {
              navigationRef.navigate(ROUTES.KYC_STEP1)
            }
          }
        },
        error => {
          console.log('Error in Api', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  useEffect(() => {
    dispatch(
      getKycStatus(
        response => {
          if (response && response.code === 200) {
            setKycStatus(response)
          } else {
            setLoadingState(false)
          }
        },
        error => {
          console.log('Error in Api', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }, [])

  const handleUserDeleteService = () => {
    setLoadingState(true)
    userDeleteService(token)
      .then(response => {
        setLoadingState(false)
        console.log(response, '======USERSERVICE Deleted ====')
        if (response && response.code === 200) {
          console.log(response, '======response 200 ====')
          dispatch(logoutUser())
          navigateAndSimpleReset(ROUTES.ONBOARDING)
          dispatch(setActiveTab(0))
        } else {
          console.log('else played ')
        }
      })
      .catch(err => {
        console.log(err, 'Failed to Delete the user profile')
        setLoadingState(false)
      })
  }

  return (
    <View style={styles.parentHeaderView}>
      <Header hasBackButton title="Account" onPress={goBack} />
      <View style={styles.mainView}>
        {AccountOptions.map((item, index) => (
          <Pressable
            key={index.toString()}
            style={styles.optionWrapper}
            onPress={() => {
              if (index === 2) {
                // if (kycStatus?.kyc_status) {
                //   Alert.alert('', 'KYC already submitted.')
                // } else {
                //   navigationRef.navigate(ROUTES.KYC_STEP1)
                // }
                getKYCStatus()
              } else {
                handleOptionPress(index)
              }
            }}
          >
            <View style={styles.optionDescWrapper}>
              <Image source={item.iconImage} style={styles.iconPicture} />
              <Text style={styles.title}> {item.title}</Text>
            </View>
            <View>
              <Image source={arrowRight} style={styles.arrow} />
            </View>
          </Pressable>
        ))}
      </View>

      <Modal
        transparent
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.parentModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.confirmationText}>
              Are you sure you want to
            </Text>
            <Text style={styles.confirmationText}>delete this user?</Text>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[
                  styles.pressableStyles,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={() => {
                  setIsModalVisible(false)
                  handleUserDeleteService()
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </Pressable>
              <Pressable
                style={styles.pressableStyles}
                onPress={() => {
                  setIsModalVisible(false)
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
export { AccountScreen }
