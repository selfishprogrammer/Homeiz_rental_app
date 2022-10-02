import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './navigation/MainTabNavigator';
import {useSelector, useDispatch} from 'react-redux';
import Auth from './services/Auth';
import {setLoggedIn, setOwnerLogin} from './actions';
import PushNotification, {Importance} from 'react-native-push-notification';
const App = () => {
  const Stack = createNativeStackNavigator();
  const {latitude, longitude} = useSelector(state => state.reducer);
  console.log(latitude, longitude);
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuthenticate();
    PushNotification.createChannel(
      {
        channelId: '234567890909090909090', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'notification.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
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
