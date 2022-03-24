import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {View, Modal, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SuccessIcon} from '../constants/Images';
import styles from './styles';

const WarnningModal = props => {
  const navigation = useNavigation();
  const [visible, setvisible] = useState(true);
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
              <Text style={styles.warnfmText}>{props.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  setvisible(false);
                  navigation.navigate('DeleteAccountScreen');
                }}
                style={{
                  marginVertical: 25,

                  borderRadius: 20,
                  backgroundColor: '#C80000',
                }}>
                <Text
                  style={{
                    padding: 10,
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'serif',
                    fontSize: 18,
                  }}>
                  Confirm Deleting Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default WarnningModal;
