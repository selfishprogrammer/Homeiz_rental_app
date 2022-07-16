/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn, setOwnerLogin, setSkipLogin} from '../actions';
import Auth from '../services/Auth';
import styles from './styles';

const Header = props => {
  const navigation = useNavigation();
  const {skipLogin} = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  const checkLoginOrNot = async () => {
    if (skipLogin) {
      dispatch(setSkipLogin(false));
      dispatch(setLoggedIn(false));
    } else {
      await Auth.setUser(null);
      await Auth.setUserEmail(null);
      dispatch(setLoggedIn(false));
      dispatch(setOwnerLogin(false));
    }
  };
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={{fontFamily: 'BlissPro-Bold', color: '#fff'}}>
          Kestopur,D-MARN Villa , Kolkata New Town
        </Text>
        <Text style={{fontFamily: 'BlissPro-Bold', color: '#fff'}}>734202</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => checkLoginOrNot()}>
          <Image
            source={{
              uri: 'https://icon-library.com/images/icon-profile/icon-profile-8.jpg',
            }}
            style={{width: 30, height: 30}}
          />
          <View
            style={{
              width: 11,
              height: 11,
              borderRadius: 5.5,
              backgroundColor: !skipLogin ? 'yellowgreen' : 'red',
              position: 'absolute',
              top: 2,
              right: -5,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
