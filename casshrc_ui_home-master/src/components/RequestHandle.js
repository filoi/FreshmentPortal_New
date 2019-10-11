import AuthService from './AuthService';
import BaseApi from './BaseApi';
const Auth = new AuthService();

export default class RequestHandle {

    constructor() {
        this.fetch = this.fetch.bind(this) // React binding stuff
    }

    RequestHandle(url,method, params,callback) {
        // Get a token from api server using the fetch api
        return this.fetch(BaseApi.base_url+`/`+url, {
            method: method,
            body: params
        }).then(
            (res) => {
                callback(res);
            },
            (error) => {
                callback(error);
            }
          );
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
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