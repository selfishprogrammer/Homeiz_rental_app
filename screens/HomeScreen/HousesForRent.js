import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Filters from '../../components/Filters';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import styles from './styles';
import {Card} from 'react-native-elements';
import FetchingHouseScreen from '../../NoRecordFoundScreen/FetchingHouseScreen';
import NoRecordFoundScreen from '../../NoRecordFoundScreen/NoRecordFoundScreen';
import Header from '../../components/Header';

export default function HousesForRent({navigation}) {
  const [isLoading, setisLoading] = useState(false);
  const [houseAva, sethouseAva] = useState('');
  const [houses, sethouses] = useState([]);
  useEffect(() => {
    getAllHouse();
  }, []);
  const getAllHouse = async () => {
    setisLoading(true);
    const latLong = await Auth.getLatLong();
    const locationData = {
      search_based_on: '',
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
    } else {
      return <NoRecordFoundScreen />;
    }
  };
  return (
    <>
      <Header />
      <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
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
      </ScrollView>
    </>
  );
}
