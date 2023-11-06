import React, { useEffect, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { Header } from '@/Components'

import { AccordionListItem } from '@/Components/AccordionList'
import { goBack } from '@/Navigators/utils'
import { getFaqList } from '@/Store/Reducers/Common/FaqReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'

import { styles } from './styles'

const FaqScreen = () => {
  const [faqData, setFaqData] = useState([])
  const dispatch = useDispatch()
  const token = useSelector(state => state.UserReducer.userData.token) || ''

  useEffect(() => {
    dispatch(setLoadingState(true))
    dispatch(
      getFaqList(
        15,
        1,
        response => {
          if (response && response.code === 200) {
            setFaqData(response)
            dispatch(setLoadingState(false))
          } else {
            dispatch(setLoadingState(false))
            Alert.alert(response?.message)
          }
        },
        error => {
          console.log('Error in Api', error)
          Alert.alert('Failed to load Faq')
        },
      ),
    )
  }, [])

  const getPaginationData = async () => {
    console.log('Pagination called', faqData)
    if (faqData?.next !== null && faqData.results) {
      dispatch(setLoadingState(true))

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
        redirect: 'follow',
      }
      fetch(faqData?.next, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result, 'paginat')
          setFaqData({
            ...result,
            results: [...(faqData && faqData.results), ...result.results],
          })
        })

        .catch(error => console.log('Error in getting new page', error))
        .finally(() => dispatch(setLoadingState(false)))
    }
  }

  return (
    <View style={styles.parentContainer}>
      <Header hasBackButton title="FAQs" onPress={goBack} />
      <View style={styles.mainView}>
        <FlatList
          contentContainerStyle={styles.flatlistStyles}
          data={faqData && faqData?.results}
          keyExtractor={(__, idx) => `userChannelsKey${idx}`}
          renderItem={({ item, index }) => (
            <AccordionListItem
              descriptionText={item?.answer}
              key={index}
              title={item?.question}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={getPaginationData}
        />
      </View>
    </View>
  )
}

export { FaqScreen }
