import AuthService from './AuthService';
import BaseApi from './BaseApi';
import swal from "sweetalert";

const axios = require('axios');

const Auth = new AuthService();

export default class RequestHandle {

    constructor() {
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.fetchUpload = this.fetchUpload.bind(this) // React binding stuff
    }

    RequestHandle(url,method, params,callback) {
        // Get a token from api server using the fetch api
       
        return this.fetch(BaseApi.base_url+`/`+url, {
            method: method,
            body: params
        }).then(
            (res) => {
                callback(res);
            })
            .catch(function (error) {
           
              swal({
                  title: "Error!",
                  text: "Something went wrong, please try again.",
                  icon: "warning",
                  dangerMode: true,
                  button: {
                    text: "Reload!",
                    closeModal: false,
                  },
                })
                .then(willSearch => {
                  if (willSearch) {
                      window.location.reload();
                  }
                })
            });
    }

    UploadRequestHandle(url,method, params,callback) {
        // Get a token from api server using the fetch api
       
        return this.fetchUpload(BaseApi.base_url+`/`+url, {
            method: method,
            body: params
        }).then(
            (res) => {
                callback(res);
            })
            .catch(function (error) {
           
              swal({
                  title: "Error!",
                  text: "Something went wrong, please try again.",
                  icon: "warning",
                  dangerMode: true,
                  button: {
                    text: "Reload!",
                    closeModal: false,
                  },
                })
                .then(willSearch => {
                  if (willSearch) {
                      window.location.reload();
                  }
                })
            });
 
    }


    ajaxUploadRequestHandle(url,method, params,callback,progressCallback){
        axios.request( {
            method: method, 
            url: BaseApi.base_url+`/`+url, 
            data: params, 
            onUploadProgress: (p) => {
              progressCallback(p); 
              
            }
          }).then (data => {
            callback(data);
            //this.setState({
              //fileprogress: 1.0,
            //})
          })
          .catch(function (error) {
           
            swal({
                title: "Error!",
                text: "Something went wrong, please try again.",
                icon: "warning",
                dangerMode: true,
                button: {
                  text: "Reload!",
                  closeModal: false,
                },
              })
              .then(willSearch => {
                if (willSearch) {
                    window.location.reload();
                }
              })
          })
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            // // 'mode': 'cors',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (Auth.loggedIn()) {
            // headers['Authorization'] = 'Bearer ' + this.getToken()
             headers['authorization'] =  Auth.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }


    fetchUpload(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            // // 'mode': 'cors',
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        }

        if (Auth.loggedIn()) {
            // headers['Authorization'] = 'Bearer ' + this.getToken()
             headers['authorization'] =  Auth.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

}