import {View, Text, Image} from 'react-native';
import React from 'react';

export default function NoRecordFoundScreen() {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://cdn2.iconfinder.com/data/icons/strongicon-vol-10/24/home-042-close-512.png',
        }}
        style={{width: 90, height: 90}}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          textAlign: 'center',
          fontFamily: 'BlissPro-Bold',
        }}>
        We are sorry! Currently no houses are available in your location..
      </Text>
    </View>
  );
}
