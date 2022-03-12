import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {Button, TextInput} from 'react-native-paper';
const ContactUsScreen = () => {
  return (
    <>
      <Header title="Contact Us" />
      <ScrollView style={styles.screenContainer}>
        <View style={styles.container}>
          <TextInput
            theme={{
              colors: {
                primary: '#2471A3',
              },
            }}
            label="Name"
            secure={true}
            passwordField={true}
            style={styles.inputField}
          />
          <TextInput
            theme={{
              colors: {
                primary: '#2471A3',
              },
            }}
            label="Email"
            secure={true}
            passwordField={true}
            style={styles.inputField}
          />
          <TextInput
            theme={{
              colors: {
                primary: '#2471A3',
              },
            }}
            keyboardType={'numeric'}
            label="Phone"
            secure={true}
            passwordField={true}
            style={styles.inputField}
          />
          <TextInput
            theme={{
              colors: {
                primary: '#2471A3',
              },
            }}
            label="Query Title"
            secure={true}
            passwordField={true}
            style={styles.inputField}
          />
          <TextInput
            theme={{
              colors: {
                primary: '#2471A3',
              },
            }}
            multiline={true}
            label="Write Your Query"
            secure={true}
            passwordField={true}
            style={styles.queryTxt}
          />
          <TouchableOpacity style={styles.inputField}>
            <Image
              style={styles.cameraContainer}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/High-contrast-camera-photo.svg/2048px-High-contrast-camera-photo.svg.png',
                width: 130,
                height: 130,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.imgSubTxt}>
            Upload Image If You Have To Show Us
          </Text>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{backgroundColor: 'black'}}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default ContactUsScreen;
