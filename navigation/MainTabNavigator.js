/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPassswordScreen/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ContactUsScreen from '../screens/ContactUsScreen/ContactUsScreen';
import Profileviewscreen from '../screens/ProfileViewScreen/ProfileViewScreen';
import Editprofilescreen from '../screens/EditProfileScreen/EditProfileScreen';
import Housescreen from '../screens/HouseScreen/HouseScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen/DeleteAccountScreen';
import Explorescreen from '../screens/ExploreScreen/ExploreScreen';
import OtpScreen from '../screens/OtpScreen/OtpScreen';
import Mapview from '../components/MapView';
import HousesForRent from '../screens/HomeScreen/HousesForRent';
import ImagesScreen from '../screens/ImagesScreen/ImagesScreen';
import OwnerHomeScreen from '../screens/OwnerPanel/OwnerHomeScreen';
import AddHousesScreen from '../screens/OwnerPanel/AddHousesScreen';
import OwnerProfileScreen from '../screens/OwnerPanel/OwnerProfileScreen';
import ViewRequestScreen from '../screens/OwnerPanel/ViewRequestScreen';
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
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
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
      <Stack.Screen
        options={{headerShown: false}}
        name="OtpScreen"
        component={OtpScreen}
      />
    </Stack.Navigator>
  );
};
// Coustmer Navigation
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
const ProfileStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ProfileViewScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileViewScreen"
        component={Profileviewscreen}
      />
    </Stack.Navigator>
  );
};
const HouseStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="HousesForRent"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="HousesForRent"
        component={HousesForRent}
      />
    </Stack.Navigator>
  );
};

// OwnerNavigation

const OwnerHomeStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="OwnerHomeScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="OwnerHomeScreen"
        component={OwnerHomeScreen}
      />
    </Stack.Navigator>
  );
};
const AddHouseStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="OwnerHousesForRent"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="OwnerHousesForRent"
        component={AddHousesScreen}
      />
    </Stack.Navigator>
  );
};
const OwnerProfileStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="OwnerProfileScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="OwnerProfileScreen"
        component={OwnerProfileScreen}
      />
    </Stack.Navigator>
  );
};
const MyTabs = () => {
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
      barStyle={{
        backgroundColor: '#fff',
        height: 55,
        elevation: 10,
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
        name="HousesForRent"
        component={HouseStack}
        options={{
          headerShown: true,
          tabBarLabel: <Text style={{fontFamily: 'serif'}}>Rent Houses</Text>,
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
      <Bottom.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: 'serif'}}>Profile</Text>,
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg',
              }}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

const OwnerMyTabs = () => {
  const Bottom = createMaterialBottomTabNavigator();

  return (
    <Bottom.Navigator
      initialRouteName="OwnerHomeScreen"
      sceneAnimationEnabled={true}
      activeColor="black"
      inactiveColor="#EAECEE"
      screenOptions={{
        headerShown: false,
      }}
      barStyle={{
        backgroundColor: '#fff',
        height: 55,
        elevation: 10,
      }}>
      <Bottom.Screen
        name="Home"
        component={OwnerHomeStack}
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
        name="House Rent"
        component={AddHouseStack}
        options={{
          headerShown: true,
          tabBarLabel: <Text style={{fontFamily: 'serif'}}>Rent Houses</Text>,
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
        name="Profile"
        component={OwnerProfileStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: 'serif'}}>Profile</Text>,
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg',
              }}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

const Maintabnavigator = () => {
  const {isLoggedIn, skipLogin, ownerLogin} = useSelector(
    state => state.reducer,
  );
  console.log('login status===>', isLoggedIn, skipLogin);
  if (!isLoggedIn) {
    return LoginStack();
  } else if (isLoggedIn || skipLogin) {
    // return myTabs();
    console.log('ownerLogin===>', ownerLogin);
    if (isLoggedIn && ownerLogin) {
      return (
        <Stack.Navigator
          headerMode="none"
          initialRouteName="OwnerHomeScreen"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: true,
          }}>
          <Stack.Screen name="OwnerTab" component={OwnerMyTabs} />
          <Stack.Screen
            name="EditProfileScreen"
            component={Editprofilescreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="DeleteAccountScreen"
            component={DeleteAccountScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ViewRequestScreen"
            component={ViewRequestScreen}
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator
          headerMode="none"
          initialRouteName="ContactUs"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: true,
          }}>
          <Stack.Screen name="myTab" component={MyTabs} />
          <Stack.Screen
            name="EditProfileScreen"
            component={Editprofilescreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="DeleteAccountScreen"
            component={DeleteAccountScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ExploreScreen"
            component={Explorescreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MapScreen"
            component={Mapview}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="HouseScreen"
            component={Housescreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ImageScreen"
            component={ImagesScreen}
          />
        </Stack.Navigator>
      );
    }
  }
};
export default Maintabnavigator;
