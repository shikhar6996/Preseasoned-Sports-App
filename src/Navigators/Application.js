/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { BottomTabNavigator } from '@/Components'
import { ROUTES } from '@/Constants'
import { IsLoadingHOC } from '@/Containers/IsLoadingHOC'
import PurchaseController from '@/IAP'
import NotificationController from '@/NotificationController'

import {
  LandingPage,
  Onboarding,
  Step1 as SignupStep1,
  Step2 as SignupStep2,
  Step3 as SignupStep3,
  FinalProfile,
  LoginScreen,
  PasswordResetScreen,
  ConfirmPasswordResetScreen,
  ResetDone,
  Dashboard,
  OtpScreen,
  VerifyEmail,
  ProfileScreen,
  CreateChannel,
  ChannelDetails,
  SeeAllFollowedList,
  SeeAllMyChannelList,
  SeeAllPopularList,
  ExploreScreen,
  ThreadDetailScreen,
  FaqScreen,
  ContactUsScreen,
  HelpScreen,
  EditProfile,
  SelectedSports,
  SeeAllPopularCategoryList,
  AccountScreen,
  ChangePassword,
  WalletScreen,
  MySubscriptionScreen,
  TermsAndConditionScreen,
  OtherUserProfileScreen,
  NotificationScreen,
  PrivacyPolicyScreen,
  KycStep1,
  ResubmitKyc,
  KycVerifiedScreen,
  YourMessages,
  AddCoinsScreen,
  ConfirmationScreen,
  WithdrawEarnings,
  EarningRequestProcessed,
  SettingsScreen,
  KycConfirmationScreen,
  EditChannel,
} from '@/Screens'

import SplashScreen from '@/Screens/SplashScreen'

import { Colors, Layout } from '@/Utils'

import { horizontalAnimation } from './PageTransitionAnimation'
import { navigationRef } from './utils'

const Stack = createStackNavigator()

const layout = Layout()

const ApplicationNavigator = IsLoadingHOC(() => (
  <SafeAreaView style={[layout.fill, { backgroundColor: Colors.secondary }]}>
    <NavigationContainer ref={navigationRef}>
      <NotificationController />
      <PurchaseController />

      <StatusBar backgroundColor={Colors.secondary} barStyle="light-content" />
      <Stack.Navigator
        initialRouteName={ROUTES.SPLASHSCREEN}
        screenOptions={{ headerShown: false, detachPreviousScreen: false }}
      >
        <Stack.Screen
          component={SplashScreen}
          name={ROUTES.SPLASHSCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={LandingPage}
          name={ROUTES.LANDINGPAGE}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={Onboarding}
          name={ROUTES.ONBOARDING}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={SignupStep1}
          name={ROUTES.SIGNUPSTEP1}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={VerifyEmail}
          name={ROUTES.VERIFY_EMAIL}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={SignupStep2}
          name={ROUTES.SIGNUPSTEP2}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={SignupStep3}
          name={ROUTES.SIGNUPSTEP3}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={FinalProfile}
          name={ROUTES.FINALSTEP}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={LoginScreen}
          name={ROUTES.LOGINSCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={PasswordResetScreen}
          name={ROUTES.PASSWORDRESETSCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={OtpScreen}
          name={ROUTES.OTPSCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ConfirmPasswordResetScreen}
          name={ROUTES.CONFIRMPASSWORDRESETSCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ResetDone}
          name={ROUTES.RESETDONE}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={Dashboard}
          name={ROUTES.DASHBOARD}
          options={{
            gestureEnabled: false,
            animationEnabled: false /*, ...horizontalAnimation */,
          }}
        />
        <Stack.Screen
          component={SeeAllFollowedList}
          name={ROUTES.SEE_ALL_FOLLOWED_LIST}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={SeeAllMyChannelList}
          name={ROUTES.SEE_ALL_MYCHANNEL_LIST}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={SeeAllPopularList}
          name={ROUTES.SEE_ALL_POPULAR_LIST}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ProfileScreen}
          name={ROUTES.PROFILESCREEN}
          // options={horizontalAnimation}
          options={{
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          component={CreateChannel}
          name={ROUTES.CREATECHANNEL}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ChannelDetails}
          name={ROUTES.CHANNEL_DETAILS}
          // options={horizontalAnimation}
          options={{
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          component={ExploreScreen}
          name={ROUTES.EXPLORE_SCREEN}
          // options={horizontalAnimation}
          options={{
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          component={SelectedSports}
          name={ROUTES.SELECTED_SPORTS}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={EditProfile}
          name={ROUTES.EDIT_PROFILE_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={SeeAllPopularCategoryList}
          name={ROUTES.SEE_ALL_POPULAR_CATEGORY_LIST}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ThreadDetailScreen}
          name={ROUTES.THREADDETAILSCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={FaqScreen}
          name={ROUTES.FAQ_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ContactUsScreen}
          name={ROUTES.CONTACT_US_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={HelpScreen}
          name={ROUTES.HELP_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={AccountScreen}
          name={ROUTES.ACCOUNT_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ChangePassword}
          name={ROUTES.CHANGE_PASSWORD}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={WalletScreen}
          name={ROUTES.WALLET_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={WithdrawEarnings}
          name={ROUTES.WITHDRAWEARNINGS}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={EarningRequestProcessed}
          name={ROUTES.EARNINGREQUESTPROCESSED}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={KycStep1}
          name={ROUTES.KYC_STEP1}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ResubmitKyc}
          name={ROUTES.RESUBMIT_KYC}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={KycVerifiedScreen}
          name={ROUTES.KYC_VERIFIED_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={MySubscriptionScreen}
          name={ROUTES.MY_SUBSCRIPTION_SCREEN}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={TermsAndConditionScreen}
          name={ROUTES.TERMS_AND_CONDITIONS}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={OtherUserProfileScreen}
          name={ROUTES.OTHER_USER_PROFILE}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={PrivacyPolicyScreen}
          name={ROUTES.PRIVACY_POLICY}
          options={horizontalAnimation}
        />

        <Stack.Screen
          component={NotificationScreen}
          name={ROUTES.NOTIFICATIONS}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={YourMessages}
          name={ROUTES.YOUR_MESSAGES}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={AddCoinsScreen}
          name={ROUTES.ADD_COINS}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={ConfirmationScreen}
          name={ROUTES.ADD_COINS_CONFIRMATION}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={SettingsScreen}
          name={ROUTES.SETTINGS_SCREEN}
          options={{
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          component={KycConfirmationScreen}
          name={ROUTES.KYC_CONFRMATION}
          options={horizontalAnimation}
        />
        <Stack.Screen
          component={EditChannel}
          name={ROUTES.EDIT_CHANNEL}
          options={horizontalAnimation}
        />
      </Stack.Navigator>
      <BottomTabNavigator />
    </NavigationContainer>
  </SafeAreaView>
))

export default ApplicationNavigator
