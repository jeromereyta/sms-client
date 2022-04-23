
import AxiosInstance from "@/service/AxiosInstance";
// import AuthenticationService from "./AuthenticationService";

// let authenticationService = new AuthenticationService();

// let options = {headers: authenticationService.authHeader()}

export default class UserService {

    getAdminUsers() {
        return AxiosInstance.get('v1/users/staff')
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    createAdminUser(user) {
        return AxiosInstance.post('v1/users/staff', user)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    updateAdminUser(user) {
        return AxiosInstance.put('v1/users/staff/' + user.id , user)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    deleteAdminUsers(userIds) {
        return AxiosInstance.post('v1/users/staff/delete', userIds)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }

    getCurrentUserDetails() {
        return AxiosInstance.get("v1/users/me")
            .then(response => {
                return response.data;
            }).catch(function (error) {
                return error.response
            })
    }
}