/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import Contactownermodal from '../../components/ContactOwnerModal';
import Furnesing from '../../components/Furnesing';
import Overview from '../../components/Overview';
import Services from '../../services/Services';
import Header from '../../components/Header';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn, setSkipLogin} from '../../actions';
import {ScrollView} from 'react-native-gesture-handler';
const Explorescreen = props => {
  const navigation = useNavigation();
  const [houses, sethouses] = useState([]);
  const [visible, setvisible] = useState(false);
  const {skipLogin} = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getHouseById();
  }, []);
  const getHouseById = async () => {
    const housesById = await Services.getHouseBasedOnId({
      flat_id: props.route.params.flat_id,
    });
    sethouses(housesById);
    console.log('data==========>', houses);
  };
  const contactSeller = () => {
    if (visible) {
      return (
        <Contactownermodal
          flat_id={props.route.params.flat_id}
          house_name={houses[0].flat_name}
          owner_email={houses[0].owner_email}
          flat_details={houses[0].house_details}
          home_address={houses[0].home_address}
          zip_code={houses[0].pin_code}
          flat_name={houses[0].flat_name}
          onCancelCallback={visible => {
            setvisible(visible);
          }}
        />
      );
    }
  };
  const renderContactSeller = () => {
    return (
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <TouchableOpacity
          mode="contained"
          style={{
            backgroundColor: '#fff',
            padding: 10,

            elevation: 5,
            borderRadius: 10,
          }}
          // disabled={skipLogin ? true : false}
          onPress={() => {
            if (skipLogin) {
              // navigation.navigate('LoginScreen');
              dispatch(setSkipLogin(false));
              dispatch(setLoggedIn(false));
            }
            setvisible(true);
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'BlissPro',
              fontSize: 20,
            }}>
            {skipLogin ? 'Login Yourself to contact seller' : 'Contact Seller'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <ScrollView contentContainerStyle={styles.container}>
          {houses.map(house => {
            return (
              <View
                style={{
                  borderRadius: 10,
                  margin: 10,
                  elevation: 10,
                  backgroundColor: '#fff',
                }}>
                <ScrollView
                  // horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    // marginVertical: 10,
                    justifyContent: 'space-between',
                    // overFlowX: 'auto',
                  }}>
                  <Image
                    source={{
                      uri: house.image_1,
                    }}
                    style={[
                      styles.houseImg,
                      {borderTopLeftRadius: 10, borderTopRightRadius: 10},
                    ]}
                  />
                  <Image
                    source={{
                      uri: house.image_1,
                    }}
                    style={[
                      styles.houseImg,
                      {borderTopLeftRadius: 10, borderTopRightRadius: 10},
                    ]}
                  />
                  {/* <View>
                    <Image
                      source={{
                        uri: house.image_1,
                      }}
                      style={[
                        styles.houseImg,
                        {borderTopLeftRadius: 10, borderTopRightRadius: 10},
                      ]}
                    />
                  </View> */}
                </ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: 'BlissPro-Bold',
                      color: 'black',
                      // fontWeight: 'bold',

                      margin: 10,
                    }}>
                    {house.flat_name}
                  </Text>
                  {/* <Text
              style={{
                fontSize: 15,
                fontFamily: 'BlissPro-Bold',
                color: 'grey',
                // fontWeight: 'bold',
                marginHorizontal: 20,
                marginTop: 20,
              }}>
              200 sqft
            </Text> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'BlissPro-Bold',
                      color: 'blue',
                      // fontWeight: 'bold',
                      marginHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    {house.home_address},{house.pin_code}, West Bengal
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.btnContainer,
                    {backgroundColor: 'white', marginHorizontal: 10},
                  ]}
                  onPress={() => {
                    navigation.navigate('ImageScreen', {
                      images_1: house.image_1,
                      images_2: house.image_2,
                      images_3: house.image_3,
                      images_4: house.image_4,
                    });
                  }}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.btnTxt,
                        {color: 'black', fontFamily: 'BlissPro-Bold'},
                      ]}>
                      View more images of {house.flat_name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BlissPro-Bold',
                      color: 'black',
                      // fontWeight: 'bold',
                      marginHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    {house.sqft} sqft
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'BlissPro-Bold',
                      color: 'black',
                      // fontWeight: 'bold',
                      marginHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    {house.bhk}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity>
                      <Image
                        source={{
                          uri: 'https://cdn3.iconfinder.com/data/icons/for-facebook-web/32/Ikon_FB-09-512.png',
                        }}
                        style={{width: 30, height: 30, margin: 10}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        source={{
                          // uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ei-heart.svg/2048px-Ei-heart.svg.png',
                          uri: 'https://cdn.iconscout.com/icon/free/png-512/heart-56-76703.png',
                        }}
                        style={{width: 32, height: 32, marginVertical: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontFamily: 'monospace',
                        color: 'black',
                        fontWeight: '900',
                        marginTop: 10,
                      }}>
                      <Image
                        source={{
                          uri: 'https://icon-library.com/images/rupee-icon/rupee-icon-16.jpg',
                        }}
                        style={{width: 20, height: 20}}
                      />{' '}
                      {Math.floor(house.real_price)}
                    </Text>
                  </View>
                </View>
                {renderContactSeller()}
                <View style={styles.container3}>
                  <Overview overview={house} />
                </View>
                <View style={styles.container3}>
                  <Furnesing about={house} />
                </View>
                <View style={{marginHorizontal: 10, marginVertical: 10}}>
                  {/* <View style={styles.mapcontainer}> */}
                  {/* <Mapview /> */}

                  <TouchableOpacity
                    style={[
                      styles.btnContainer,
                      {backgroundColor: 'white', marginHorizontal: 10},
                    ]}
                    onPress={() => {
                      navigation.navigate('MapScreen', {
                        longitude: house.longitude_for_map,
                        latitude: house.latitude_for_map,
                      });
                    }}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Text
                        style={[
                          styles.btnTxt,
                          {color: 'black', fontFamily: 'BlissPro-Bold'},
                        ]}>
                        View Location On Map
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* </View> */}
                </View>
                {contactSeller()}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default Explorescreen;
