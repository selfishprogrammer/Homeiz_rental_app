import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
export default function ResetPasswordScreen(props) {
  const [newPassword, setnewPassword] = useState('');
  const [newPasswordError, setnewPasswordError] = useState('');
  const [cnewPassword, setcnewPassword] = useState('');
  const [cnewPasswordError, setcnewPasswordError] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [backendResponce, setbackendResponce] = useState('');
  const navigation = useNavigation();
  const resetErrorfield = () => {
    setnewPasswordError('');
    setcnewPasswordError('');
    setbackendResponce('');
  };

  const resetInputfield = () => {
    setnewPassword('');
    setcnewPassword('');
  };

  const ResetPaasword = email_reg => {
    resetErrorfield();
    var pass_val = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}/g;

    if (newPassword.length <= 0) {
      setnewPasswordError('Field Can not be empty !');
    }
    if (cnewPassword.length <= 0) {
      setcnewPasswordError('Field Can not be empty !');
    } else {
      if (!pass_val.test(pass_val)) {
        setnewPasswordError('Please Enter Valid Email Format');
      } else if (newPassword != cnewPassword) {
        setcnewPasswordError('Password Does Not Matches !');
      } else {
        // setisLoading(true);
        // setTimeout(async () => {
        //   const data = await JSON.stringify(AsyncStorage.getItem('userData'));
        //   console.log('==>', data);
        //   await axios
        //     .post(
        //       'http://192.168.64.2/codegeeks/resetPassword.php',
        //       JSON.stringify({
        //         email: email_reg,
        //         password: newPassword,
        //       }),
        //     )
        //     .then(res => {
        //       res.data.status == 'true'
        //         ? navigation.replace('SuccessScreen', {
        //             from: 'resetPass',
        //           })
        //         : setbackendResponce(res.data.data);
        //     })
        //     .catch(e => console.log(e));
        //   setisLoading(false);
        // }, 3000);
      }
    }

    resetInputfield('');
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://wallpaperaccess.com/full/1700222.jpg',
      }}
      resizeMode="cover"
      style={styles.searchImage}>
      <View style={{flex: 1}}>
        {/* {console.log(props.route.params.email_cont)} */}
        <View style={styles.toastView}>
          {backendResponce != '' ? (
            <View style={{backgroundColor: '#F4315B', borderRadius: 10}}>
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
            Reset Password
          </Text>

          <TextInput
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
            label="New Password"
            secure={true}
            passwordField={true}
            secureTextEntry
            value={newPassword}
            onChangeText={e => setnewPassword(e)}
            style={styles.inputField}
          />
          {newPasswordError != '' ? (
            <View
              style={{
                marginRight: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
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
                <Text style={styles.errorMsg}>{newPasswordError}</Text>
              </View>
            </View>
          ) : null}

          <TextInput
            theme={{
              colors: {
                primary: 'blue',
              },
            }}
            label="Conform New Password"
            secure={true}
            passwordField={true}
            secureTextEntry
            value={cnewPassword}
            onChangeText={e => setcnewPassword(e)}
            style={styles.inputField}
          />
          {cnewPasswordError != '' ? (
            <View
              style={{
                marginRight: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
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
                <Text style={styles.errorMsg}>{cnewPasswordError}</Text>
              </View>
            </View>
          ) : null}
          <View style={styles.loginBtn}>
            <TouchableOpacity
              style={{justifyContent: 'center', height: 50, width: '100%'}}>
              <Text style={styles.lgnbtnTxt} onPress={() => ResetPaasword()}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
