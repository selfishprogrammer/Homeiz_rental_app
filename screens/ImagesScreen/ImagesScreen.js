import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
export default function ImagesScreen(props) {
  return (
    <>
      <Header />
      <ScrollView
        //   horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          {
            // overFlowX: 'auto',
          }
        }>
        {/* {console.log(props)} */}
        <Image
          source={{
            uri: props.route.params.images_1,
          }}
          style={{width: '100%', height: 300, marginVertical: 10}}
        />

        <Image
          source={{
            uri: props.route.params.images_2,
          }}
          style={{width: '100%', height: 300, marginVertical: 10}}
        />

        <Image
          source={{
            uri: props.route.params.images_3,
          }}
          style={{width: '100%', height: 300, marginVertical: 10}}
        />
        <Image
          source={{
            uri: props.route.params.images_4,
          }}
          style={{width: '100%', height: 300, marginVertical: 10}}
        />
      </ScrollView>
    </>
  );
}
