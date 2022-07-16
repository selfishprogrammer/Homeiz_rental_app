/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';

const Filters = () => {
  const [showMore, setshowMore] = useState(false);
  const showMoreItems = () => {
    if (showMore) {
      return (
        <>
          {byBhk()}
          {bySqFt()}
          {lowToHigh()}
        </>
      );
    }
  };

  const byBhk = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>Customize By BHK</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
            overFlowX: 'auto',
          }}>
          <TouchableOpacity style={[styles.distanceClick, {padding: 5}]}>
            <Text style={styles.nearBy}>1 BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.distanceClick, {padding: 5}]}>
            <Text style={styles.nearBy}>2 BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.distanceClick, {padding: 5}]}>
            <Text style={styles.nearBy}>3 BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.distanceClick, {padding: 5}]}>
            <Text style={styles.nearBy}>4 BHK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.distanceClick, {padding: 5}]}>
            <Text style={styles.nearBy}>4+ BHK</Text>
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
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Between 1000 sqft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Between 2000 sqft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Between 4000 sqft</Text>
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
          showsHorizontalScrollIndicator={false}
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
            <Text style={styles.nearBy}>Rating Wise</Text>
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
        <Text style={{fontFamily: 'BlissPro-Bold'}}>
          Customize Your Search (Filters)
        </Text>
        {renderArrowIcon()}
      </View>
      {showMoreItems()}
    </View>
  );
};

export default Filters;
