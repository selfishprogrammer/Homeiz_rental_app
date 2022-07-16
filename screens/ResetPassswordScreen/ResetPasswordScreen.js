/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Services from '../../services/Services';
import Loader from '../../constants/Loader';
import Successmodal from '../../components/SuccessModal';
import Logo from '../../components/Logo';
export default function ResetPasswordScreen(props) {
  const [newPassword, setnewPassword] = useState('');
  const [newPasswordError, setnewPasswordError] = useState('');
  const [cnewPassword, setcnewPassword] = useState('');
  const [cnewPasswordError, setcnewPasswordError] = useState('');
  const [email, setemail] = useState(props.route.params.email);
  const [isLoading, setisLoading] = useState(false);
  const [backendResponce, setbackendResponce] = useState('');
  const [successResp, setsuccessResp] = useState('');
  const [successModal, setsuccessModal] = useState(false);

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
  const renderSuccessModal = () => {
    if (successModal) {
      return <Successmodal title={successResp} />;
    }
  };
  const ResetPaasword = async () => {
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
      } else if (newPassword !== cnewPassword) {
        setcnewPasswordError('Password Does Not Matches !');
      } else {
        setisLoading(true);
        const userInfo = {
          email,
          password: newPassword,
        };
        console.log('userInfo====>', userInfo);
        const responce = await Services.resetPassword(userInfo);
        console.log('responce====>', responce);
        if (responce.status === 'true') {
          setsuccessResp(responce.data);
          setsuccessModal(true);
          setTimeout(() => {
            if (props.route.params.from === 'forgotPass') {
              navigation.navigate('LoginScreen');
            } else {
              navigation.navigate('ProfileViewScreen');
            }
          }, 2000);
        } else {
          setbackendResponce(responce.data);
        }
        setisLoading(false);
      }
    }

    resetInputfield('');
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
          <Loader spin={isLoading} />
          {renderSuccessModal()}
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
            <Text
              style={{
                color: 'black',
                fontFamily: 'BlissPro-Bold',
                fontSize: 20,
                marginLeft: 10,
                textAlign: 'center',
                // fontWeight: 'bold',
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
      </ScrollView>
    </View>
  );
}
