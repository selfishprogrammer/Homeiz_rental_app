import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPassswordScreen/ResetPasswordScreen';
import MyTab from './navigation/MainTabNavigator';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar animated={true} backgroundColor="#2471A3" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="myTab"
            options={{headerShown: false}}
            component={MyTab}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
