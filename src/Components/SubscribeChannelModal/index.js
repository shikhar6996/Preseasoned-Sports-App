/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react'

import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native'

import { useDispatch } from 'react-redux'

import { Lock } from '@/Assets/Images'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'
import {
  subscribeChannelRequest,
  walletDetailsRequest,
} from '@/Store/Reducers/subscription'
import { Colors, responsiveSize } from '@/Utils'

import { Card } from '../Card'
import { styles } from './styles'

export const SubscribeChannelModal = props => {
  const {
    subscription_price,
    onConfirmPress,
    goToChannelPress,
    channelId,
    cancelPress,
    customStyles,
    outsideAreaDisabled = true,
    onOutsidePress = () => {},
  } = props
  const dispatch = useDispatch()
  const [remainingBalance, setRemainingBalance] = useState(null)
  const [step, setStep] = useState('unsubscribed')

  useEffect(() => {
    if (subscription_price > 0) {
      dispatch(
        walletDetailsRequest(
          response => {
            if (response && response?.code === 200) {
              setRemainingBalance(
                (response?.wallet_balance || 0) - subscription_price,
              )
            }
          },
          error => {
            console.log('Error in Api ', error)
          },
        ),
      )
    }
  }, [subscription_price])

  const subscribeChannelAPICall = () => {
    const data = new FormData()
    data.append('channel_id', channelId)

    dispatch(
      subscribeChannelRequest(
        data,
        response => {
          if (response && response?.code === 200) {
            if (typeof onConfirmPress === 'function') {
              onConfirmPress(() => {
                setStep('subscribed')
              })
            }
          }
        },
        error => {
          console.log('Error in Api ', error)
        },
      ),
    )
  }

  return (
    <>
      {step !== '' && remainingBalance !== null && (
        <Pressable
          disabled={outsideAreaDisabled}
          style={[styles.mainContainer, customStyles]}
          onPress={onOutsidePress}
        >
          <View style={styles.innerContainer}>
            {step === 'unsubscribed' && (
              <>
                <View style={styles.imgStyles}>
                  <Image source={Lock} style={styles.lockStyles} />
                </View>

                <Card cardContainerStyle={styles.lockedSubscriptionCard}>
                  {remainingBalance < 0 && (
                    <>
                      <Text style={styles.subToChannelText}>
                        Your balance is insufficient to subscribe to this
                        channel. To add coins to your wallet, visit the wallet
                        page.
                      </Text>
                      <TouchableOpacity
                        style={styles.subscribeButton}
                        onPress={() => {
                          navigationRef.navigate(ROUTES.WALLET_SCREEN)
                        }}
                      >
                        <Text style={styles.subscribeText}>Wallet</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {remainingBalance >= 0 && (
                    <>
                      <Text
                        style={{ ...styles.subToChannelText, marginTop: 5 }}
                      >
                        Subscribe to Channel for {subscription_price} coins per
                        month.
                      </Text>
                      <Text style={styles.subToChannelText}>
                        Your remaining balance will be {remainingBalance} coins.
                      </Text>
                      <Text
                        style={[
                          styles.subToChannelText,
                          { marginTop: responsiveSize(10) },
                        ]}
                      >
                        Are you sure you want to subscribe to this channel?
                      </Text>
                      <TouchableOpacity
                        style={styles.subscribeButton}
                        onPress={() => {
                          setStep('subscribe')
                        }}
                      >
                        <Text style={styles.subscribeText}>Subscribe</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Card>
              </>
            )}
            {step === 'subscribe' && (
              <Card cardContainerStyle={styles.cardContainerStyle}>
                <Text style={styles.confirmationText}>
                  Confirm subscription?
                </Text>
                <View style={styles.buttonWrapper}>
                  <Pressable
                    style={styles.pressableStyles}
                    onPress={() => {
                      if (typeof cancelPress === 'function') {
                        cancelPress()
                      }
                      setStep('unsubscribed')
                    }}
                  >
                    <Text
                      style={{
                        ...styles.buttonText,
                        color: Colors.secondary,
                      }}
                    >
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.pressableStyles,
                      { backgroundColor: Colors.primary },
                    ]}
                    onPress={subscribeChannelAPICall}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </Pressable>
                </View>
              </Card>
            )}
            {step === 'subscribed' && (
              <Card cardContainerStyle={styles.cardContainerStyle}>
                <Text style={styles.confirmationText}>Subscribed!</Text>

                <Pressable
                  style={styles.gotoChannelBtn}
                  onPress={() => {
                    setStep('')

                    if (typeof goToChannelPress === 'function')
                      goToChannelPress()
                  }}
                >
                  <Text style={styles.gotoChannelText}>Go to Channel</Text>
                </Pressable>
              </Card>
            )}
          </View>
        </Pressable>
      )}
    </>
  )
}
