/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loader from '../constants/Loader';
import Auth from '../services/Auth';
import Services from '../services/Services';
import styles from './styles';

const Contactownermodal = props => {
  const [isLoading, setisLoading] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [query_title, setquery_title] = useState('');

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const user = await Auth.getUser();
    setname(user?.name);
    setemail(user?.email);
    setphone(user?.phone);
  };
  const contactSeller = async () => {
    setisLoading(true);
    const sellerData = {
      name,
      email,
      phone,
      address: query_title,
      flat_id: props.flat_id,
      owner_email: props.owner_email,
      flat_details: props.flat_details,
      home_address: props.home_address,
      flat_name: props.flat_name,
      zip_code: props.zip_code,
    };
    const data = await Services.contactOwner(sellerData);
    if (data.status === 'true') {
      Alert.alert('Submitted Successfully', data.data, [
        {text: 'Close', onPress: () => props.onCancelCallback(false)},
      ]);
    } else {
      Alert.alert('Submission Failed', data.data, [
        {text: 'Close', onPress: () => props.onCancelCallback(false)},
      ]);
    }
    setisLoading(false);
  };
  return (
    <View>
      <Loader spin={isLoading} />
      <Modal animationType="fade" visible={true} transparent={true}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={[
              styles.confirmModalContainer,
              {backgroundColor: '#00000066'},
            ]}>
            <View style={styles.confirmModalContent}>
              <View style={{alignSelf: 'center'}}>
                <Avatar
                  size={64}
                  rounded
                  title={'H'}
                  containerStyle={{backgroundColor: '#228D0E'}}
                />
              </View>
              <Text style={styles.confirmfmText}>{props.house_name}</Text>
              <Text
                style={[
                  styles.confirmfmText,
                  {fontSize: 15, fontFamily: 'BlissPro-Bold', marginTop: 20},
                ]}>
                Contact Owner For More Information , Owner Will Back to You As
                Soon As Possible
              </Text>

              <View style={{marginVertical: 20}}>
                <TextInput
                  theme={{
                    colors: {
                      primary: 'blue',
                    },
                  }}
                  label="Name"
                  secure={true}
                  //   secureTextEntry
                  value={name}
                  onChangeText={e => setname(e)}
                  style={styles.inputField}
                  disabled={true}
                />
                <TextInput
                  theme={{
                    colors: {
                      primary: 'blue',
                    },
                  }}
                  label="Email"
                  secure={true}
                  //   secureTextEntry
                  value={email}
                  onChangeText={e => setemail(e)}
                  style={styles.inputField}
                  disabled={true}
                />
                <TextInput
                  theme={{
                    colors: {
                      primary: 'blue',
                    },
                  }}
                  label="Phone"
                  secure={true}
                  keyboardType={'numeric'}
                  //   secureTextEntry
                  value={phone}
                  onChangeText={e => setphone(e)}
                  style={styles.inputField}
                />
                <TextInput
                  theme={{
                    colors: {
                      primary: '#2471A3',
                    },
                  }}
                  label="Query(if any)"
                  secure={true}
                  // passwordField={true}
                  style={[styles.inputField, {height: 100}]}
                  value={query_title}
                  onChangeText={e => setquery_title(e)}
                />
                <View style={styles.loginBtn}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      height: 50,
                      width: '100%',
                    }}>
                    <Text
                      style={styles.lgnbtnTxt}
                      onPress={() => contactSeller()}>
                      Contact Seller
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.loginBtn, {backgroundColor: 'red'}]}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      height: 50,
                      width: '100%',
                    }}>
                    <Text
                      style={[styles.lgnbtnTxt, {color: '#fff'}]}
                      onPress={() => props.onCancelCallback(false)}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Contactownermodal;
