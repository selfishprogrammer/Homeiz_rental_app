import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import styles from './styles';

const Header = props => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
};

export default Header;
