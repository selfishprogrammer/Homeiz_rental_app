import constants from '../constants';
import createReducer from './createReducer';
const {UUID, NETWORK_CONNECTIONS, SET_USER, SET_USER_EMAIL, LOGIN_USER} =
  constants;

const initialValue = {
  isConnected: true,
  isLoggedIn: false,
  user: '',
  userEmail: '',
  deviceUUID: '',
};

export default createReducer(initialValue, {
  [UUID]: (state, {deviceUUID}) => {
    return {
      deviceUUID,
    };
  },

  [NETWORK_CONNECTIONS]: (state, {isConnected}) => {
    return {
      isConnected,
    };
  },

  [LOGIN_USER]: (state, {isLoggedIn}) => {
    return {
      isLoggedIn,
    };
  },
  [SET_USER]: (state, {user}) => {
    return {
      user,
    };
  },
  [SET_USER_EMAIL]: (state, {userEmail}) => {
    return {
      userEmail,
    };
  },
});
