import axios from 'axios';
import {base_url} from '../constants/Urls';
export const postReq = (des_url, data) => {
  let url = base_url + des_url;
  console.log(url);
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(function (response) {
        resolve(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        reject(error);
      })
      .finally(function () {
        // always executed
      });
  });
};
export default class Api {
  // This a get request
  static get = async url => {
    console.log(url);
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(function (response) {
          // console.log('get country', response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log('get country', error);
          reject(error);
        })
        .finally(function () {
          // always executed
        });
    });
  };

  // This a post request
  static post = async (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response);
        });
    });
  };

  // This a put request
  static put = async (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };
}
