import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
// import axios from 'axios';
// import Loader from '../Others/Loader';
import styles from './styles';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import Loader from '../../constants/Loader';
import {setLoggedIn} from '../../actions';
import {useDispatch} from 'react-redux';
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
          dispatch(setLoggedIn(true));
        } else {
          setbackendResponce(responce.data);
        }
        setisLoading(false);
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0, 57, 72, 1)'}}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',

              paddingBottom: 15,
            }}>
            <Text style={{color: 'black'}}>
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
    </View>
  );
}
