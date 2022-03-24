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
import Geocoder from 'react-native-geocoding';
import {Card} from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import {logo} from '../../constants/Images';
import Permission from '../../constants/Permission';
import FooterScreen from '../FooterScreeen/FooterScreen';
import styles from './styles';
const Homescreen = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    Geocoder.from(longitude, latitude)
      .then(resp => console.log('responce====>', resp))
      .catch(err => console.log('Error====>', err));
    checkLocationPermission();
    if (isFocused) {
      checkLocationPermission();
    }
  }, [isFocused]);
  const [hasLocationPermission, sethasLocationPermission] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const checkLocationPermission = async () => {
    const hasLocation = await Permission.hasLocationPermission();
    console.log('hasLocation', hasLocation);
    if (!hasLocation) {
      Permission.askLocation()
        .then(hasLocationPermission => {
          console.log('hasLocationPermission ==>>>>', hasLocationPermission);
          if (hasLocationPermission) {
            sethasLocationPermission(true);
            getLongLat();
          } else {
            deniedAlert(
              'Allow Your Location To Use Our App',
              'We Provides You a Best Flats / Houses On Basis Of Your Kocation.',
            );
          }
        })
        .catch(err => console.log(err));
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
  const getLongLat = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
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
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'rgba(0, 57, 72, 1)'}}>
      <View style={styles.toastView}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <SearchBar />
      </View>
      {/* <View style={styles.offerContainer}>
        <Image
          source={{uri: 'http://www.oclicker.com/uploads/Mayfair_Offer.jpg'}}
          style={styles.offerImg}
        />
      </View> */}
      <Card>
        <Card.Title>PAYAL HOUSES</Card.Title>

        <Image
          source={{
            uri: 'https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2020/12/25/907391-housing-pixabat.jpg',
          }}
          style={styles.houseImg}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.bhk}>33.50L-50L</Text>
          <Text style={styles.bhk}>2000-3000 sqft</Text>
          <Text style={styles.bhk}>2BHK</Text>
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
        <Text style={styles.shortAdd}>
          Experience a new style of living with Amaya Residences.
        </Text>
        <Text style={styles.addRess}>Kestopur Near D-MERN BILRA 734001</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              console.log('object');
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.btnTxt}>Explore</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
      <FooterScreen />
    </ScrollView>
  );
};
// AIzaSyAyXIOzBki19oh2xH4xm6bJStl809cQcSs
export default Homescreen;
