/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Auth from '../../services/Auth';
import Services from '../../services/Services';
import {useIsFocused, useNavigation} from '@react-navigation/core';
// import {TouchableOpacity} from 'react-native-gesture-handler';
export default function OwnerHomeScreen() {
  const [email, setemail] = useState('');
  const [requestArray, setrequestArray] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getUser();
    if (isFocused) {
      getHouseRequest('');
    }
    getHouseRequest('');
  }, [isFocused]);
  const navigation = useNavigation();
  const getUser = async () => {
    const usersData = await Auth.getUser();
    setemail(usersData?.email);
  };
  const getHouseRequest = async status1 => {
    const houseData = {
      owner_email: email,
      status: status1,
    };
    console.log('houseData', houseData);
    const contactRequest = await Services.getHouseRequestToOwner(houseData);
    console.log('data++====>>>', contactRequest);
    if (contactRequest?.status === 'false') {
      setrequestArray([]);
    } else {
      setrequestArray(contactRequest);
    }
  };
  const renderFilter = () => {
    return (
      <>
        <ScrollView
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            onPress={() => getHouseRequest('')}
            style={{
              elevation: 4,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <Text style={{padding: 10, fontFamily: 'BlissPro-Bold'}}>
              Reset Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getHouseRequest('date')}
            style={{
              elevation: 4,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <Text style={{padding: 10, fontFamily: 'BlissPro-Bold'}}>
              Arrange By Date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getHouseRequest('pending')}
            style={{
              elevation: 4,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <Text style={{padding: 10, fontFamily: 'BlissPro-Bold'}}>
              Status Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getHouseRequest('completed')}
            style={{
              elevation: 4,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <Text style={{padding: 10, fontFamily: 'BlissPro-Bold'}}>
              Status Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getHouseRequest('rejected')}
            style={{
              elevation: 4,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <Text style={{padding: 10, fontFamily: 'BlissPro-Bold'}}>
              Status Rejected
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getHouseRequest('approved')}
            style={{
              elevation: 4,
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: '#fff',
            }}>
            <Text style={{padding: 10, fontFamily: 'BlissPro-Bold'}}>
              Status Approved
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  };
  const renderHouse = () => {
    if (requestArray.length > 0) {
      return requestArray.map((item, key) => (
        <TouchableOpacity
          key={key}
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 8,
            margin: 10,
          }}
          onPress={() =>
            navigation.navigate('ViewRequestScreen', {
              details: item,
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                margin: 5,
                marginHorizontal: 10,
                fontFamily: 'BlissPro-Bold',
                color: 'grey',
                paddingTop: 2,
              }}>
              {item.status === 'pending' ? 'New Request' : 'Completed'}
              {'   '}
              {item.date_of_request}
              {'    '}
              {item.status === 'pending' ? (
                <View
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 5.5,
                    backgroundColor: 'red',
                    marginHorizontal: 17,
                    marginVertical: 8,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 5.5,
                    backgroundColor: 'yellowgreen',
                    marginHorizontal: 17,
                    marginVertical: 8,
                  }}
                />
              )}
            </Text>
            <Text
              style={{
                margin: 5,
                fontFamily: 'BlissPro-Bold',
                color: 'grey',
                paddingTop: 2,
                marginHorizontal: 10,
                fontSize: 20,
              }}>
              3.5 *
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 10,
              fontSize: 18,
              fontFamily: 'BlissPro-Bold',
              color: 'grey',
            }}>
            {item.flat_name}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 10,
              fontSize: 14,
              fontFamily: 'BlissPro-Bold',
              color: 'grey',
              marginHorizontal: 20,
            }}>
            {item.flat_address},{item.zip}
          </Text>
        </TouchableOpacity>
      ));
    } else {
      return null;
    }
  };
  return (
    <ScrollView>
      <Header />
      {renderFilter()}
      <ScrollView nestedScrollEnabled={true}>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 10,
            fontSize: 25,
            fontFamily: 'BlissPro-Bold',
          }}>
          Top Higly Rated Houses
        </Text>
        {renderHouse()}
      </ScrollView>
    </ScrollView>
  );
}
