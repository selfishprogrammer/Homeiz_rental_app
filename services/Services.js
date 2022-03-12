import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {postReq} from './Api';

export default class Services {
  static userRegister = async data => {
    return postReq('Authentication/register.php', data);
  };
  static userLogin = async data => {
    return postReq('Authentication/login.php', data);
  };
}
