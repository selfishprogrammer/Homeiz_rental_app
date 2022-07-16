import {View, Text, Image} from 'react-native';
import React from 'react';
import {homeiz_logo} from '../constants/Images';

export default function Logo() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
        backfaceVisibility: 'visible',
      }}>
      <Image source={homeiz_logo} style={{width: 200, height: 200}} />
    </View>
  );
}
