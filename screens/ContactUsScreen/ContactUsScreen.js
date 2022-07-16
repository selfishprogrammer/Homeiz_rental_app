/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {Button, TextInput} from 'react-native-paper';
import Auth from '../../services/Auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import Services from '../../services/Services';
import Successmodal from '../../components/SuccessModal';
import Loader from '../../constants/Loader';
const ContactUsScreen = ({navigation}) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [query_title, setquery_title] = useState('');
  const [query, setquery] = useState('');
  const [queryError, setqueryError] = useState('');
  const [query_titleError, setquery_titleError] = useState('');
  const [imageChooseModal, setimageChooseModal] = useState(false);
  const [images, setimages] = useState('');
  const [imagesError, setimagesError] = useState('');
  const [sucessTitle, setsucessTitle] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [backendResponce, setbackendResponce] = useState('');
  const [sucessModal, setsucessModal] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);
  const resetInputField = () => {
    setquery_title('');
    setquery('');
    setimages('');
  };
  const contact_us = async () => {
    setqueryError('');
    setimagesError('');
    setbackendResponce('');
    setquery_titleError('');
    setisLoading(true);
    console.log(name, email, phone, query_title, query, images);
    if (query.length <= 0) {
      setqueryError('Field Cannot Be Empty.');
    }
    if (query_title.length <= 0) {
      setquery_titleError('Field Cannot Be Empty.');
    }
    if (images === '') {
      setimagesError('You Need To Choose The Image.');
    }
    if (query.length > 0 && query_title.length > 0 && images !== '') {
      const reportData = {
        name,
        email,
        phone,
        query_title,
        query,
        images,
      };
      console.log(reportData);
      const responce = await Services.contactUs(reportData);
      console.log(responce);
      if (responce.status === 'true') {
        setisLoading(false);
        setsucessModal(true);
        setsucessTitle(responce.data);
        resetInputField();
        setTimeout(() => {
          setsucessModal(false);
          navigation.navigate('HomeScreen');
        }, 3000);
      } else {
        setbackendResponce(responce.data);
        setisLoading(false);
      }
    }
  };
  const renderSuccessModal = () => {
    if (sucessModal) {
      return <Successmodal title={sucessTitle} />;
    }
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
      setimages(image.mime);
    });
    setimageChooseModal(false);
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
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
      {renderSuccessModal()}
      <Loader visible={isLoading} />
      <ScrollView style={styles.screenContainer}>
        {backendResponce !== '' ? (
          <View
            style={{
              backgroundColor: '#D50000',
              borderRadius: 10,
              margin: 15,
            }}>
            <Text style={styles.toastTxt}>{backendResponce}</Text>
          </View>
        ) : null}
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
          {query_titleError != '' ? (
            <View
              style={{
                marginRight: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={styles.errorMsg}>{query_titleError}</Text>
              </View>
            </View>
          ) : null}
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
          {queryError != '' ? (
            <View
              style={{
                marginRight: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={styles.errorMsg}>{queryError}</Text>
              </View>
            </View>
          ) : null}
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
