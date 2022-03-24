import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Linking,
  Modal,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {Button, TextInput} from 'react-native-paper';
import Auth from '../../services/Auth';
import Permission from '../../constants/Permission';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
const ContactUsScreen = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [query_title, setquery_title] = useState('');
  const [query, setquery] = useState('');
  const [imageChooseModal, setimageChooseModal] = useState(false);
  const [images, setimages] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);
  const contact_us = () => {
    console.log(name, email, phone, query_title, query, images);
  };
  const fetchUserData = async () => {
    const userData = await Auth.getUser();
    setname(userData?.name);
    setemail(userData?.email);
    setphone(userData?.phone);
  };
  const openCameras = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setimages(image.path);
    });
    setimageChooseModal(false);
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setimages(image.path);
    });
    setimageChooseModal(false);
  };
  const renderImageChooser = () => {
    return (
      <View>
        <Modal
          animationType="fade"
          visible={imageChooseModal}
          transparent={true}>
          <SafeAreaView style={{flex: 1}}>
            <View
              style={[
                styles.confirmModalContainer,
                {backgroundColor: '#00000066'},
              ]}>
              <View style={styles.confirmModalContent}>
                <Text style={styles.confirmfmText}>
                  Choose Your Image For Query
                </Text>

                <View style={styles.loginBtn}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      height: 50,
                      width: '100%',
                    }}>
                    <Text
                      style={styles.lgnbtnTxt}
                      onPress={() => openGallery()}>
                      Choose From Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.loginBtn}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      height: 50,
                      width: '100%',
                    }}>
                    <Text
                      style={styles.lgnbtnTxt}
                      onPress={() => openCameras()}>
                      Open Camera
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.loginBtn}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      height: 50,
                      width: '100%',
                    }}>
                    <Text
                      style={styles.lgnbtnTxt}
                      onPress={() => setimageChooseModal(false)}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  };

  return (
    <>
      <Header title="Contact Us" />
      {renderImageChooser()}
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
            value={name}
            onChangeText={e => setname(e)}
            disabled={true}
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
            value={email}
            onChangeText={e => setemail(e)}
            disabled={true}
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
            value={phone}
            onChangeText={e => setphone(e)}
            disabled={true}
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
            value={query_title}
            onChangeText={e => setquery_title(e)}
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
            value={query}
            onChangeText={e => setquery(e)}
          />
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => {
              setimageChooseModal(true);
            }}>
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
            onPress={() => {
              contact_us();
            }}
            style={{backgroundColor: 'black'}}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default ContactUsScreen;
