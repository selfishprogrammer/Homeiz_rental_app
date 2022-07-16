/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Filters from '../../components/Filters';
// import SearchBar from '../../components/SearchBar';
import Loader from '../../constants/Loader';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import styles from './styles';
import Geolocation from 'react-native-geolocation-service';
import FetchingHouseScreen from '../../NoRecordFoundScreen/FetchingHouseScreen';
import NoRecordFoundScreen from '../../NoRecordFoundScreen/NoRecordFoundScreen';
import Header from '../../components/Header';
const Housescreen = props => {
  const navigation = useNavigation();
  const [houses, sethouses] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [houseAva, sethouseAva] = useState('');
  useEffect(() => {
    if (props.route.params.search_based_on === 'location') {
      getLongLat();
    } else if (props.route.params.city !== '') {
      console.log('==========', props.route.params.city);
      getHouseByCity();
    }
  }, []);
  const getHouseByCity = async () => {
    const houseData = await Services.houseByCity({
      district: props.route.params.city,
    });
    if (houseData.status === 'false') {
      sethouseAva(false);
    } else {
      sethouseAva(true);
      sethouses(houseData);
    }
    setisLoading(false);
  };
  const getLongLat = async () => {
    Geolocation.getCurrentPosition(position => {
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
    });
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
    setisLoading(true);
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
      sethouseAva(false);
    } else {
      sethouseAva(true);
      sethouses(houseData);
    }
    setisLoading(false);
  };

  const renderHouse = () => {
    if (houseAva === '') {
      return <FetchingHouseScreen />;
    }
    if (!houseAva) {
      return <NoRecordFoundScreen />;
    }
    if (houseAva) {
      return (
        <>
          <Header />
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView>
              <View
                style={{
                  backgroundColor: '#EBF4FA',
                  borderRadius: 15,
                  justifyContent: 'center',
                  padding: 10,
                  margin: 20,
                  // borderWidth: 0.1,
                }}>
                <Filters />
              </View>
              {houses.map(house => {
                return (
                  <View style={styles.toastView}>
                    <Image
                      source={{
                        uri: house.image_1,
                      }}
                      style={styles.houseImg}
                    />

                    <Text
                      style={{
                        fontFamily: 'BlissPro-Bold',
                        textAlign: 'center',
                        fontSize: 20,
                        marginVertical: 10,
                        // fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {house.flat_name}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'BlissPro',
                        fontSize: 18,
                        // fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {house.bhk} Flat In {house.district}
                    </Text>
                    <ScrollView
                      horizontal={true}
                      contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 15,
                        marginLeft: 5,
                      }}>
                      <TouchableOpacity style={styles.distanceClick}>
                        <Text style={styles.nearBy}>
                          2Km From City Hospital
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.distanceClick}>
                        <Text style={styles.nearBy}>
                          100mts Nearby Police Station
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.distanceClick}>
                        <Text style={styles.nearBy}>
                          1Km Nearby Super Market
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.distanceClick}>
                        <Text style={styles.nearBy}>1Km Nearby School</Text>
                      </TouchableOpacity>
                    </ScrollView>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-around',
                      }}>
                      <Text style={[styles.bhk, {color: 'black'}]}>
                        <Image
                          source={{
                            uri: 'https://icon-library.com/images/rupee-icon/rupee-icon-16.jpg',
                          }}
                          style={{width: 20, height: 20}}
                        />{' '}
                        {Math.floor(house.real_price)}
                      </Text>
                      <Text style={styles.bhk}>{house.sqft} sqft</Text>
                      <Text style={styles.bhk}>{house.bhk}</Text>
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        margin: 10,
                        fontFamily: 'BlissPro-Bold',
                        fontSize: 12,
                        // fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {house.house_details}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        margin: 10,
                        fontFamily: 'BlissPro-Bold',
                        fontSize: 15,
                        color: 'blue',
                      }}>
                      {house.home_address} , {house.pin_code} , West Bengal
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
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </>
      );
    }
  };
  return (
    <>
      <Loader spin={isLoading} />
      {renderHouse()}
    </>
  );
};

export default Housescreen;
