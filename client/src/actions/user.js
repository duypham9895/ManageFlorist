import axios from "axios";
import {
    GET_USERS,
    GET_USER,
    CHANGE_DATA_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    CREATE_USER_FAIL,
    DELETE_USER,
    REFRESH_USER
} from "./types";

// Get Users
export const getUsers = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/users/member", config);
        // console.log(res.data);
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get Users
export const getUser = (token, id) => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get(`/api/users/${id}`, config);
        console.log(res.data);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form User
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_USER,
        payload: form
    });
};

export const refreshUser = () => dispatch => {
    dispatch({
        type: REFRESH_USER
    });
};

// Create new a User
export const createUser = (
    data,
    token,
    isCreate,
    history
) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    };
    const body = JSON.stringify(data);
    try {
        let res = {};
        if (isCreate) {
            res = await axios.post("/api/users", body, config);
        } else {
            res = await axios.put(`/api/users/${data._id}`, body, config);
        }

        dispatch({
            type: CREATE_USER_SUCCESS,
            payload: res.data
        });
        history.push("/dashboard/staff/data");
    } catch (err) {
        console.log(err);
        const error = err.response.data.errors;
        if (error) {
            dispatch({
                type: CREATE_USER_ERROR,
                payload: error
            });
        }
        dispatch({
            type: CREATE_USER_FAIL
        });
    }
};

// Delete users
export const deleteUser = (id, token) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/users/member/${id}`, config);
        dispatch({
            type: DELETE_USER,
            payload: id
        });
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_USER_ERROR,
                payload: error
            });
        }
    }
};
