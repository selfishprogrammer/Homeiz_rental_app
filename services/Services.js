import {postReq} from './Api';

export default class Services {
  static userRegister = async data => {
    return postReq('Authentication/register.php', data);
  };
  static userLogin = async data => {
    return postReq('Authentication/login.php', data);
  };
  static resetPassword = async data => {
    return postReq('Authentication/resetPassword.php', data);
  };
  static editProfile = async data => {
    return postReq('Authentication/editProfile.php', data);
  };
  static deleteAccount = async data => {
    return postReq('Authentication/deleteAccount.php', data);
  };
  static forgotPassword = async data => {
    return postReq('Authentication/forgotPass.php', data);
  };
  static contactUs = async data => {
    return postReq('Components/contact_us.php', data);
  };
  static verifyOtp = async data => {
    return postReq('Authentication/verifyOtp.php', data);
  };
  static generateOtp = async data => {
    return postReq('Authentication/generateOtp.php', data);
  };
  static latLong = data => {
    return postReq('Authentication/latLong.php', data);
  };
  static addHouse = data => {
    return postReq('Components/owner_house_add.php', data);
  };
  static getHouseBasedOnLocation = data => {
    return postReq('Components/selectHouseBasedOnLocation.php', data);
  };
  static getHouseBasedOnId = data => {
    return postReq('Components/house_by_id.php', data);
  };
  static contactOwner = data => {
    return postReq('Components/contact_owner.php', data);
  };
  static houseByCity = data => {
    return postReq('Components/house_by_city.php', data);
  };
  static getHouseRequestToOwner = data => {
    return postReq('Owners/getRequest.php', data);
  };
  static requestStatusUpdated = data => {
    return postReq('Owners/requestStatusUpdated.php', data);
  };
}
