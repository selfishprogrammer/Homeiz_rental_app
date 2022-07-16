import constants from '../constants';

const {
  UUID,
  NETWORK_CONNECTIONS,
  LOGIN_USER,
  SET_USER_EMAIL,
  SET_USER,
  LOCATION_COORDS,
  SKIP_LOGIN,
  OWNER_LOGIN,
} = constants;

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
export const setLongLang = (longitude, latitude) => ({
  type: LOCATION_COORDS,
  longitude,
  latitude,
});
export const setSkipLogin = skipLogin => ({
  type: SKIP_LOGIN,
  skipLogin,
});
export const setOwnerLogin = ownerLogin => ({
  type: OWNER_LOGIN,
  ownerLogin,
});
