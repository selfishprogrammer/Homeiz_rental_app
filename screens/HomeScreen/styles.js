const React = require('react-native');
import Colors from '../../constants/Colors';

const {StyleSheet, Dimensions, Platform} = React;

export default {
  container: {
    flex: 1,
    //flexDirection: 'column',
    //justifyContent: 'center',
    backgroundColor: '#003948',
    //alignItems: 'center'
  },
  searchImage: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {width: 120, height: 120},
  offerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  offerImg: {
    width: '100%',
    height: 150,
  },
  houseImg: {width: '100%', height: 150},
  bhk: {
    margin: 10,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    marginRight: 3,
    marginLeft: 3,
  },
  distanceClick: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 100,
    padding: 2,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 3,
    marginRight: 3,
  },
  nearBy: {
    display: 'flex',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 10,
    fontFamily: 'math',
  },
  shortAdd: {
    textAlign: 'center',
    fontFamily: 'math',
    fontSize: 16,
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  addRess: {
    textAlign: 'center',
    fontFamily: 'math',
    fontSize: 20,
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  btnContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 300,
    padding: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  btnTxt: {
    display: 'flex',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    fontFamily: 'math',
  },
  toastView: {
    backgroundColor: '#fff',
    padding: 5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    borderColor: 'grey',
  },
  toastTxt: {
    textAlign: 'center',
    color: 'white',
    padding: 10,
    fontSize: 15,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
};
