
import AxiosInstance from "@/service/AxiosInstance";

export default class RoleService {
    getRoles() {
        return AxiosInstance.get('v1/roles')
            .then(response => {
                return response.data;
            }).catch(function(error) {
                return error.response;
            });
    }
}