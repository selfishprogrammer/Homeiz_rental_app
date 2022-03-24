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
  static resetPassword = async data => {
    return postReq('Authentication/resetPassword.php', data);
  };
  static editProfile = async data => {
    return postReq('Authentication/editProfile.php', data);
  };
  static deleteAccount = async data => {
    return postReq('Authentication/deleteAccount.php', data);
  };
  static forgotPassword = async data => {
    return postReq('Authentication/forgotPass.php', data);
  };
}
