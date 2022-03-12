import React from 'react';
import {View, Text, Linking, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
export default function FooterScreen() {
  return (
    <View style={{backgroundColor: '#303840', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Image
          source={{
            uri: 'https://www.freepnglogos.com/uploads/copyright-png/copyright-logo-png-clipart-best-5.png',
          }}
          style={{
            width: 10,
            height: 10,
            tintColor: 'white',
            marginTop: 5,
            marginRight: 5,
          }}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            marginRight: 4,
          }}>
          2021-2022
        </Text>
        <Text
          style={{
            color: '#41B2F3',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            marginLeft: 10,
          }}
          onPress={() => Linking.openURL('http://codegeekss.epizy.com/')}>
          Terms of use
        </Text>
      </View>
      <Text
        style={{
          flexDirection: 'row',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 10,
          color: 'white',
        }}
        onPress={() => Linking.openURL('http://codegeekss.epizy.com/')}>
        Terms & Conditions
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',

          marginBottom: 10,
        }}>
        <Image
          source={{
            uri: 'https://cdn.icon-icons.com/icons2/2066/PNG/512/instagram_icon_125245.png',
          }}
          style={{
            width: 30,
            height: 30,
            tintColor: 'white',
            marginTop: 5,
            marginRight: 20,
          }}
        />

        <Image
          source={{
            uri: 'https://cdn.icon-icons.com/icons2/790/PNG/512/fb_icon-icons.com_65434.png',
          }}
          style={{
            width: 30,
            height: 30,
            tintColor: 'white',
            marginTop: 5,
            marginRight: 20,
          }}
        />

        <Image
          source={{
            uri: 'https://cdn.icon-icons.com/icons2/791/PNG/512/YOUTUBE_icon-icons.com_65487.png',
          }}
          style={{
            width: 30,
            height: 30,
            tintColor: 'white',
            marginTop: 5,
            marginRight: 20,
          }}
        />
      </View>
    </View>
  );
}
