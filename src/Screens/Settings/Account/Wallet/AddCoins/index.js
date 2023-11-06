/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  Pressable,
} from 'react-native'

import { Slider } from 'react-native-elements'
import {
  requestPurchase,
  purchaseUpdatedListener,
  purchaseErrorListener,
  getProducts,
} from 'react-native-iap'
import { useDispatch, useSelector } from 'react-redux'

import { rupee } from '@/Assets/Images'
import { Button, Card, Header } from '@/Components'
import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { addCoins } from '@/Store/Reducers/subscription'
import { Colors } from '@/Utils'

import { styles } from './styles'
import crashlytics from '@react-native-firebase/crashlytics'
import analytics from '@react-native-firebase/analytics'

const Rupees = [
  {
    id: '1',
    title: 'INR 29',
  },
  {
    id: '2',
    title: 'INR 89',
  },
  {
    id: '3',
    title: 'INR 269',
  },
  {
    id: '4',
    title: 'INR 899',
  },
  {
    id: '5',
    title: 'INR 2999',
  },
  {
    id: '6',
    title: 'INR 9900',
  },
]

const Coins = [
  {
    id: '1',
    title: '1000 coins',
    productId: 'com.pre.seasoned.1000coins',
    coins: 1000,
  },
  {
    id: '2',
    title: '3000 coins',
    productId: 'com.pre.seasoned.3000coins',
    coins: 3000,
  },
  {
    id: '3',
    title: '9000 coins',
    productId: 'com.pre.seasoned.9000coins',
    coins: 9000,
  },
  {
    id: '4',
    title: '30,000 coins',
    productId: 'com.pre.seasoned.30000coins',
    coins: 30000,
  },
  {
    id: '5',
    title: '100,000 coins',
    productId: 'com.pre.seasoned.100000coins',
    coins: 100000,
  },
  {
    id: '6',
    title: '300,000 coins',
    productId: 'com.pre.seasoned.300000coins',
    coins: 300000,
  },
]

const Item = ({ title, selected, handleSelection, index }) => (
  <View style={styles.rupeesView}>
    <Pressable
      style={[
        styles.highlightedViewRupees,
        {
          backgroundColor:
            selected === index + 1 ? Colors.darkLiver : 'transparent',
        },
      ]}
      onPress={() => handleSelection(index + 1)}
    >
      <Text style={styles.amountINR}>{title}</Text>
    </Pressable>
    {selected === index + 1 && <View style={styles.rightTriangle} />}
  </View>
)

const Item1 = ({ title, selected, handleSelection, index }) => (
  <View style={styles.coinsView}>
    {console.log('index', 'selected', 'Item1', index, selected)}
    {index + 1 === selected && <View style={styles.leftTriangleStyles} />}
    <Pressable
      style={[
        styles.highlightedViewCoins,
        {
          backgroundColor:
            selected === index + 1 ? Colors.darkLiver : 'transparent',
        },
      ]}
      onPress={() => handleSelection(index + 1)}
    >
      <Text style={styles.amountCoins}>{title}</Text>
    </Pressable>
  </View>
)

const AddCoinsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  let selectedCoins = Coins[0].coins

  const [selected, setSelected] = useState(1)
  const [buyIsLoading, setBuyIsLoading] = useState(false)
  const dispatch = useDispatch()
  const handleSelection = value => {
    setSelected(value)
    selectedCoins = Coins[value - 1].coins
  }

  const userData = useSelector(state => state.UserReducer.userData)
  const userId = userData?.user_profile?.id

  let purchaseUpdateSubscription = null
  let purchaseErrorSubscription = null
  let transactionId = 0

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
      console.log('purchase', purchase)

      const receipt = purchase.transactionReceipt

      if (receipt) {
        try {
          if (Platform.OS === 'ios') {
            // finishTransactionIOS(purchase.transactionId)
          } else if (Platform.OS === 'android') {
            // eslint-disable-next-line no-use-before-define
            if (transactionId !== purchase?.transactionId) {
              // eslint-disable-next-line react-hooks/exhaustive-deps
              transactionId = purchase?.transactionId
              // eslint-disable-next-line no-use-before-define, no-alert
              let coinsCount = purchase?.productId.replace(
                'com.pre.seasoned.',
                '',
              )
              coinsCount = coinsCount.replace('coins', '')
              if (coinsCount) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                selectedCoins = coinsCount
              }
              // eslint-disable-next-line no-use-before-define
              addCoinsInUserWallet()
            }
          }

          crashlytics().log('success receipt for ' + userId + '=>' + receipt)
          analytics().logEvent('success', {
            userId: userId,
            data: String(receipt),
          })
        } catch (ackErr) {
          console.log('ackErr INAPP>>>>', ackErr)
          crashlytics().log('failure receipt for ' + userId + '=>' + purchase)
          analytics().logEvent('failure', {
            userId: userId,
            data: String(purchase),
          })
        }
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    purchaseErrorSubscription = purchaseErrorListener(error => {
      console.log('purchaseErrorListener INAPP>>>>', error)
    })
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove()

        purchaseUpdateSubscription = null
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove()

        purchaseErrorSubscription = null
      }
    }
  }, [])

  const addCoinsInUserWallet = () => {
    console.log(`coins=>${selectedCoins}`)
    const formdata = new FormData()
    formdata.append('coins', selectedCoins)
    dispatch(setLoadingState(true))
    dispatch(
      addCoins(
        formdata,
        response => {
          if (response.code === 200) {
            console.log('response from addCoins', response)
            dispatch(setLoadingState(false))
            navigationRef.navigate(ROUTES.ADD_COINS_CONFIRMATION, {
              paymentSuccess: true,
            })
          } else {
            dispatch(setLoadingState(false))
            navigationRef.navigate(ROUTES.ADD_COINS_CONFIRMATION, {
              paymentSuccess: false,
            })
          }
        },
        err => {
          console.log('Error in calling get Channel Details', err)
          dispatch(setLoadingState(false))
          navigationRef.navigate(ROUTES.ADD_COINS_CONFIRMATION, {
            paymentSuccess: false,
          })
        },
      ),
    )
  }
  const itemSubs = [
    'com.pre.seasoned.1000coins',
    'com.pre.seasoned.3000coins',
    'com.pre.seasoned.9000coins',
    'com.pre.seasoned.30000coins',
    'com.pre.seasoned.100000coins',
    'com.pre.seasoned.300000coins',
  ]

  const getItems = async () => {
    try {
      console.log('itemSubs', itemSubs)
      const Products = await getProducts({ skus: itemSubs })
      console.log('products', Products)
    } catch (err) {
      console.log('IAP error', err.code, err.message)
    }
  }

  const handlePurchase = async () => {
    setBuyIsLoading(true)
    try {
      await requestPurchase(
        Platform.OS === 'ios'
          ? {
              sku: Coins[selected - 1].productId,
              andDangerouslyFinishTransactionAutomaticallyIOS: false,
            }
          : {
              skus: [Coins[selected - 1].productId],
            },
      )
        .then(async result => {
          console.log('IAP req sub', result)

          if (Platform.OS === 'android') {
            // setPurchaseToken(result.purchaseToken)
            // setPackageName(result.packageNameAndroid)
            // setProductId(result.productId)
            // can do your API call here to save the purchase details of particular user
          } else if (Platform.OS === 'ios') {
            console.log(result.transactionReceipt)

            // setProductId(result.productId)

            // setReceipt(result.transactionReceipt)

            // can do your API call here to save the purchase details of particular user
            if (result.transactionReceipt) {
              selectedCoins = Coins[selected - 1].coins
              addCoinsInUserWallet()
            }
          }
          setBuyIsLoading(false)
        })

        .catch(err => {
          setBuyIsLoading(false)
          getItems()
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message)
          navigationRef.navigate(ROUTES.ADD_COINS_CONFIRMATION, {
            paymentSuccess: false,
          })
        })

      setBuyIsLoading(false)
    } catch (error) {
      console.warn(`IAP req ERROR %%%%% ${error.code}`, error.message)

      setBuyIsLoading(false)
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Add Coins"
        onPress={() => {
          dispatch(setLoadingState(true))
          goBack()
        }}
      />
      <ScrollView bounces={false} contentContainerStyle={styles.mainView}>
        <Text style={styles.note}>
          Please select how many coins {'\n'} you would like to add to your
          wallet
        </Text>
        <Card cardContainerStyle={styles.coinDescriptionCard}>
          <Text style={styles.cardText}>1 </Text>
          <Image source={rupee} style={styles.icon} />
          <Text style={styles.cardText}> = 0.03 Rupee</Text>
        </Card>
        <View style={styles.sliderView}>
          <View>
            {Rupees.map((item, index) => (
              <Item
                handleSelection={val => handleSelection(val)}
                index={index}
                key={item.id}
                selected={selected}
                {...item}
              />
            ))}
          </View>

          <Slider
            maximumTrackTintColor={Colors.primary}
            maximumValue={Coins[Coins.length - 1].id * 100}
            minimumTrackTintColor={Colors.primary}
            minimumValue={Coins[0].id * 100}
            orientation="vertical"
            step={100}
            style={{ marginVertical: 18 }}
            thumbStyle={{ width: 12, height: 12, borderRadius: 10 }}
            thumbTintColor={Colors.primary}
            trackStyle={{
              backgroundColor: Colors.primary,
              width: 2,
            }}
            value={selected * 100}
            onValueChange={value => {
              console.log(' onValueChange value', value)
              if (selected !== 0) {
                setSelected(value / 100)
                selectedCoins = Coins[value / 100 - 1].coins
              }
            }}
          />
          <View>
            {Coins.map((item, index) => (
              <Item1
                handleSelection={val => handleSelection(val)}
                index={index}
                key={item.id}
                selected={selected}
                {...item}
              />
            ))}
          </View>
        </View>
        <Button
          containerStyle={styles.buttonConfirm}
          isButtonDisabled={buyIsLoading}
          onPress={handlePurchase}
        >
          {buyIsLoading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.confirmPaymentText}>Confirm Payment</Text>
          )}
        </Button>
      </ScrollView>
    </View>
  )
}

export { AddCoinsScreen }
