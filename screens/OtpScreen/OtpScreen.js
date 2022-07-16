/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import Logo from '../../components/Logo';
import Services from '../../services/Services';
import Auth from '../../services/Auth';
import {setLoggedIn} from '../../actions';
import {useDispatch} from 'react-redux';
import Loader from '../../constants/Loader';

export default function OtpScreen(props) {
  const [otp, setotp] = useState('');
  const [visible, setvisible] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    resendButton();
  }, []);

  const resendOTP = async () => {
    const {userInfo} = props.route.params;
    setvisible(true);
    console.log('userInfo', userInfo);
    const resp = await Services.generateOtp({email: userInfo.email});
    console.log(resp);
  };
  const verifyOtp = async () => {
    setisLoading(true);
    const {userInfo, from} = props.route.params;

    const verifyOtpData = {
      email: userInfo.email,
      otp,
    };
    const otpVerify = await Services.verifyOtp(verifyOtpData);
    if (otpVerify.status === 'true') {
      if (from === 'registerScreen') {
        await Auth.setUser(userInfo);
        await Auth.setUserEmail(userInfo.email);

        setTimeout(() => {
          dispatch(setLoggedIn(true));
        }, 2000);
      }
    } else {
      Alert.alert(otpVerify.data);
    }
    console.log('verifyOtp', verifyOtpData);
    setisLoading(false);
  };
  const otpButton = () => {
    if (!visible) {
      return (
        <View style={styles.otpButtonContainer}>
          <TouchableOpacity
            onPress={() => resendOTP()}
            style={styles.resendOTPbutton}
            disabled={visible}>
            <Text style={styles.otpButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.otpButtonContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'serif',
              marginBottom: 5,
              color: 'red',
              fontSize: 10,
            }}>
            You will get Resend Otp Option in 1 min
          </Text>
          <TouchableOpacity
            onPress={() => verifyOtp()}
            style={styles.submitOtpButton}>
            <Text style={styles.otpButtonText} disabled={!visible}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const resendButton = () => {
    setvisible(true);

    // Re-enable after 1 minute
    setTimeout(() => {
      setvisible(false);
    }, 60000);
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'rgba(0, 57, 72, 1)'}}>
      <Logo />
      <Loader spin={isLoading} />
      <View style={styles.toastView}>
        <View style={{padding: 15}}>
          <Text
            style={{
              fontFamily: 'serif',
              fontSize: 20,
              textAlign: 'center',
              color: 'black',
              marginBottom: 20,
              fontWeight: 'bold',
            }}>
            Homeiz
          </Text>
          <Text style={{fontFamily: 'serif', fontSize: 15, color: 'black'}}>
            Please enter the confirmation code in the verification email that is
            sent to the address you selected. The confirmation code is valid for
            5 minutes.
          </Text>
          <Text
            style={{
              padding: 10,
              fontFamily: 'monospace',
              color: 'green',
              fontWeight: 'bold',
            }}>
            Otp sent to
          </Text>
          <Text
            style={{
              padding: 5,
              fontFamily: 'monospace',
              color: 'red',
              fontWeight: 'bold',
            }}>
            rahuljha3246@gmail.com
          </Text>
          <Text
            style={{
              fontFamily: 'serif',
              marginVertical: 20,
              fontSize: 15,
              color: 'black',
            }}>
            This confirmation code is only valid for 5 minutes. If you did not
            request for this code, please contact
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('mailto:homeiz@gmail.com');
              }}
              style={{paddingTop: 5, paddingLeft: 10}}>
              <Text
                style={{
                  fontFamily: 'serif',
                  fontSize: 14,
                  color: 'green',
                }}>
                homeiz@gmail.com
              </Text>
            </TouchableOpacity>
          </Text>

          <TextInput
            mode="outlined"
            placeholder=""
            right={<TextInput.Affix />}
            maxLength={6}
            onChangeText={e => setotp(e)}
            keyboardType="numeric"
            style={{textAlign: 'center', fontSize: 30, marginBottom: 30}}
          />

          {otpButton()}
        </View>
      </View>
    </ScrollView>
  );
}
