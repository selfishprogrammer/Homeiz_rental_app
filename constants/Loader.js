import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Colors from './Colors';

export default function Loader(props) {
  if (props.spin) {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 99999,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <ActivityIndicator size={60} color={Colors.button} />
      </View>
    );
  } else {
    return null;
  }
}
