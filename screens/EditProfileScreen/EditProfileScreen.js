import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import Auth from '../../services/Auth';
import styles from './styles';
import Loader from '../../constants/Loader';
import Services from '../../services/Services';
import Successmodal from '../../components/SuccessModal';
const Editprofilescreen = ({navigation}) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setemailError] = useState('');
  const [NameError, setNameError] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [backendResponce, setbackendResponce] = useState('');
  const [successResp, setsuccessResp] = useState('');
  const [successModal, setsuccessModal] = useState(false);
  useEffect(() => {
    userInfo();
  }, []);
  const userInfo = async () => {
    const userData = await Auth.getUser();
    setname(userData?.name);
    setemail(userData?.email);
    setphone(userData?.phone);
  };
  const renderSuccessModal = () => {
    if (successModal) {
      return <Successmodal title={successResp} />;
    }
  };
  const editProfile = async () => {
    setNameError('');
    setemailError('');
    setPhoneError('');
    setbackendResponce('');
    var email_val =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (name.length <= 0) {
      setNameError('Field Can not be empty !');
    }
    if (email.length <= 0) {
      setemailError('Field Can not be empty !');
    }
    if (phone.length <= 0) {
      setPhoneError('Field Can not be empty !');
    } else {
      if (!email_val.test(email)) {
        setemailError('Please Enter Valid Email Format');
      } else if (phone.length < 10 || phone.length > 10) {
        setPhoneError('Phone Number Must be Between 10 Digit');
      } else {
        setisLoading(true);
        const previous_email = await Auth.getUserEmail();
        const userUpdateInfo = {
          name,
          email,
          phone,
          previous_email,
        };
        const responce = await Services.editProfile(userUpdateInfo);
        console.log('responce======>', responce);
        if (responce.status === 'true') {
          await Auth.setUserEmail(responce.email);
          const setUserInfo = {
            name: responce.name,
            email: responce.email,
            phone: responce.phone,
            categories: 'users',
          };
          await Auth.setUser(setUserInfo);
          setsuccessModal(true);
          setsuccessResp(responce.data);
          setTimeout(() => {
            navigation.navigate('ProfileViewScreen');
          }, 2000);
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
        <Loader spin={isLoading} />
        {renderSuccessModal()}
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
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              padding: 8,
            }}>
            Edit Profile
          </Text>
          <View style={{margin: 10}}>
            <TextInput
              theme={{
                colors: {
                  primary: 'blue',
                },
              }}
              label="Name"
              value={name}
              onChangeText={e => setname(e)}
              style={styles.inputField}
            />
            {NameError == '' ? (
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
              onChangeText={e => setemail(e)}
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
              onChangeText={e => setphone(e)}
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
            <View style={styles.loginBtn}>
              <TouchableOpacity
                style={{justifyContent: 'center', height: 50, width: '100%'}}>
                <Text style={styles.lgnbtnTxt} onPress={() => editProfile()}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Editprofilescreen;
