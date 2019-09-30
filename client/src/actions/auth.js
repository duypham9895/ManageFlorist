import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_ERROR,
    // USER_LOADED,
    // AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_ERROR,
    LOGOUT,
    CLEAR_PROFILE
} from "./types";

// Register User
export const register = (
    name,
    email,
    phone,
    password,
    confirmPassword,
    code,
    history
) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // history.push("/login");
    const body = JSON.stringify({
        name,
        email,
        phone,
        password,
        confirmPassword,
        code
    });
    try {
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        history.push("/login");
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error
            });
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ username, password });
    try {
        const res = await axios.post("/api/auth", body, config);
        setCookie("florist", res.data, 1);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        // dispatch(loadUser());
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const checkSession = history => async dispatch => {
    let token = getCookie("florist");
    const res = await fetch("http://localhost:4949/api/auth", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    });

    if (res.status === 200) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: token
        });
    }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
};

function setCookie(name, value, days) {
    let expires = "";

    if (days) {
        let date = new Date();

        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) === " ") c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }

    return null;
}
