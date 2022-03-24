import axios, {Axios} from 'axios';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Image} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import Services from '../../services/Services';
import Loader from '../../constants/Loader';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const editPass = async () => {
    var email_val =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setemailError('');
    setbackendResponce('');
    if (email.length <= 0) {
      setemailError('Field Can not be empty !');
    } else if (!email_val.test(email)) {
      setemailError('Please Enter Valid Email Format');
    } else {
      setisLoading(true);
      const data = {
        email,
      };
      const responce = await Services.forgotPassword(data);
      if (responce.status === 'true') {
        navigation.navigate('ResetPasswordScreen', {
          email,
          from: 'forgotPass',
        });
      } else {
        setbackendResponce(responce.data);
      }
      setisLoading(false);
      setemail('');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0, 57, 72, 1)'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.box}>
          <Loader spin={isLoading} />
          {backendResponce !== '' ? (
            <View
              style={{
                backgroundColor: '#D50000',
                borderRadius: 10,
                margin: 15,
              }}>
              <Text style={styles.toastTxt}>{backendResponce}</Text>
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
              backgroundColor: '#A5DE18',
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
    </View>
  );
}
