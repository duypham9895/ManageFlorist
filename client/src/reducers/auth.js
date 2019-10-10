import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_ERROR,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_ERROR,
    LOGOUT,
    ACCOUNT_DELETED
} from "../actions/types";

const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null,
    msg: {
        login: {
            username: "",
            password: ""
        },
        register: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        }
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
            let registerSuccess = { ...state.msg.register };

            registerSuccess.name = "";
            registerSuccess.email = "";
            registerSuccess.phone = "";
            registerSuccess.password = "";
            registerSuccess.confirmPassword = "";
            return {
                ...state,
                loading: false,
                msg: { ...state.msg, register: registerSuccess }
            };
        case LOGIN_SUCCESS:
            let loginSuccess = { ...state.msg.login };

            loginSuccess.password = "";
            loginSuccess.username = "";
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false,
                msg: { ...state.msg, login: loginSuccess }
            };

        case LOGIN_ERROR:
            let login = { ...state.msg.login };

            login.password = "";
            login.username = "";

            if (payload !== null) {
                payload.forEach(error => {
                    if (error.param === "password") {
                        login.password = error.msg;
                    } else {
                        login.password = "";
                        login.username = error.msg;
                    }
                });
            }
            return {
                ...state,
                msg: { ...state.msg, login: login }
            };
        case REGISTER_ERROR:
            let register = { ...state.msg.register };

            register.name = "";
            register.email = "";
            register.phone = "";
            register.password = "";
            register.confirmPassword = "";

            if (payload !== null) {
                payload.forEach(error => {
                    if (error.param === "name") {
                        register.name = error.msg;
                    }
                    if (error.param === "email") {
                        register.email = error.msg;
                    }
                    if (error.param === "phone") {
                        register.phone = error.msg;
                    }
                    if (error.param === "password") {
                        register.password = error.msg;
                    }
                    if (error.param === "confirmPassword") {
                        register.confirmPassword = error.msg;
                    }
                });
            }

            return {
                ...state,
                msg: { ...state.msg, register: register }
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}
