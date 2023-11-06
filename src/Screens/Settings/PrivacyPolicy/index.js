import React, { useState, useRef, useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native'

import { useDispatch } from 'react-redux'

import { Header } from '@/Components'
import { goBack } from '@/Navigators/utils'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { getPrivacyPolicyList } from '@/Store/Reducers/Common/PrivacyPolicyReducer'

import { styles } from './styles'

const PrivacyPolicyScreen = props => {
  const dispatch = useDispatch()
  const textRef = useRef(null)
  const [showButton, setShowButton] = useState(false)

  const [privacyPolicyData, setPrivacyPolicyData] = useState(false)

  useEffect(() => {
    dispatch(setLoadingState(true))
    dispatch(
      getPrivacyPolicyList(response => {
        if (response.code === 200) {
          setPrivacyPolicyData(response)
          console.log('privacyPolicyData-->', privacyPolicyData)
          dispatch(setLoadingState(false))
        } else {
          setLoadingState(false)
        }
      }),
      error => {
        console.log('Error in Api', error)
        dispatch(setLoadingState(false))
      },
    )
  }, [])
  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Privacy Policy"
        onPress={() => {
          goBack()
        }}
      />

      <View style={styles.mainView}>
        {privacyPolicyData?.content?.title !== '' && (
          <View style={styles.privacyView}>
            <Text style={styles.privacyText}>
              {privacyPolicyData?.content?.title}
            </Text>
          </View>
        )}

        <ScrollView
          bounces={false}
          ref={textRef}
          onScroll={e => {
            console.log('e', e.nativeEvent.contentOffset)
            if (e.nativeEvent.contentOffset.y > 0) {
              setShowButton(true)
            } else {
              setShowButton(false)
            }
          }}
        >
          <View style={styles.TacView}>
            <Text style={styles.tacText}>
              {privacyPolicyData?.content?.description}
            </Text>
          </View>
        </ScrollView>

        {showButton && (
          <View style={styles.backToTopView}>
            <Text
              style={styles.backToTopText}
              onPress={() => {
                textRef?.current?.scrollTo({ y: 0, animated: true })
              }}
            >
              Back To Top
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export { PrivacyPolicyScreen }
