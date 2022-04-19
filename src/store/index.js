import { createStore } from "vuex";
import {AuthStore} from "./AuthStore";
const store = createStore({
    modules: {
        AuthStore,
    },
});
export default store;