import constants from '../constants';
import createReducer from './createReducer';
const {
  UUID,
  NETWORK_CONNECTIONS,
  SET_USER,
  SET_USER_EMAIL,
  LOGIN_USER,
  LOCATION_COORDS,
  SKIP_LOGIN,
  OWNER_LOGIN,
} = constants;

const initialValue = {
  isConnected: true,
  isLoggedIn: false,
  user: '',
  userEmail: '',
  deviceUUID: '',
  skipLogin: false,
  ownerLogin: false,
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
  [LOCATION_COORDS]: (state, {longitude, latitude}) => {
    return {
      longitude,
      latitude,
    };
  },
  [SKIP_LOGIN]: (state, {skipLogin}) => {
    return {
      skipLogin,
    };
  },
  [OWNER_LOGIN]: (state, {ownerLogin}) => {
    return {
      ownerLogin,
    };
  },
});
