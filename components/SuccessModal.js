/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Modal, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SuccessIcon} from '../constants/Images';
import styles from './styles';

const Successmodal = props => {
  const [visible] = useState(true);
  return (
    <View>
      <Modal animationType="fade" visible={visible} transparent={true}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={[
              styles.confirmModalContainer,
              {backgroundColor: '#00000066'},
            ]}>
            <View style={styles.confirmModalContent}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={SuccessIcon}
                  style={{width: 50, height: 50, marginBottom: 20}}
                />
              </View>
              <Text style={styles.confirmfmText}>{props.title}</Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Successmodal;
