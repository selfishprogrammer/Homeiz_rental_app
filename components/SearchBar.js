import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
export default function SearchBar() {
  const [query, setQuery] = useState();
  const navigation = useNavigation();
  const getDataByLocation = () => {
    navigation.navigate('HouseScreen', {
      search_based_on: 'location',
    });
  };
  const getHouseByCity = async () => {
    // const house = await Services.houseByCity({city: query});
    // console.log('data=======>', house);
    navigation.navigate('HouseScreen', {
      city: query,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <TouchableOpacity onPress={() => getHouseByCity()}>
            <Image
              style={styles.icSearch}
              source={{
                uri: 'https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png',
              }}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          value={query}
          placeholder="Search by your city..."
          style={styles.textInput}
          onChangeText={e => setQuery(e)}
        />
        <View style={styles.vwSearch}>
          <TouchableOpacity onPress={() => getDataByLocation()}>
            <Image
              style={styles.icSearch}
              source={{
                uri: 'https://icons-for-free.com/iconfiles/png/512/bx+current+location-1325051865916848437.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#143945',
    fontSize: 16,
    fontFamily: 'BlissPro',
    // fontWeight: 'bold',
  },

  vwSearch: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 40,
    // backgroundColor: 'red'
  },
  icSearch: {
    height: 30,
    width: 30,
    // fontFamily: 'BlissPro-Bold',
  },

  searchContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: 60,
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  container: {
    height: 80,
    alignItems: 'center',
    marginTop: 5,

    // height: '100%', width: '100%'
  },
});
