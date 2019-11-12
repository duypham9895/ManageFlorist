import axios from "axios";
// import config from "config";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_ERROR,
    // USER_LOADED,
    // AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_ERROR,
    LOGOUT
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
        let res = await axios.post("/api/auth", body, config);
        // console.log(res.data);
        setCookie("florist", res.data, 1);
        // console.log("2222-------");
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        // console.log("1111------");
        // res = await axios.get(`/api/users/${res.data.id}`, config);
        console.log(res.data);
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
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ token });
    try {
        const res = await axios.put("/api/auth", body, config);
        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: token,
                    id: res.data
                }
            });
        }
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        }
    }
};

// Logout / Clear Profile
export const logout = (token, history) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        const res = await axios.get("/api/users/logout", config);
        if (res.status === 200) {
            dispatch({ type: LOGOUT });
            history.push("/login");
        } else {
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data
            });
        }
    } catch (err) {
        // const error = err.response.data.errors;
        // dispatch({
        //     type: LOGIN_ERROR,
        //     payload: error
        // });
    }
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
