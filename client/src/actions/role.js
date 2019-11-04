import axios from "axios";
import {
    GET_ROLES,
    CHANGE_DATA_ROLE,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_ERROR,
    CREATE_ROLE_FAIL,
    DELETE_ROLE,
    REFRESH_ROLE
} from "./types";

// Get Roles
export const getRoles = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/role", config);
        console.log("role get");
        dispatch({
            type: GET_ROLES,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form Role
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_ROLE,
        payload: form
    });
};

export const refreshRole = () => dispatch => {
    dispatch({
        type: REFRESH_ROLE
    });
};

// Create new a Role
export const createRole = (data, token, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    };
    const body = JSON.stringify(data);
    try {
        const res = await axios.post("/api/role", body, config);
        dispatch({
            type: CREATE_ROLE_SUCCESS,
            payload: res.data
        });
        history.push("/dashboard/role/data");
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_ROLE_ERROR,
                payload: error
            });
        }

        dispatch({
            type: CREATE_ROLE_FAIL
        });
    }
};

// Delete role
export const deleteRole = (id, token) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/role/${id}`, config);
        dispatch({
            type: DELETE_ROLE,
            payload: id
        });
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_ROLE_ERROR,
                payload: error
            });
        }
    }
};
