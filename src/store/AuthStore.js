import AuthenticationService from "../service/AuthenticationService";

let authenticationService = new AuthenticationService();

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const AuthStore = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return authenticationService.adminLogin(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        refreshToken({ commit }, accessToken) {
            commit('refreshToken', accessToken);
        },
        logout({ commit }) {
            authenticationService.logout();
            commit('logout');
        },
        // register({ commit }, user) {
        //     return AuthService.register(user).then(
        //         response => {
        //             commit('registerSuccess');
        //             return Promise.resolve(response.data);
        //         },
        //         error => {
        //             commit('registerFailure');
        //             return Promise.reject(error);
        //         }
        //     );
        // }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        refreshToken(state, accessToken) {
            state.status.loggedIn = true;
            state.user = { ...state.user, access_token: accessToken };
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};