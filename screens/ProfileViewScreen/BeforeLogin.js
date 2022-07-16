/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {setLoggedIn, setSkipLogin} from '../../actions';
export default function BeforeLogin() {
  const dispatch = useDispatch();
  return (
    <>
      <Header title="Homeiz" />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'BlissPro-Bold',
              fontSize: 14,
              marginVertical: 10,
            }}>
            To view your peofile , please login yourself.
          </Text>
          <View
            style={[
              styles.loginBtn,
              {backgroundColor: 'green', width: '70%', alignSelf: 'center'},
            ]}>
            <TouchableOpacity
              style={{justifyContent: 'center', height: 50, width: '100%'}}>
              <Text
                style={[styles.lgnbtnTxt, {color: 'black'}]}
                onPress={() => {
                  dispatch(setLoggedIn(false));
                  dispatch(setSkipLogin(false));
                }}>
                Login / SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
