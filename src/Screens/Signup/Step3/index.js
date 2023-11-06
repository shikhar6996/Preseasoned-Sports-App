/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, FlatList, Image } from 'react-native'

import { useDispatch } from 'react-redux'

import { Header } from '@/Components'
import { Button } from '@/Components/Button'

import { ROUTES } from '@/Constants'
import { goBack, navigationRef } from '@/Navigators/utils'

import { getCategoryList } from '@/Store/Reducers/Common/CategoryReducer'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { responsiveSize, Colors } from '@/Utils'

import { styles } from './styles'

// eslint-disable-next-line react/prop-types
const Item = ({ id, title, category_image, isSelected, onPress }) => (
  <Pressable
    style={[
      styles.item,
      { backgroundColor: isSelected ? Colors.primary : Colors.secondary },
    ]}
    onPress={() => {
      onPress(id)
    }}
  >
    <Image
      source={{ uri: category_image }}
      style={[
        styles.img,
        {
          tintColor: isSelected ? Colors.white : undefined,
          height: '100%',
          width: '100%',
        },
      ]}
    />
    <Text style={styles.cardText}>{title}</Text>
  </Pressable>
)

const Step3 = navigation => {
  const { params } = navigation?.route || {}
  const [sportsList, setSportsList] = useState([])
  const dispatch = useDispatch()

  const handleSportSelection = id => {
    setSportsList(
      sportsList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isSelected: !item.isSelected,
          }
        }
        return item
      }),
    )
  }

  const renderItem = ({ item }) => (
    <Item {...item} onPress={handleSportSelection} />
  )
  useEffect(() => {
    dispatch(setLoadingState(true))
    dispatch(
      getCategoryList(
        data => {
          if (data && data?.length > 0) {
            setSportsList(data.map(item => ({ ...item, isSelected: false })))
          }
          dispatch(setLoadingState(false))
        },
        error => {
          console.log('Error in Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }, [])

  const nextButtonHandler = () => {
    const selectedSportsById = sportsList.filter(item => item.isSelected)
    let selectedCaetegoryIds = ''
    if (selectedSportsById && selectedSportsById.length) {
      selectedSportsById.forEach((item, idx) => {
        if (idx === selectedSportsById.length - 1) {
          selectedCaetegoryIds += `${item.id}`
        } else selectedCaetegoryIds += `${item.id},`
      })
    }

    let data = {
      category: selectedCaetegoryIds,
      ...params,
    }
    if (selectedSportsById.length === 0) {
      data = {
        ...params,
      }
    }

    navigationRef.navigate(ROUTES.FINALSTEP, data)
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        hasBackButton
        title="Select Sports"
        onPress={() => {
          goBack()
        }}
      />

      <View style={{ ...styles.mainView, ...styles.contentContainerStyle }}>
        <View style={styles.joinUsView}>
          <Text style={styles.joinUsText}>Join us!</Text>
          <Pressable
            style={styles.skipButton}
            onPress={() =>
              navigationRef.navigate(ROUTES.FINALSTEP, {
                category: '',
                ...params,
              })
            }
          >
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>
        <Text style={[styles.description, { marginTop: responsiveSize(20) }]}>
          Select the sports that you're interested in.
        </Text>
        <Text style={styles.description}>
          This helps us show you relevant content
        </Text>
        <View
          style={{
            marginTop: responsiveSize(30),
            flex: 1,
          }}
        >
          <FlatList
            columnWrapperStyle={{
              justifyContent: 'center',
            }}
            data={sportsList}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Button
          containerStyle={{
            backgroundColor:
              sportsList.filter(item => item.isSelected)?.length > 0
                ? Colors.primary
                : Colors.darkLiver,
          }}
          onPress={nextButtonHandler}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </Button>
        <Text style={[styles.textInputTitle, styles.stepText]}>
          Step 4 of 4
        </Text>
      </View>
    </View>
  )
}

export { Step3 }
