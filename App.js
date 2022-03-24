import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './navigation/MainTabNavigator';
import {useSelector, useDispatch} from 'react-redux';
import Auth from './services/Auth';
import {setLoggedIn} from './actions';
import Geocoder from 'react-native-geocoding';
const App = () => {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuthenticate();
    Geocoder.init('AIzaSyAyXIOzBki19oh2xH4xm6bJStl809cQcSs');
  }, []);

  const checkAuthenticate = async () => {
    const isAuthenticate = await Auth.getUser();
    if (isAuthenticate != null) {
      dispatch(setLoggedIn(true));
    }
  };

  const checkNetworkConnection = () => {};

  return (
    <>
      <StatusBar animated={true} backgroundColor="rgba(0, 57, 72, 1)" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="botoomTab"
            options={{headerShown: false}}
            component={BottomTab}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
