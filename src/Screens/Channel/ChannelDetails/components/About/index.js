/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { arrowLeft, editButton } from '@/Assets/Images'
import { Input } from '@/Components'
import { createAboutUs, getAboutUs } from '@/Store/Reducers/Chat'
import { setLoadingState } from '@/Store/Reducers/Common/LoaderReducer'
import { Colors, height, responsiveSize } from '@/Utils'

import { styles } from './styles'

const DefaultAboutText =
  'You have not updated this section yet. Use this space to tell your followers about yourself, such as the sports you cover or why they should follow your channel'
const nonFollowerText = "This channel's owner has not updated this section yet."

const AboutTab = ({ channelId, channelDetails, id }) => {
  const [text, setText] = useState('')
  const [aboutData, setAboutData] = useState({})
  const dispatch = useDispatch()
  const userData = useSelector(state => state.UserReducer.userData)
  const userId = userData?.user_profile?.id
  const [openModal, setOpenModal] = useState(false)

  const getAboutUsFx = () => {
    dispatch(
      getAboutUs(
        channelId,
        data => {
          dispatch(setLoadingState(false))
          setAboutData(data)
          if (data.text !== '') setText(data.text)
          else if (userId === id) {
            setText(DefaultAboutText)
          } else {
            setText(nonFollowerText)
          }
        },
        error => {
          console.log('Error in Api ', error)
          dispatch(setLoadingState(false))
        },
      ),
    )
  }

  const onSavePress = () => {
    setLoadingState(false)
    if (text.trim().length === 0) {
      setLoadingState(false)
      Alert.alert('About section cannot be empty')
    } else {
      setOpenModal(false)
      setLoadingState(false)
      const formdata = new FormData()
      formdata.append('channel_id', channelId)
      formdata.append('text', text)
      dispatch(
        createAboutUs(
          formdata,
          response => {
            if (response.code === 200) {
              console.log(response, 'response from onSavepress')
              dispatch(setLoadingState(false))
              getAboutUsFx()
            }
          },
          err => {
            console.log('Error in calling get Channel Details', err)
          },
        ),
      )
    }
  }
  useEffect(() => {
    dispatch(setLoadingState(false))
    getAboutUsFx()
  }, [])

  const handleDiscardChanges = () => {
    Keyboard.dismiss()
    setText(text)
    setOpenModal(false)
  }

  const handleEditButtonPress = () => {
    setOpenModal(true)
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveSize(64) : 0
          }
        >
          <View style={styles.parentContainer}>
            <View style={styles.tellUsAboutChannelView}>
              {userId === channelDetails.user.id && (
                <>
                  <Text style={styles.tellUsAboutChannelText}>
                    Tell us about your Channel
                  </Text>
                  <Pressable
                    style={styles.editIconPressable}
                    onPress={handleEditButtonPress}
                  >
                    <Image source={editButton} style={styles.editIcon} />
                  </Pressable>
                </>
              )}
            </View>

            <Text style={[styles.aboutChannelParaText]}>{text}</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal
        transparent
        animationType="slide"
        visible={openModal}
        onRequestClose={handleDiscardChanges}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={-((height - responsiveSize(280)) / 2) + 70}
        >
          <Pressable
            style={styles.transparentPressable}
            onPress={handleDiscardChanges}
          />
          <View style={styles.announcementContentView}>
            <Pressable onPress={handleDiscardChanges}>
              <Image source={arrowLeft} style={styles.backIcon} />
            </Pressable>
            <Text style={styles.threadName}>Tell us about your Channel</Text>
            <Input
              multiline
              containerStyle={{
                height: responsiveSize(150),
                marginTop: responsiveSize(20),
              }}
              maxLength={200}
              returnKeyType="default"
              value={text}
              onChangeText={val => {
                setText(val)
              }}
            />

            <View style={styles.commonButtonView}>
              <TouchableOpacity
                style={[
                  styles.commonButton,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={onSavePress}
              >
                <Text style={styles.commonButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.commonButton}
                onPress={handleDiscardChanges}
              >
                <Text style={styles.commonButtonText}>Discard Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
}

export { AboutTab }
