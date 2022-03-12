import constants from '../constants';

const {UUID, NETWORK_CONNECTIONS, LOGIN_USER, SET_USER_EMAIL, SET_USER} =
  constants;

export const setDeviceUuid = deviceUUID => ({
  type: UUID,
  deviceUUID,
});
export const setConnection = isConnected => ({
  type: NETWORK_CONNECTIONS,
  isConnected,
});
export const setLoggedIn = isLoggedIn => ({
  type: LOGIN_USER,
  isLoggedIn,
});
export const setUserEmail = userEmail => ({
  type: SET_USER_EMAIL,
  userEmail,
});
export const setUser = user => ({
  type: SET_USER,
  user,
});
