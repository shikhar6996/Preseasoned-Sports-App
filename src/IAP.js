/* eslint-disable react-hooks/exhaustive-deps */
/** In App purchases- consumables */

import React, { useEffect } from 'react'
import { Platform } from 'react-native'

import {
  initConnection,
  getProducts,
  purchaseUpdatedListener,
  finishTransactionIOS,
  consumeAllItemsAndroid,
  acknowledgePurchaseAndroid,
  finishTransaction,
  purchaseErrorListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  endConnection,
} from 'react-native-iap'

const PurchaseController = props => {
  const itemSubs = [
    'com.pre.seasoned.1000coins',
    'com.pre.seasoned.3000coins',
    'com.pre.seasoned.9000coins',
    'com.pre.seasoned.30000coins',
    'com.pre.seasoned.100000coins',
    'com.pre.seasoned.300000coins',
  ]
  let purchaseUpdateSubscription = null

  let purchaseErrorSubscription = null

  const getItems = async () => {
    try {
      console.log('itemSubs', itemSubs)
      const Products = await getProducts({ skus: itemSubs })
      console.log('products', Products)
    } catch (err) {
      console.log('IAP error', err.code, err.message)
    }
  }
  const initializeIAPConnection = async () => {
    await initConnection()
      .then(async connection => {
        console.log('IAP result', connection)
        getItems()
        if (Platform.OS === 'android')
          await flushFailedPurchasesCachedAsPendingAndroid()
            .then(async consumed => {
              console.log('consumed all items?', consumed)
            })
            .catch(err => {
              console.warn(
                `flushFailedPurchasesCachedAsPendingAndroid ERROR ${err.code}`,
                err.message,
              )
            })
      })
      .catch(err => {
        console.log(`IAP ERROR ${err.code}`, err.message)
      })
  }

  useEffect(() => {
    initializeIAPConnection()
    purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
      console.log('purchase', purchase)

      const receipt = purchase.transactionReceipt

      if (receipt) {
        try {
          if (Platform.OS === 'ios') {
            // finishTransactionIOS(purchase.transactionId)
          } else if (Platform.OS === 'android') {
            // await consumeAllItemsAndroid(purchase.purchaseToken)
            await acknowledgePurchaseAndroid({
              token: purchase?.purchaseToken,
              developerPayload: purchase?.productId,
            })
          }

          await finishTransaction({
            purchase,
            isConsumable: true,
            developerPayloadAndroid: purchase?.productId,
          })
        } catch (ackErr) {
          console.log('ackErr INAPP>>>>', ackErr)
        }
      }
    })

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
      endConnection()
    }
  }, [])

  return null
}

export default PurchaseController
