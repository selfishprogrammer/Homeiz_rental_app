import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';

export default function FetchingHouseScreen() {
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
          uri: 'https://freesvg.org/img/Loading_icon_no_fade.png',
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
        We are Fething houses based on your location..
      </Text>
    </View>
  );
}
