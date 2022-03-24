const React = require('react-native');
import Colors from '../../constants/Colors';

const {StyleSheet, Dimensions, Platform} = React;

export default {
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
  container: {
    // flex: 1,
    backgroundColor: 'rgba(253, 252, 252, 1)',
    margin: 20,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
  },
  errorToast: {
    textAlign: 'center',
    color: 'black',
    padding: 10,
    fontSize: 15,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  title: {
    color: 'black',
    fontFamily: 'serif',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputField: {
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  errorMsg: {
    color: 'red',
    marginLeft: 15,
    fontFamily: 'serif',
  },
  forgotPass: {
    fontFamily: 'serif',
    marginLeft: 12,
    // marginBottom: 10,
    color: 'black',
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A5DE18',
    margin: 10,
    borderRadius: 5,
  },
  lgnbtnTxt: {
    fontFamily: 'serif',
    marginLeft: 12,
    textAlign: 'center',
    color: 'black',
  },
  signUp: {
    color: 'black',
    fontWeight: '700',
    fontFamily: 'serif',
  },
  toastView: {
    backgroundColor: 'rgba(253, 252, 252, 1)',
    margin: 20,
    padding: 5,
    borderRadius: 5,
  },
  toastTxt: {
    textAlign: 'center',
    color: 'white',
    padding: 10,
    fontSize: 12,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
};
