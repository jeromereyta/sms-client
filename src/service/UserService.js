import axios from "axios";
import AuthenticationService from "./AuthenticationService";

let authenticationService = new AuthenticationService();

let options = {headers: authenticationService.authHeader()}

export default class UserService {

    getAdminUsers() {
        return axios.get('v1/users/staff' , options)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    createAdminUser(user) {
        return axios.post('v1/users/staff', user, options)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    updateAdminUser(user) {
        return axios.put('v1/users/staff/' + user.id , user, options)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    deleteAdminUsers(userIds) {
        return axios.post('v1/users/staff/delete', userIds, options)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    getCurrentUserDetails() {
        return axios.get("v1/users/me", options)
            .then(response => {
                return response.data;
            }).catch(function (error) {
                return error.response
            })
    }
}