import axios from "axios";

export default class AuthenticationService {
    authHeader() {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user?.access_token) {
            return { Authorization: 'Bearer ' + user.access_token };
        } else {
            return {};
        }
    }

    adminLogin(user) {
        return axios
            .post('admin-login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }
}
