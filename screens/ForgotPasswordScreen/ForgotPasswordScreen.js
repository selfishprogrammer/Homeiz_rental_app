import axios, {Axios} from 'axios';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Image} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '../../constants/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const editPass = () => {
    var email_val =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setemailError('');
    if (email.length <= 0) {
      setemailError('Field Can not be empty !');
    } else if (!email_val.test(email)) {
      setemailError('Please Enter Valid Email Format');
    } else {
      //   setisLoading(true);
      //   setTimeout(async () => {
      //     await axios
      //       .post(
      //         'http://192.168.64.2/codegeeks/edit_password.php',
      //         JSON.stringify({
      //           email: email,
      //         }),
      //       )
      //       .then(async res => {
      //         await AsyncStorage.setItem('userData', JSON.stringify(res.data));
      //         console.log(
      //           'AsyncData===>',
      //           await AsyncStorage.getItem('userData'),
      //         );
      //         res.data.status == 'true'
      //           ? navigation.navigate('ResetPasswordScreen', {
      //               email_cont: res.data.email,
      //             })
      //           : setbackendResponce(res.data.data);
      //       })
      //       .catch(e => console.log(e));
      //     setisLoading(false);
      //   }, 3000);
    }
    setemail('');
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://wallpaperaccess.com/full/1700222.jpg',
      }}
      resizeMode="cover"
      style={styles.searchImage}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.box}>
          {backendResponce != '' ? (
            <View style={{backgroundColor: '#F4315B', borderRadius: 10}}>
              <Text style={styles.errorToast}>
                <Image
                  source={Icon}
                  style={{width: 20, height: 20, paddingTop: 10}}
                />{' '}
                {backendResponce}
              </Text>
            </View>
          ) : null}
          <Text
            style={{
              color: 'black',
              fontFamily: 'serif',
              fontSize: 20,
              marginLeft: 10,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Edit Password
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'serif',
              color: 'black',
              margin: 10,
            }}>
            We will send you a code on this email , verify your email to reset
            your password.
          </Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={e => setemail(e)}
            style={styles.inputField}
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
          />
          {emailError != '' ? (
            <View style={styles.errorMsg}>
              <View>
                <Image
                  source={{
                    uri: 'https://i.dlpng.com/static/png/6858276_preview.png',
                  }}
                  width="15"
                  height="15"
                />
              </View>
              <View>
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 15,
                    fontFamily: 'cursive',
                  }}>
                  {emailError}
                </Text>
              </View>
            </View>
          ) : null}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00bfff',
              margin: 10,
              borderRadius: 5,
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', height: 50, width: '100%'}}>
              <Text style={styles.lgnbtnTxt} onPress={() => editPass()}>
                Verify Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
