
import TokenService from "@/service/TokenService";
import AxiosInstance from "@/service/AxiosInstance";

const AxiosInterceptors = (store) => {

    // for multiple requests
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        })

        failedQueue = [];
    }

    AxiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    AxiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if ((originalConfig.url !== "/admin-login" && originalConfig.url !== "/refresh-token" ) && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {

                    if (isRefreshing) {
                        return new Promise(function(resolve, reject) {
                            failedQueue.push({resolve, reject})
                        }).then(token => {
                            originalConfig.headers['Authorization'] = 'Bearer ' + token;
                            return AxiosInstance(originalConfig);
                        }).catch(err => {
                            return Promise.reject(err);
                        })
                    }

                    originalConfig._retry = true;
                    isRefreshing = true;

                    try {
                        const rs = await AxiosInstance.post("/refresh-token", {
                            refresh_token: TokenService.getLocalRefreshToken(),
                        });
                        const { access_token } = rs.data;
                        store.dispatch('AuthStore/refreshToken', access_token);
                        TokenService.updateLocalAccessToken(access_token);
                        processQueue(null, access_token);
                        return AxiosInstance(originalConfig);
                    } catch (_error) {
                        processQueue(err, null);
                        store.dispatch('AuthStore/logout');
                        window.location.href = "#/login";
                        return Promise.reject(_error);
                    } finally {
                        isRefreshing = true;
                    }
                }
            }

            return Promise.reject(err);
        }
    );
};
export default AxiosInterceptors;