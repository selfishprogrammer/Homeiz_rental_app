import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import styles from './styles';

const Overview = props => {
  const [showMore, setshowMore] = useState(false);
  const renderOverViewItems = () => {
    if (showMore) {
      return (
        <>
          {renderOverView()}
          {renderAboutUs()}
        </>
      );
    }
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
  const renderOverView = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>Overview</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
            // overFlowX: 'auto',
          }}>
          <TouchableOpacity style={styles.distanceClick} disabled>
            <Text style={styles.nearBy}>Brokree : No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>
              Price : {Math.floor(props.overview.real_price)} INR
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
            // overFlowX: 'auto',
          }}>
          <TouchableOpacity style={styles.distanceClick} disabled>
            <Text style={styles.nearBy}>Garden : No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>Balcony : Yes</Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
            // overFlowX: 'auto',
          }}>
          <TouchableOpacity style={styles.distanceClick} disabled>
            <Text style={styles.nearBy}>Boundry : Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>
              Parking : {props.overview.parking}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
            // overFlowX: 'auto',
            overflow: 'hidden',
          }}>
          <TouchableOpacity style={styles.distanceClick} disabled>
            <Text style={styles.nearBy}>Open Side : Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distanceClick}>
            <Text style={styles.nearBy}>
              Construction Started : {props.overview.furnishing}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  const renderAboutUs = () => {
    return (
      <View style={styles.filterCont}>
        <Text style={styles.filterTxt}>About {props.overview.flat_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-around',
          }}>
          <Text style={{color: 'black', fontFamily: 'serif'}}>
            {props.overview.house_details}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{fontFamily: 'BlissPro-Bold'}}>
          Overview Of {props.overview.flat_name}
        </Text>
        {renderArrowIcon()}
      </View>
      {/* {showMoreItems()} */}
      {renderOverViewItems()}
    </View>
  );
};

export default Overview;
