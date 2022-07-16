import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Auth from '../services/Auth';
const Mapview = props => {
  const [latitude, setlatitude] = useState(0.0);
  const [longitude, setlongitude] = useState(0.0);
  // const [region, setregion] = useState();
  useEffect(() => {
    getCoords();
  }, []);
  console.log('first=====>', props.route.params);
  const getCoords = async () => {
    const latLong = await Auth.getLatLong();
    console.log('longi:', latLong.latitude);
    setlatitude(latLong.latitude);
    setlongitude(latLong.longitude);
  };
  const mapref = useRef(null);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapref}
        // remove if not using Google Maps
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: Number(props.route.params.latitude),
            longitude: Number(props.route.params.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Icons8_flat_home.svg/2048px-Icons8_flat_home.svg.png',
            }}
            style={{
              width: 40,
              height: 40,
            }}
            resizeMode="center"
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Image
            source={{
              uri: 'https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png',
            }}
            style={{width: 40, height: 40}}
            resizeMode="center"
          />
        </Marker>
        {/* http://simpleicon.com/wp-content/uploads/navigation.png */}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          mapref.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}>
        <View
          style={{
            marginBottom: 30,
            marginLeft: 320,
            borderRadius: 45,
            backgroundColor: 'white',
            padding: 5,
          }}>
          <Image
            source={{
              uri: 'http://simpleicon.com/wp-content/uploads/navigation-2.png',
            }}
            style={{
              width: 40,
              height: 40,
            }}
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Mapview;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: 800,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
