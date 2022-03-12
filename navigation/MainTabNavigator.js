import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPassswordScreen/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ContactUsScreen from '../screens/ContactUsScreen/ContactUsScreen';
const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const ContactStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ContactUs"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="ContactUsScreen"
        component={ContactUsScreen}
      />
    </Stack.Navigator>
  );
};
const myTabs = () => {
  const Bottom = createMaterialBottomTabNavigator();

  return (
    <Bottom.Navigator
      initialRouteName="HomeScreen"
      sceneAnimationEnabled={true}
      activeColor="black"
      inactiveColor="#EAECEE"
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{
        backgroundColor: '#EAECEE',
        height: 55,
      }}>
      <Bottom.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: 'serif'}}>Home</Text>,
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
              }}
            />
          ),
        }}
      />

      <Bottom.Screen
        name="Home2"
        component={HomeStack}
        options={{
          headerShown: true,
          tabBarLabel: (
            <Text style={{fontFamily: 'serif'}}>House For Rent</Text>
          ),
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://cdn2.iconfinder.com/data/icons/buildings-glyph-8/32/for_rent_house-512.png',
              }}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="contact"
        component={ContactStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: 'serif'}}>Contact Us</Text>,
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://pixlok.com/wp-content/uploads/2021/07/Message-Free-Icon-fidswo.png',
              }}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};
const Maintabnavigator = () => {
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);
  console.log('login status===>', isLoggedIn);
  if (isLoggedIn) {
    return myTabs();
  } else {
    return LoginStack();
  }
};
export default Maintabnavigator;
