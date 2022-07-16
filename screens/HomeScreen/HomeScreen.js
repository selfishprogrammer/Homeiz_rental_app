/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Card} from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import {homeiz_logo} from '../../constants/Images';
import Permission from '../../constants/Permission';
import styles from './styles';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import FetchingHouseScreen from '../../NoRecordFoundScreen/FetchingHouseScreen';
import NoRecordFoundScreen from '../../NoRecordFoundScreen/NoRecordFoundScreen';
import Header from '../../components/Header';

const Homescreen = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    checkLocationPermission();
    if (isFocused) {
      checkLocationPermission();
    }
  }, [isFocused]);
  const [houses, sethouses] = useState([]);
  // const [isLoading, setisLoading] = useState(false);
  // const [hasLocationPermission, sethasLocationPermission] = useState(false);
  const [houseAva, sethouseAva] = useState('');

  const checkLocationPermission = async () => {
    const hasLocation = await Permission.hasLocationPermission();
    console.log('hasLocation', hasLocation);
    if (!hasLocation) {
      Permission.askLocation()
        .then(hasLocationPermission => {
          console.log('hasLocationPermission ==>>>>', hasLocationPermission);
          if (hasLocationPermission) {
            getLongLat();
          } else {
            deniedAlert(
              'Allow Your Location To Use Our App',
              'We Provides You a Best Flats / Houses On Basis Of Your Kocation.',
            );
          }
        })
        .catch(err => console.log(err));
    } else {
      getLongLat();
    }
  };
  const deniedAlert = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: 'cancel',
        onPress: () => checkLocationPermission(),
        style: 'cancel',
      },
      {text: 'allow', onPress: () => goToAppSettings()},
    ]);
  };
  const goToAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.canOpenURL('app-settings:').then(canOpenURL => {
        if (canOpenURL) {
          Linking.openURL('app-settings:');
        } else {
          Alert.alert('error', 'turnOnLocation');
        }
      });
    } else {
      Linking.openSettings();
    }
  };
  const getLongLat = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);

        const latLong = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        updateLatLongInUsersTable(
          position.coords.latitude,
          position.coords.longitude,
        );
        Auth.setLatLong(latLong);
      },
      error => {
        deniedAlert(
          'Allow Your Location To Use Our App',
          'We Provides You a Best Flats / Houses On Basis Of Your Kocation.',
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const updateLatLongInUsersTable = async (latitude, longitude) => {
    const email = await Auth.getUserEmail();
    console.log('email===>', email);
    const latLongData = await Services.latLong({latitude, longitude, email});
    console.log('locationData=====>', latLongData);
    if (latLongData.status === 'true') {
      Auth.setLatLong({latitude, longitude});
      getHouseByLocation();
    } else {
      Alert.alert('error', latLongData.data);
    }
  };
  const getHouseByLocation = async () => {
    const latLong = await Auth.getLatLong();
    const locationData = {
      search_based_on: 'location',
      latitude: Math.floor(latLong.latitude),
      longitude: Math.floor(latLong.longitude),
      state: '',
      district: '',
    };
    const houseData = await Services.getHouseBasedOnLocation(locationData);
    console.log('data=====>>>>', houseData);

    if (houseData.status === 'false') {
      // checkLocationPermission();
      sethouseAva(false);
    } else {
      sethouseAva(true);
      sethouses(houseData);
    }
  };
  const renderHouse = () => {
    if (houseAva === '') {
      return <FetchingHouseScreen />;
    } else {
      return <NoRecordFoundScreen />;
    }
  };
  return (
    <>
      <Header />
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.toastView}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={homeiz_logo} />
          </View>
          <SearchBar />
        </View>
        {/* <Loader spin={isLoading} /> */}
        {/* <View style={styles.offerContainer}>
        <Image
          source={{uri: 'http://www.oclicker.com/uploads/Mayfair_Offer.jpg'}}
          style={styles.offerImg}
        />
      </View> */}
        {houseAva
          ? houses.map((house, key) => {
              return (
                <Card
                  containerStyle={{
                    borderRadius: 10,
                    elevation: 10,
                    borderWidth: 0,
                    marginHorizontal: 20,
                  }}>
                  <Card.Title>
                    <Text style={{fontFamily: 'BlissPro-Bold'}}>
                      {house.flat_name}
                    </Text>
                  </Card.Title>

                  <Image
                    source={{
                      uri: house.image_1,
                    }}
                    style={styles.houseImg}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.bhk}>
                      <Image
                        source={{
                          uri: 'https://icon-library.com/images/rupee-icon/rupee-icon-16.jpg',
                        }}
                        style={{width: 20, height: 20}}
                      />{' '}
                      {Math.floor(house.real_price)}{' '}
                    </Text>
                    <Text style={styles.bhk}>{house.sqft} sqft</Text>
                    <Text style={styles.bhk}>{house.bhk}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity style={styles.distanceClick}>
                      <Text style={styles.nearBy}>10 Nearby place</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.distanceClick}>
                      <Text style={styles.nearBy}>10 Nearby place</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.distanceClick}>
                      <Text style={styles.nearBy}>10 Nearby place</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.shortAdd}>{house.house_details}</Text>
                  <Text style={styles.addRess}>
                    {house.home_address} {house.pin_code}
                  </Text>

                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      style={[styles.btnContainer, {backgroundColor: '#fff'}]}
                      onPress={() => {
                        navigation.navigate('ExploreScreen', {
                          flat_id: house.flat_id,
                        });
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[
                            styles.btnTxt,
                            {color: 'black', fontFamily: 'BlissPro-Bold'},
                          ]}>
                          Explore More
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            })
          : renderHouse()}
        {/* <FooterScreen /> */}
      </ScrollView>
    </>
  );
};
// AIzaSyAyXIOzBki19oh2xH4xm6bJStl809cQcSs
export default Homescreen;
