import axios from "axios";
import {
    GET_CATEGORIES,
    CHANGE_DATA_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_FAIL,
    DELETE_CATEGORY,
    REFRESH_CATEGORY
} from "./types";

// Get Categories
export const getCategories = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/category", config);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form Category
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_CATEGORY,
        payload: form
    });
};

export const refreshCategory = () => dispatch => {
    dispatch({
        type: REFRESH_CATEGORY
    });
};

// Create new a Supplier
export const createCategory = (data, token, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    };
    const body = JSON.stringify(data);
    try {
        const res = await axios.post("/api/category", body, config);
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: res.data
        });
        history.push("/dashboard/category/data");
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_CATEGORY_ERROR,
                payload: error
            });
        }

        dispatch({
            type: CREATE_CATEGORY_FAIL
        });
    }
};

// Delete category
export const deleteCategory = (id, token) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/category/${id}`, config);
        dispatch({
            type: DELETE_CATEGORY,
            payload: id
        });
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_CATEGORY_ERROR,
                payload: error
            });
        }
    }
};
