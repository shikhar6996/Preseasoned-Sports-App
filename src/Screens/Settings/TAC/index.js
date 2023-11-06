import React, { useState, useRef, useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native'

import { useDispatch } from 'react-redux'

import { Header } from '@/Components'
import { goBack } from '@/Navigators/utils'

import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { getTacList } from '@/Store/Reducers/Common/TermsAndCondReducer'

import { styles } from './styles'

const TermsAndConditionScreen = props => {
  const dispatch = useDispatch()
  const textRef = useRef(null)

  const [showButton, setShowButton] = useState(false)
  const [tacData, setTacData] = useState(false)

  useEffect(() => {
    dispatch(setLoadingState(true))
    dispatch(
      getTacList(
        response => {
          if (response && response.code === 200) {
            setTacData(response)
            dispatch(setLoadingState(false))
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

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Terms and Condtions"
        onPress={() => {
          goBack()
        }}
      />

      <View style={styles.mainView}>
        {tacData?.content?.title !== '' && (
          <View style={styles.privacyView}>
            <Text style={styles.privacyText}>
              {tacData ? tacData?.content?.title : ''}
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
            <Text style={styles.tacText}>{tacData?.content?.description}</Text>
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

export { TermsAndConditionScreen }
