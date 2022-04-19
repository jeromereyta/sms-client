import axios from "axios";

axios.defaults.baseURL = "http://localhost/api/";

axios.interceptors.response.use( response => response, async error => {
    const originalRequest = window.localStorage.getItem("original_request");
    const accessToken = window.localStorage.getItem('access_token') ?? null;

    if (accessToken === null) {
        window.location.href = "#/login";
    }
    else if (error.response.status === 422 || error.response.status === 500) {
        return;
    }
    else if (error.response.status === 401 && originalRequest === true) {
        const {status, data} = await axios.post('refresh-token', {
            refresh_token: window.localStorage.getItem("refresh_token")
        });

        window.localStorage.setItem("original_request", "false");

        if (status === 200) {
            window.localStorage.setItem('access_token', data.access_token)
            window.localStorage.setItem("refresh_token", data.refresh_token);

            return axios(error.config);
        }
    } else {
        localStorage.clear();
        window.location.href = "#/login";
    }

     return error;
})
