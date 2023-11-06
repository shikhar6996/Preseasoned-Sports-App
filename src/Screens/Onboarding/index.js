import React, { useState, useRef } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

import SwiperFlatList from 'react-native-swiper-flatlist'

import { logo } from '@/Assets/Images'

import { Header } from '@/Components'
import { Button } from '@/Components/Button'
import { ROUTES } from '@/Constants'
import { navigationRef } from '@/Navigators/utils'

import { Colors, responsiveSize } from '@/Utils'

import { styles } from './styles'

export const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  return (
    <View style={styles.mainContainer}>
      <Header title="Welcome!" />
      <ScrollView contentContainerStyle={styles.childContentStyle}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={[styles.name, { marginBottom: 0 }]}>Preseasoned</Text>
          {/* <Text style={styles.name}>(beta)</Text> */}
        </View>
        <SwiperFlatList
          showPagination
          data={[
            {
              title: 'Created for creators',
              text: 'Connect with your fans and monetise your expertise',
            },
            {
              title: 'Engage with the best',
              text: 'Get the best sports content from the best creators',
            },
          ]}
          index={0}
          paginationActiveColor={Colors.white}
          paginationDefaultColor={Colors.darkSilver}
          paginationStyle={[styles.paginationStyle]}
          paginationStyleItem={styles.paginationStyleItem}
          ref={swiperRef}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTextBold}>{item.title}</Text>
              <Text style={styles.cardText}>{item.text}</Text>
            </View>
          )}
          style={styles.swiperContainer}
          onViewableItemsChanged={params => {
            setActiveIndex(params.changed?.[0]?.index)
          }}
        />
        <View style={styles.buttonWrapper}>
          {activeIndex !== 1 ? (
            <Button
              containerStyle={{ backgroundColor: Colors.primary }}
              onPress={() => {
                // eslint-disable-next-line no-unsafe-optional-chaining
                let updatedIndex = activeIndex + 1
                if (updatedIndex > 1) {
                  updatedIndex = 1
                }
                swiperRef.current?.scrollToIndex({
                  animated: true,
                  index: updatedIndex,
                })
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Button>
          ) : (
            <>
              <Button
                containerStyle={{ backgroundColor: Colors.primary }}
                onPress={() => {
                  navigationRef.navigate(ROUTES.SIGNUPSTEP1)
                }}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </Button>
              <Button
                containerStyle={{
                  marginTop: responsiveSize(25),
                  backgroundColor: Colors.primary,
                }}
                onPress={() => {
                  navigationRef.navigate(ROUTES.LOGINSCREEN)
                }}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </Button>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
