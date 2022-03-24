import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';

const Filters = () => {
  const [showMore, setshowMore] = useState(false);
  const showMoreItems = () => {
    if (showMore) {
      return (
        <>
          {byCrimeRates()}
          {byBhk()}
          {bySqFt()}
          {lowToHigh()}
        </>
      );
    }
  };
  const byCrimeRates = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>Customize By Crime Rate</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>0%-25%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>26%-60%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>61%-90%</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  const byBhk = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>Customize By BHK</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>1BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>2BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>3BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>4BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>4+BHK</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  const bySqFt = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>Customize By Sqft</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>1K - 2k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>2.5K - 3.5K</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>4K - 6K</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  const lowToHigh = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>Customize By Low To High</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Low To High</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>High To Low</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Serial Wise</Text>
          </TouchableOpacity>
        </ScrollView>
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
        <Text style={{fontFamily: 'serif'}}>
          Customize Your Search (Filters)
        </Text>
        {renderArrowIcon()}
      </View>
      {showMoreItems()}
    </View>
  );
};

export default Filters;
