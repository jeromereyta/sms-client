import axios from "axios";
import AuthenticationService from "./AuthenticationService";

let authenticationService = new AuthenticationService();

let options = {headers: authenticationService.authHeader()}

export default class RoleService {
    getRoles() {
        return axios.get('v1/roles', options)
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }
}