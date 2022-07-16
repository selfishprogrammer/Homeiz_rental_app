/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/Header';
import moment from 'moment';
import Services from '../../services/Services';
import {useNavigation} from '@react-navigation/core';
export default function ViewRequestScreen(props) {
  console.log('deta>>>', props.route.params.details);
  const navigation = useNavigation();
  useEffect(() => {
    if (details.status === 'pending') {
      updateRequestStatus('approved');
    }
  }, []);

  const updateRequestStatus = async status => {
    const requestDetails = {
      flat_id: details.flat_id,
      email: details.email,
      status: status,
    };

    const data = await Services.requestStatusUpdated(requestDetails);
    console.log('data===+++>>>>', data);
  };
  const renderDetailsOfRequester = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginVertical: 20,
          justifyContent: 'center',
          marginHorizontal: 20,
          elevation: 3,
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            fontSize: 15,
            color: 'grey',
            marginVertical: 10,
          }}>
          NAME OF REQUESTER :{' '}
          <Text style={{color: 'black'}}>{details.name.toUpperCase()}</Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            fontSize: 15,
            color: 'grey',
            marginVertical: 10,
          }}>
          EMAIL OF REQUESTER :{' '}
          <Text style={{color: 'black'}}>{details.email.toUpperCase()}</Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            fontSize: 15,
            color: 'grey',
            marginVertical: 10,
          }}>
          PHONE OF REQUESTER :{' '}
          <Text style={{color: 'black'}}>{details.phone.toUpperCase()}</Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            fontSize: 15,
            color: 'grey',
            marginVertical: 10,
          }}>
          ADDRESS OF REQUESTER :{' '}
          <Text style={{color: 'black'}}>{details.address.toUpperCase()}</Text>
        </Text>
      </View>
    );
  };
  const renderRequestAndRating = () => {
    return (
      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            fontSize: 15,
            color: 'grey',
          }}>
          DATE OF REQUEST :{' '}
          <Text style={{color: 'black'}}>
            {moment(details.date_of_request).format('DD-MM-YY')}
          </Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            fontSize: 15,
            color: 'grey',
          }}>
          RATING : <Text style={{color: 'black'}}>3.5*</Text>
        </Text>
      </View>
    );
  };
  const {details} = props.route.params;
  return (
    <>
      <Header />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          elevation: 3,
          margin: 10,
          borderRadius: 10,
          padding: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            fontSize: 20,
            color: 'grey',
          }}>
          New Request From Buyer for House{' '}
          <Text style={{color: 'black'}}>{details.flat_name}</Text>
        </Text>
        {renderRequestAndRating()}
        <Text
          style={{
            marginTop: 5,
            textAlign: 'center',
            fontFamily: 'BlissPro-Bold',
            color: 'red',
          }}>
          DETAILS OF REQUESTER
        </Text>
        {renderDetailsOfRequester()}

        <View style={{marginVertical: 10, marginHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => {
              updateRequestStatus('rejected');
              navigation.navigate('approved');
            }}
            style={{
              marginVertical: 5,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'green',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'BlissPro',
                fontSize: 18,
                color: 'green',
              }}>
              Approve Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateRequestStatus('rejected');
              navigation.navigate('OwnerHomeScreen');
            }}
            style={{
              marginVertical: 5,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'red',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'BlissPro',
                fontSize: 18,
                color: 'red',
              }}>
              Reject Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateRequestStatus('completed');
              navigation.navigate('OwnerHomeScreen');
            }}
            style={{
              marginVertical: 5,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'yellowgreen',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'BlissPro',
                fontSize: 18,
                color: 'yellowgreen',
              }}>
              Completed Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 45,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'BlissPro-Bold',
                fontSize: 18,
                color: 'black',
              }}>
              View House
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OwnerHomeScreen');
            }}
            style={{
              marginVertical: 10,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'red',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'BlissPro',
                fontSize: 18,
                color: 'red',
              }}>
              Back To Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
