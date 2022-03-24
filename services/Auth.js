import {View, Text} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Auth {
  static setUser = async data => {
    await AsyncStorage.setItem('users', JSON.stringify(data));
  };
  static setUserSecret = async data => {
    await AsyncStorage.setItem('usersSecret', JSON.stringify(data));
  };
  static setUserEmail = async data => {
    await AsyncStorage.setItem('usersEmail', JSON.stringify(data));
  };
  static getUser = async () => {
    const data = await AsyncStorage.getItem('users');
    if (!data) {
      return null;
    } else {
      return JSON.parse(data);
    }
  };
  static getUserSecret = async () => {
    const data = await AsyncStorage.getItem('usersSecret');
    if (!data) {
      return null;
    } else {
      return JSON.parse(data);
    }
  };
  static getUserEmail = async () => {
    const data = await AsyncStorage.getItem('usersEmail');
    if (!data) {
      return null;
    } else {
      return JSON.parse(data);
    }
  };
}
