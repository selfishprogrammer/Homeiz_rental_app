import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../actions';
import Successmodal from '../../components/SuccessModal';
import Loader from '../../constants/Loader';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import styles from './styles';

const DeleteAccountScreen = ({navigation}) => {
  const [successResp, setsuccessResp] = useState('');
  const [successModal, setsuccessModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [backendResponce, setbackendResponce] = useState('');
  const dispatch = useDispatch();
  const deleteAccount = async () => {
    setisLoading(true);
    const userEmail = await Auth.getUserEmail();
    const data = {
      email: userEmail,
    };
    const responce = await Services.deleteAccount(data);
    if (responce.status === 'true') {
      setsuccessResp(responce.data);
      setsuccessModal(true);
      setTimeout(() => {
        Auth.setUserEmail(null);
        Auth.setUser(null);
        dispatch(setLoggedIn(false));
      }, 3000);
    } else {
      setbackendResponce(responce.data);
    }
    setisLoading(false);
  };
  const renderSuccessModal = () => {
    if (successModal) {
      return <Successmodal title={successResp} />;
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0, 57, 72, 1)'}}>
      {renderSuccessModal()}
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

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Loader spin={isLoading} />
        <View style={styles.container}>
          <Image
            source={{
              uri: 'http://simpleicon.com/wp-content/uploads/remove-user.png',
            }}
            style={{
              width: 50,
              height: 50,
              marginVertical: 20,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'serif',
              fontWeight: 'normal',
              color: 'black',
              fontSize: 15,
            }}>
            We Are Very Sorry To See You Go. Your Data Will Be Clear And You
            Have To Reregister Yourself To Use Our App.
          </Text>

          <TouchableOpacity
            onPress={() => {
              deleteAccount();
            }}
            style={{
              marginVertical: 25,

              borderRadius: 20,
              backgroundColor: '#C80000',
            }}>
            <Text
              style={{
                padding: 10,
                textAlign: 'center',
                color: 'white',
                fontFamily: 'serif',
                fontSize: 18,
              }}>
              Delete Account
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'serif',
              fontWeight: 'normal',
              color: 'black',
              fontSize: 10,
            }}>
            *** Thanks For Choosing Homeiz ***
          </Text>
        </View>
      </View>
    </View>
  );
};
export default DeleteAccountScreen;
