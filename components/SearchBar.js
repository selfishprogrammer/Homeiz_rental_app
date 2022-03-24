import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';
export default function SearchBar() {
  const [query, setQuery] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Image
            style={styles.icSearch}
            source={{
              uri: 'https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png',
            }}
          />
        </View>

        <TextInput
          value={query}
          placeholder="Search"
          style={styles.textInput}
        />
        <View style={styles.vwSearch}>
          <Image
            style={styles.icSearch}
            source={{
              uri: 'https://icons-for-free.com/iconfiles/png/512/bx+current+location-1325051865916848437.png',
            }}
          />
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
    // backgroundColor: 'green',
    flex: 1,
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
