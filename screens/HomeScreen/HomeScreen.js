import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import {logo} from '../../constants/Images';
import FooterScreen from '../FooterScreeen/FooterScreen';
import styles from './styles';
const Homescreen = () => {
  return (
    <ScrollView>
      <ImageBackground
        source={{
          uri: 'https://img.freepik.com/free-vector/simple-blank-red-background-business_53876-115949.jpg',
        }}
        resizeMode="cover"
        style={styles.searchImage}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <SearchBar />
      </ImageBackground>
      <View style={styles.offerContainer}>
        <Image
          source={{uri: 'http://www.oclicker.com/uploads/Mayfair_Offer.jpg'}}
          style={styles.offerImg}
        />
      </View>
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

export default Homescreen;
