import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {Cross, Icon} from '../../constants/Images';
import Loader from '../../constants/Loader';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
export default function RegisterScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [cpasswordError, setCpasswordError] = useState('');

  const [NameError, setNameError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const resetErrorField = () => {
    setemailError('');
    setCpasswordError('');
    setpasswordError('');
    setNameError('');
    setbackendResponce('');
    setPhoneError('');
  };
  const resetInputField = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setCpassword('');
  };
  const register = async () => {
    resetErrorField();
    var email_val =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var pass_val = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}/g;

    if (name.length <= 0) {
      setNameError('Field Can not be empty !');
    }
    if (email.length <= 0) {
      setemailError('Field Can not be empty !');
    }
    if (phone.length <= 0) {
      setemailError('Field Can not be empty !');
    }
    if (password.length <= 0) {
      setpasswordError('Field Can not be empty !');
    }
    if (cpassword.length <= 0) {
      setCpasswordError('Field Can not be empty !');
    } else {
      if (!email_val.test(email)) {
        setemailError('Please Enter Valid Email Format');
      } else if (!pass_val.test(password)) {
        setpasswordError('Password Format Is Not Correct');
      } else if (!(password === cpassword)) {
        setCpasswordError('Password Does Not Matches !');
      } else if (phone.length < 10 || phone.length > 10) {
        setPhoneError('Phone Number Must be Between 10 Digit');
      } else {
        setisLoading(true);
        const userData = {
          name,
          email,
          phone,
          password,
          categories: 'users',
        };
        const responce = await Services.userRegister(userData);
        await Auth.setUser(userData);
        await Auth.setUserEmail(userData.email);
        console.log('data=====>', responce);
        if (responce.status === 'true') {
          resetInputField();
          navigation.replace('LoginScreen');
        } else {
          setbackendResponce(responce.data);
        }
        setisLoading(false);
      }
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://wallpaperaccess.com/full/1700222.jpg',
      }}
      resizeMode="cover"
      style={styles.searchImage}>
      <Loader spin={isLoading} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.toastView}>
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

          <Text style={styles.title}>Create Your Account</Text>
          {/* <Loader spin={isLoading} /> */}

          <TextInput
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
            label="Name"
            value={name}
            onChangeText={e => setName(e)}
            style={styles.inputField}
          />
          {NameError != '' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.errorMsg}>{NameError}</Text>
            </View>
          ) : null}
          <TextInput
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
            label="Email"
            value={email}
            onChangeText={e => setEmail(e)}
            style={styles.inputField}
          />
          {emailError != '' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.errorMsg}>{emailError}</Text>
            </View>
          ) : null}
          <TextInput
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
            label="Phone"
            value={phone}
            keyboardType={'numeric'}
            onChangeText={e => setPhone(e)}
            style={styles.inputField}
          />
          {phoneError != '' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.errorMsg}>{phoneError}</Text>
            </View>
          ) : null}
          <TextInput
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
            label="Password"
            secure={true}
            passwordField={true}
            secureTextEntry
            value={password}
            onChangeText={e => setPassword(e)}
            style={styles.inputField}
          />
          {passwordError != '' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.errorMsg}>{passwordError}</Text>
            </View>
          ) : null}
          <TextInput
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
            label="Confirm Password"
            secure={true}
            passwordField={true}
            secureTextEntry
            value={cpassword}
            onChangeText={e => setCpassword(e)}
            style={styles.inputField}
          />
          {cpasswordError != '' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.errorMsg}>{cpasswordError}</Text>
            </View>
          ) : null}

          <View style={styles.loginBtn}>
            <TouchableOpacity
              style={{justifyContent: 'center', height: 50, width: '100%'}}>
              <Text style={styles.lgnbtnTxt} onPress={() => register()}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{color: 'black'}}>
              Already have An Account ?{' '}
              <Text
                onPress={() => navigation.navigate('LoginScreen')}
                style={{
                  color: 'black',
                  fontWeight: '700',
                  fontFamily: 'serif',
                }}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
