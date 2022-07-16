import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './navigation/MainTabNavigator';
import {useSelector, useDispatch} from 'react-redux';
import Auth from './services/Auth';
import {setLoggedIn, setOwnerLogin} from './actions';
import Geocoder from 'react-native-geocoding';
const App = () => {
  const Stack = createNativeStackNavigator();
  const {latitude, longitude} = useSelector(state => state.reducer);
  console.log(latitude, longitude);
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuthenticate();
  }, []);

  const checkAuthenticate = async () => {
    const isAuthenticate = await Auth.getUser();
    if (isAuthenticate != null) {
      if (isAuthenticate.categories === 'owner') {
        dispatch(setOwnerLogin(true));
        dispatch(setLoggedIn(true));
      } else {
        dispatch(setLoggedIn(true));
      }
    }
  };

  const checkNetworkConnection = () => {};

  return (
    <>
      <StatusBar animated={true} backgroundColor="green" />
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
