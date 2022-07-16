/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import Loader from '../../constants/Loader';
import Permission from '../../constants/Permission';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/core';

export default function AddHousesScreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [houseName, sethouseName] = useState('');
  const [address, setaddress] = useState('');
  const [houseDetails, sethouseDetails] = useState('');
  const [selectStates, setselectStates] = useState('');
  const [selectDistrict, setselectDistrict] = useState('');
  const [selectBhk, setselectBhk] = useState('');
  const [squareFoot, setsquareFoot] = useState('');
  const [noOfFloors, setnoOfFloors] = useState('');
  const [selectPool, setselectPool] = useState('');
  const [selectSecurity, setselectSecurity] = useState('');
  const [selectBathroom, setselectBathroom] = useState('');
  const [selectFurneshied, setselectFurneshied] = useState('');
  const [selectlistedBy, setselectlistedBy] = useState('');
  const [selectParkingAvaliblity, setselectParkingAvaliblity] = useState('');
  const [selectGardenAvaliblity, setselectGardenAvaliblity] = useState('');
  const [rentPrice, setrentPrice] = useState('');
  const [showMore, setshowMore] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [pin_code, setpin_code] = useState('');

  const [langLat, setlangLat] = useState({
    longitude: 0,
    latitude: 0,
  });

  // const [hasLocationPermission, sethasLocationPermission] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchUser();
    checkLocationPermission();
    if (isFocused) {
      checkLocationPermission();
    }
  }, []);
  const checkLocationPermission = async () => {
    const hasLocation = await Permission.hasLocationPermission();
    console.log('hasLocation', hasLocation);
    if (!hasLocation) {
      Permission.askLocation()
        .then(hasLocationPermission => {
          console.log('hasLocationPermission ==>>>>', hasLocationPermission);
          if (hasLocationPermission) {
            // sethasLocationPermission(true);
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
        setlangLat(latLong);
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
      Alert.alert('Location Updated', latLongData.data);
    } else {
      Alert.alert('error', latLongData.data);
    }
  };

  const addHouse = async () => {
    const data = {
      flat_name: houseName,
      name,
      email,
      phone,
      user_id: email,
      address,
      latitude: Math.floor(langLat.latitude),
      longitude: Math.floor(langLat.longitude),
      latitude_for_map: langLat.latitude,
      longitude_for_map: langLat.longitude,
      pin_code,
      parking: selectParkingAvaliblity,
      type: '',
      bathroom: selectBathroom,
      furnishing: selectFurneshied,
      listed_by: selectlistedBy,
      bhk: selectBhk,
      sqft: squareFoot,
      bachlor: 'YES',
      total_floors: noOfFloors,
      house_details: houseDetails,
      state: selectStates,
      district: selectDistrict,
      your_price: rentPrice,
      recommend_price: rentPrice,
      real_price: rentPrice,
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: '',
      status: 'pending',
    };

    const addHouseInDb = await Services.addHouse(data);
    if (addHouseInDb.status === 'true') {
      alert(addHouseInDb.data);
    } else {
      alert(addHouseInDb.data);
    }
  };
  const updateProfile = async () => {
    const previous_email = await Auth.getUserEmail();
    const userInfo = {
      name,
      email,
      phone,
      previous_email,
    };
    setisLoading(true);
    const response = await Services.editProfile(userInfo);
    console.log('userInfo====>', userInfo);
    console.log('response======>', response);
    if (response.status === 'true') {
      await Auth.setUserEmail(response.email);
      const setUserInfo = {
        name: response.name,
        email: response.email,
        phone: response.phone,
        categories: 'owner',
      };
      await Auth.setUser(setUserInfo);
      Alert.alert(response.data);
      setshowMore(false);
    } else {
      Alert.alert(response.data);
    }
    setisLoading(false);
  };
  const states = [
    {
      label: 'Select State Of House',
      value: '',
    },
    {
      label: 'Kolkata',
      value: 'Kolkata',
    },
    {
      label: 'Siliguri',
      value: 'Siliguri',
    },
    {
      label: 'Bankura',
      value: 'Bankura',
    },
  ];
  const district = [
    {
      label: 'Select District Of House',
      value: '',
    },
    {
      label: 'Kolkata',
      value: 'Kolkata',
    },
    {
      label: 'Siliguri',
      value: 'Siliguri',
    },
    {
      label: 'Bankura',
      value: 'Bankura',
    },
  ];
  const bhk = [
    {
      label: 'Select BHK',
      value: '',
    },
    {
      label: '1BHK',
      value: '1',
    },
    {
      label: '2BHK',
      value: '2',
    },
    {
      label: '3BHK',
      value: '3',
    },
    {
      label: '4BHK',
      value: '4',
    },
  ];
  const parking = [
    {
      label: 'Select Parking Availablity',
      value: '',
    },
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
    {
      label: 'Under Constructions',
      value: 'Under Constructions',
    },
  ];
  const gardern = [
    {
      label: 'Select Garden Availablity',
      value: '',
    },
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
    {
      label: 'Under Constructions',
      value: 'Under Constructions',
    },
  ];
  const pool = [
    {
      label: 'Select Pool Availablity',
      value: '',
    },
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
    {
      label: 'Under Constructions',
      value: 'Under Constructions',
    },
  ];
  const securityGaurd = [
    {
      label: 'Select Security Gaurd Availablity',
      value: '',
    },
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
    {
      label: 'Under Constructions',
      value: 'Under Constructions',
    },
  ];
  const listedBy = [
    {
      label: 'Select Listed By',
      value: '',
    },
    {
      label: 'Owner',
      value: 'Owner',
    },
    {
      label: 'Broker',
      value: 'Broker',
    },
  ];
  const furneshed = [
    {
      label: 'Select Furnished Or Not',
      value: '',
    },
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
  ];

  const bathroom = [
    {
      label: 'Select Bathroom',
      value: '',
    },
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '2+',
      value: '2+',
    },
  ];

  const fetchUser = async () => {
    const usersData = await Auth.getUser();
    console.log('userdata=====>>', usersData);
    setname(usersData.name);
    setemail(usersData.email);
    setphone(usersData.phone);
  };

  const showMoreIcon = () => {
    if (showMore) {
      return (
        <TouchableOpacity
          onPress={() => {
            setshowMore(false);
          }}>
          <Image
            source={{
              uri: 'https://icon-library.com/images/up-arrow-icon-png/up-arrow-icon-png-22.jpg',
            }}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          setshowMore(true);
        }}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Arrow-down.svg/1200px-Arrow-down.svg.png',
          }}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    );
  };
  const showMoreDetails = () => {
    if (showMore) {
      return (
        <>
          <View style={{borderBottomWidth: 0.5, color: 'grey'}} />
          <View style={{margin: 10}}>
            <TextInput
              theme={{
                colors: {
                  primary: 'green',
                  text: 'green',
                },
                fonts: {
                  regular: {
                    fontFamily: 'BlissPro-Bold',
                  },
                },
              }}
              value={name}
              onChangeText={val => setname(val)}
              label="Owner Name"
              selectionColor="green"
              mode="outlined"
              outlineColor="green"
              style={[styles.inputField, {margin: 5}]}
            />
            <TextInput
              theme={{
                colors: {
                  primary: 'green',
                  text: 'green',
                },
                fonts: {
                  regular: {
                    fontFamily: 'BlissPro-Bold',
                  },
                },
              }}
              value={email}
              onChangeText={val => setemail(val)}
              label="Owner Email"
              selectionColor="green"
              mode="outlined"
              outlineColor="green"
              style={[styles.inputField, {margin: 5}]}
            />
            <TextInput
              theme={{
                colors: {
                  primary: 'green',
                  text: 'green',
                },
                fonts: {
                  regular: {
                    fontFamily: 'BlissPro-Bold',
                  },
                },
              }}
              value={phone}
              onChangeText={val => setphone(val)}
              label="Owner Phone"
              selectionColor="green"
              keyboardType={'numeric'}
              mode="outlined"
              outlineColor="green"
              style={[styles.inputField, {margin: 5}]}
            />
            <View
              style={[
                styles.inputField,
                {
                  borderWidth: 1,
                  borderColor: 'green',
                  borderRadius: 5,
                },
              ]}>
              <TouchableOpacity
                style={{padding: 15}}
                onPress={() => updateProfile()}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontFamily: 'BlissPro-Bold',
                    color: 'green',
                  }}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }
  };
  const renderUpdateProfile = () => {
    return (
      <View
        style={{
          borderRadius: 5,
          elevation: 10,

          backgroundColor: '#fff',
        }}>
        <View
          style={{
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <Text
              style={{
                fontFamily: 'BlissPro-Bold',
                textAlign: 'center',
                fontSize: 15,
                color: 'green',
                // marginVertical: 20,
              }}>
              REVIEW / EDIT YOUR PROFILE
            </Text>
            {showMoreIcon()}
          </View>
          {showMoreDetails()}
        </View>
      </View>
    );
  };
  const renderHouseForm = () => {
    return (
      <View style={{margin: 15}}>
        <TextInput
          theme={{
            colors: {
              primary: 'green',
              text: 'green',
            },
            fonts: {
              regular: {
                fontFamily: 'BlissPro-Bold',
              },
            },
          }}
          value={houseName}
          onChangeText={val => sethouseName(val)}
          label="House/Flat Name"
          selectionColor="green"
          mode="outlined"
          outlineColor="green"
          style={styles.inputField}
        />

        <TextInput
          theme={{
            colors: {
              primary: 'green',
              text: 'green',
            },
            fonts: {
              regular: {
                fontFamily: 'BlissPro-Bold',
              },
            },
          }}
          value={houseDetails}
          onChangeText={val => sethouseDetails(val)}
          label="House/Flat Details (About House)"
          selectionColor="green"
          mode="outlined"
          outlineColor="green"
          style={[styles.inputField, {height: 100}]}
        />
        <TextInput
          theme={{
            colors: {
              primary: 'green',
              text: 'green',
            },
            fonts: {
              regular: {
                fontFamily: 'BlissPro-Bold',
              },
            },
          }}
          value={address}
          onChangeText={val => setaddress(val)}
          label="House/Flat Address (Landmark)"
          selectionColor="green"
          mode="outlined"
          outlineColor="green"
          style={[styles.inputField, {height: 100}]}
        />
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectStates}
            onValueChange={value => setselectStates(value)}
            itemStyle={{fontWeight: '700'}}>
            {states.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <TextInput
          theme={{
            colors: {
              primary: 'green',
              text: 'green',
            },
            fonts: {
              regular: {
                fontFamily: 'BlissPro-Bold',
              },
            },
          }}
          value={pin_code}
          onChangeText={val => setpin_code(val)}
          label="Zip Code"
          selectionColor="green"
          keyboardType="numeric"
          maxLength={6}
          mode="outlined"
          outlineColor="green"
          style={styles.inputField}
        />
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectDistrict}
            onValueChange={value => setselectDistrict(value)}
            itemStyle={{fontWeight: '700'}}>
            {district.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectBhk}
            onValueChange={value => setselectBhk(value)}
            itemStyle={{fontWeight: '700'}}>
            {bhk.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <TextInput
          theme={{
            colors: {
              primary: 'green',
              text: 'green',
            },
            fonts: {
              regular: {
                fontFamily: 'BlissPro-Bold',
              },
            },
          }}
          value={squareFoot}
          onChangeText={val => setsquareFoot(val)}
          label="Square Ft (eg: 400 ,800 etc)"
          selectionColor="green"
          keyboardType="numeric"
          maxLength={4}
          mode="outlined"
          outlineColor="green"
          style={styles.inputField}
        />
        <TextInput
          theme={{
            colors: {
              primary: 'green',
              text: 'green',
            },
            fonts: {
              regular: {
                fontFamily: 'BlissPro-Bold',
              },
            },
          }}
          value={noOfFloors}
          onChangeText={val => setnoOfFloors(val)}
          label="Number of floors(eg: 4,8 etc)"
          selectionColor="green"
          keyboardType="numeric"
          maxLength={2}
          mode="outlined"
          outlineColor="green"
          style={styles.inputField}
        />
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectPool}
            onValueChange={value => setselectPool(value)}
            itemStyle={{fontWeight: '700'}}>
            {pool.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectSecurity}
            onValueChange={value => setselectSecurity(value)}
            itemStyle={{fontWeight: '700'}}>
            {securityGaurd.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectBathroom}
            onValueChange={value => setselectBathroom(value)}
            itemStyle={{fontWeight: '700'}}>
            {bathroom.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectFurneshied}
            onValueChange={value => setselectFurneshied(value)}
            itemStyle={{fontWeight: '700'}}>
            {furneshed.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectlistedBy}
            onValueChange={value => setselectlistedBy(value)}
            itemStyle={{fontWeight: '700'}}>
            {listedBy.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectParkingAvaliblity}
            onValueChange={value => setselectParkingAvaliblity(value)}
            itemStyle={{fontWeight: '700'}}>
            {parking.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <Picker
            dropdownIconColor="green"
            selectedValue={selectGardenAvaliblity}
            onValueChange={value => setselectGardenAvaliblity(value)}
            itemStyle={{fontWeight: '700'}}>
            {gardern.map((item, key) => {
              return (
                <Picker.Item
                  key={key}
                  style={{
                    fontWeight: '700',
                    color: 'green',
                    fontFamily: 'serif',
                  }}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
        <TextInput
          theme={{
            colors: {
              primary: 'green',
              text: 'green',
            },
            fonts: {
              regular: {
                fontFamily: 'BlissPro-Bold',
              },
            },
          }}
          value={rentPrice}
          onChangeText={val => setrentPrice(val)}
          label="Enter your rent price"
          selectionColor="green"
          keyboardType="numeric"
          maxLength={8}
          mode="outlined"
          outlineColor="green"
          style={styles.inputField}
        />
        {renderUpdateProfile()}
        <View
          style={[
            styles.inputField,
            {
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 5,
            },
          ]}>
          <TouchableOpacity style={{padding: 15}} onPress={() => addHouse()}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'BlissPro-Bold',
                color: 'green',
              }}>
              Submit House For Approval
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <View
        style={{
          margin: 10,
          flex: 1,
          elevation: 10,
          backgroundColor: '#fff',
          borderRadius: 5,
        }}>
        <ScrollView>
          <Loader spin={isLoading} />
          <Text
            style={{
              fontFamily: 'BlissPro-Bold',
              textAlign: 'center',
              fontSize: 20,
              marginVertical: 10,
            }}>
            ADD NEW HOUSE/FLAT FOR RENT
          </Text>
          <View style={{borderBottomWidth: 0.5, color: 'grey'}} />
          {renderHouseForm()}
        </ScrollView>
      </View>
    </View>
  );
}
