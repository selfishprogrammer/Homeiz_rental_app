/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

const Furnesing = props => {
  const [showMore, setshowMore] = useState(false);
  const showMoreItems = () => {
    if (showMore) {
      return <>{addFurnessing()}</>;
    }
  };
  const addFurnessing = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>Frunesing</Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={styles.distanceClick} disabled>
            <Text style={styles.nearBy}>Security : Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Garden : Yes</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={styles.distanceClick} disabled>
            <Text style={styles.nearBy}>Balcony : Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Ground : No</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity style={styles.distanceClick} disabled>
            <Text style={styles.nearBy}>Pool : Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderArrowIcon = () => {
    if (showMore) {
      return (
        <TouchableOpacity
          onPress={() => {
            setshowMore(false);
          }}>
          <Image
            source={{
              uri: 'https://icon-library.com/images/up-arrow-icon-png/up-arrow-icon-png-22.jpg',
            }}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            setshowMore(true);
          }}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Arrow-down.svg/1200px-Arrow-down.svg.png',
            }}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{fontFamily: 'BlissPro-Bold'}}>
          Frunesing Of {props.about.flat_name}
        </Text>
        {renderArrowIcon()}
      </View>
      {showMoreItems()}
    </View>
  );
};

export default Furnesing;
