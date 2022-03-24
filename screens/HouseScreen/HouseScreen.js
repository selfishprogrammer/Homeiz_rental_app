import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import Filters from '../../components/Filters';
import SearchBar from '../../components/SearchBar';
import styles from './styles';

const Housescreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0, 57, 72, 1)'}}>
      <ScrollView>
        <View style={styles.container}>
          <SearchBar />
        </View>
        <View style={styles.container2}>
          <Filters />
        </View>
        <View style={styles.toastView}>
          <Image
            source={{
              uri: 'https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2020/12/25/907391-housing-pixabat.jpg',
            }}
            style={styles.houseImg}
          />
          <Text
            style={{
              fontFamily: 'serif',
              textAlign: 'center',
              marginVertical: 10,
              fontWeight: 'bold',
              color: 'black',
            }}>
            PAYAL HOUSES
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'cursive',
              fontWeight: 'bold',
              color: 'black',
            }}>
            2BHK Flat In Kestopur
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
              <Text style={styles.nearBy}>2Km From City Hospital</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.distanceClick}>
              <Text style={styles.nearBy}>100mts Nearby Police Station</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.distanceClick}>
              <Text style={styles.nearBy}>1Km Nearby Super Market</Text>
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
            <Text style={[styles.bhk, {color: 'green'}]}>33.50L-50L</Text>
            <Text style={styles.bhk}>2000-3000 sqft</Text>
            <Text style={styles.bhk}>2BHK</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              fontFamily: 'serif',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Express a new life living with payal house. Make your dream come
            true with us.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              fontFamily: 'serif',
              fontSize: 15,
              color: 'blue',
            }}>
            Kolkata Kestopur , New Town Kolkata , 731001 , West Bengal
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={[
                styles.btnContainer,
                {backgroundColor: 'blue', marginRight: 20},
              ]}
              onPress={() => {
                console.log('object');
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.btnTxt,
                    {color: 'white', fontFamily: 'serif'},
                  ]}>
                  Explore More
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnContainer, {backgroundColor: 'green'}]}
              onPress={() => {
                console.log('object');
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.btnTxt,
                    {color: 'white', fontFamily: 'serif'},
                  ]}>
                  View Mobile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.toastView}>
          <Image
            source={{
              uri: 'https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2020/12/25/907391-housing-pixabat.jpg',
            }}
            style={styles.houseImg}
          />
          <Text
            style={{
              fontFamily: 'serif',
              textAlign: 'center',
              marginVertical: 10,
              fontWeight: 'bold',
              color: 'black',
            }}>
            PAYAL HOUSES
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'cursive',
              fontWeight: 'bold',
              color: 'black',
            }}>
            2BHK Flat In Kestopur
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
              <Text style={styles.nearBy}>2Km From City Hospital</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.distanceClick}>
              <Text style={styles.nearBy}>100mts Nearby Police Station</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.distanceClick}>
              <Text style={styles.nearBy}>1Km Nearby Super Market</Text>
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
            <Text style={[styles.bhk, {color: 'green'}]}>33.50L-50L</Text>
            <Text style={styles.bhk}>2000-3000 sqft</Text>
            <Text style={styles.bhk}>2BHK</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              fontFamily: 'serif',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Express a new life living with payal house. Make your dream come
            true with us.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              fontFamily: 'serif',
              fontSize: 15,
              color: 'blue',
            }}>
            Kolkata Kestopur , New Town Kolkata , 731001 , West Bengal
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={[
                styles.btnContainer,
                {backgroundColor: 'blue', marginRight: 20},
              ]}
              onPress={() => {
                console.log('object');
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.btnTxt,
                    {color: 'white', fontFamily: 'serif'},
                  ]}>
                  Explore More
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnContainer, {backgroundColor: 'green'}]}
              onPress={() => {
                console.log('object');
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.btnTxt,
                    {color: 'white', fontFamily: 'serif'},
                  ]}>
                  View Mobile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.toastView}>
          <Image
            source={{
              uri: 'https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2020/12/25/907391-housing-pixabat.jpg',
            }}
            style={styles.houseImg}
          />
          <Text
            style={{
              fontFamily: 'serif',
              textAlign: 'center',
              marginVertical: 10,
              fontWeight: 'bold',
              color: 'black',
            }}>
            PAYAL HOUSES
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'cursive',
              fontWeight: 'bold',
              color: 'black',
            }}>
            2BHK Flat In Kestopur
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
              <Text style={styles.nearBy}>2Km From City Hospital</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.distanceClick}>
              <Text style={styles.nearBy}>100mts Nearby Police Station</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.distanceClick}>
              <Text style={styles.nearBy}>1Km Nearby Super Market</Text>
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
            <Text style={[styles.bhk, {color: 'green'}]}>33.50L-50L</Text>
            <Text style={styles.bhk}>2000-3000 sqft</Text>
            <Text style={styles.bhk}>2BHK</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              fontFamily: 'serif',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Express a new life living with payal house. Make your dream come
            true with us.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              margin: 10,
              fontFamily: 'serif',
              fontSize: 15,
              color: 'blue',
            }}>
            Kolkata Kestopur , New Town Kolkata , 731001 , West Bengal
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={[
                styles.btnContainer,
                {backgroundColor: 'blue', marginRight: 20},
              ]}
              onPress={() => {
                console.log('object');
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.btnTxt,
                    {color: 'white', fontFamily: 'serif'},
                  ]}>
                  Explore More
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnContainer, {backgroundColor: 'green'}]}
              onPress={() => {
                console.log('object');
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.btnTxt,
                    {color: 'white', fontFamily: 'serif'},
                  ]}>
                  View Mobile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Housescreen;
