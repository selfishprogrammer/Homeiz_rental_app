/* eslint-disable react-native/no-inline-styles1 */
import {useIsFocused, useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../actions';
import WarnningModal from '../../components/WarnningModal';
import Auth from '../../services/Auth';
import styles1 from './styles1';
import Header from '../../components/Header';
const Profileviewscreen = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [successModal, setsuccessModal] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocuced = useIsFocused();
  useEffect(() => {
    if (isFocuced) {
      userInfo();
      setsuccessModal(false);
    }
  }, [isFocuced]);
  const logout = async () => {
    // console.log('users', await Auth.getUser());
    await Auth.setUser(null);
    await Auth.setUserEmail(null);
    dispatch(setLoggedIn(false));
  };
  const renderWarningModal = () => {
    if (successModal) {
      return (
        <WarnningModal title="Are You Sure Want To Delete Your Account. You Will Lost All Your Data From App." />
      );
    }
  };
  const userInfo = async () => {
    const userData = await Auth.getUser();
    setname(userData?.name);
    setemail(userData?.email);
    setphone(userData?.phone);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {renderWarningModal()}
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <Header />
        <View style={styles1.container}>
          <View style={{alignItems: 'center'}}>
            <Avatar
              size={64}
              rounded
              title={name.charAt(0).toUpperCase()}
              containerStyle={{backgroundColor: '#228D0E'}}
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                // fontWeight: 'bold',
                fontSize: 18,
                marginTop: 6,
                fontFamily: 'BlissPro-Bold',
              }}>
              {name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 15,
                marginTop: 6,
                fontFamily: 'BlissPro',
              }}>
              {email}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 15,
                marginTop: 6,
                fontFamily: 'BlissPro',
              }}>
              {phone}
            </Text>
          </View>
          <View style={{margin: 30}}>
            <View>
              <TouchableOpacity
                style={styles1.button}
                onPress={() => {
                  navigation.navigate('EditProfileScreen');
                }}>
                <Text style={styles1.btnTxt2}>Edit Account</Text>
                <Image
                  style={{height: 22, width: 22}}
                  source={{
                    uri: 'https://icon-library.com/images/pencil-icon/pencil-icon-24.jpg',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles1.button}
              onPress={() => {
                navigation.navigate('ResetPasswordScreen', {
                  from: 'ResetPasswordScreen',
                  email: email,
                });
              }}>
              <Text style={styles1.btnTxt2}>Change Password</Text>
              <Image
                style={{height: 22, width: 22}}
                source={{
                  uri: 'https://icon-library.com/images/pencil-icon/pencil-icon-24.jpg',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles1.button}
              onPress={() => {
                setsuccessModal(true);
              }}>
              <Text style={styles1.btnTxt2}>Delete Account</Text>
              <Image
                style={{height: 22, width: 22}}
                source={{
                  uri: 'https://icons.veryicon.com/png/o/construction-tools/coca-design/delete-189.png',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles1.button}>
              <Text style={styles1.btnTxt2}>Your Records</Text>
              <Image
                style={{height: 22, width: 22}}
                source={{
                  uri: 'https://www.pinpng.com/pngs/m/51-512369_png-file-svg-medical-records-icon-free-transparent.png',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles1.button} onPress={logout}>
              <Text style={styles1.btnTxt2}>Logout</Text>
              <Image
                style={{height: 22, width: 22}}
                source={{
                  uri: 'http://cdn.onlinewebfonts.com/svg/img_508769.png',
                }}
              />
            </TouchableOpacity>

            <Text style={styles1.text2}>
              *** Homiez Is Always There For You ***
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profileviewscreen;
