/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from './styles';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import Loader from '../../constants/Loader';
import {setLoggedIn, setOwnerLogin, setSkipLogin} from '../../actions';
import {useDispatch} from 'react-redux';
import Logo from '../../components/Logo';
import PushNotification from 'react-native-push-notification';
export default function LoginScreen({navigation}) {
  const [email, setemail] = useState('');
  const [emailError, setemailError] = useState('');
  const [password, setpassword] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const login = async () => {
    var email_val =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var pass_val = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}/g;
    console.log('login====>', email, password);
    setpasswordError('');
    setemailError('');
    if (email.length <= 0) {
      setemailError('Field Can not be empty !');
    }
    if (password.length <= 0) {
      setpasswordError('Field Can not be empty !');
    } else {
      if (!email_val.test(email)) {
        setemailError('Please Enter Valid Email Format');
      } else if (!pass_val.test(password)) {
        setpasswordError('Password Format Is Not Correct');
      } else {
        setisLoading(true);
        const userData = {
          email,
          password,
        };
        const responce = await Services.userLogin(userData);
        console.log('data=====>', responce);
        if (responce.status === 'true') {
          setemail('');
          setpassword('');
          const loginData = {
            name: responce.name,
            email: responce.email,
            phone: responce.phone,
            categories: responce.categories,
            password,
          };
          await Auth.setUser(loginData);
          await Auth.setUserEmail(loginData.email);
          console.log('loginData=====>', await Auth.getUser());
          if (responce.categories === 'owner') {
            dispatch(setLoggedIn(true));
            dispatch(setOwnerLogin(true));
          }
          dispatch(setLoggedIn(true));
          PushNotification.localNotification({
            /* iOS and Android properties */
            channelId: '234567890909090909090',
            title: `Welcome back ${responce.name}`, // (optional)
            message:
              'You are loggedIn Now , Start Finding Your Rented House in Homiez.', // (required)
            picture: 'https://www.example.tld/picture.jpg', // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
            userInfo: {loginData}, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
          });
        } else {
          setbackendResponce(responce.data);
        }
        setisLoading(false);
      }
    }
  };
  const skip_login = () => {
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
      dispatch(setLoggedIn(true));
      dispatch(setSkipLogin(true));
    }, 2000);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <Logo />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View style={styles.container}>
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

            <Text style={styles.title}>Login</Text>
            <Loader spin={isLoading} />

            <TextInput
              theme={{
                colors: {
                  primary: 'blue',
                },
              }}
              label="Email"
              value={email}
              onChangeText={e => setemail(e)}
              style={styles.inputField}
            />
            {emailError != '' ? (
              <View
                style={{
                  marginRight: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={styles.errorMsg}>{emailError}</Text>
                </View>
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
              onChangeText={e => setpassword(e)}
              style={styles.inputField}
            />
            {passwordError != '' ? (
              <View
                style={{
                  marginRight: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={styles.errorMsg}>{passwordError}</Text>
                </View>
              </View>
            ) : null}

            <TouchableOpacity style={{paddingTop: 10}}>
              <Text
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
                style={styles.forgotPass}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>

            <View style={styles.loginBtn}>
              <TouchableOpacity
                style={{justifyContent: 'center', height: 50, width: '100%'}}>
                <Text style={styles.lgnbtnTxt} onPress={() => login()}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.loginBtn, {backgroundColor: 'red'}]}>
              <TouchableOpacity
                style={{justifyContent: 'center', height: 50, width: '100%'}}>
                <Text
                  style={[styles.lgnbtnTxt, {color: '#fff'}]}
                  onPress={() => skip_login()}>
                  Skip Login
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: 15,
              }}>
              <Text style={{color: 'black', fontFamily: 'BlissPro'}}>
                New to Homeies ?{' '}
                <Text
                  onPress={() => navigation.replace('RegisterScreen')}
                  style={styles.signUp}>
                  Signup Here
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
