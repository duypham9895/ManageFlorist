import axios from "axios";
import {
    GET_PRODUCTS,
    CHANGE_DATA_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_FAIL,
    DELETE_PRODUCT,
    REFRESH_PRODUCT
} from "./types";

// Get Products
export const getProducts = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/product", config);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form Product
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_PRODUCT,
        payload: form
    });
};

export const refreshProduct = () => dispatch => {
    dispatch({
        type: REFRESH_PRODUCT
    });
};

// Create new a Supplier
export const createProduct = (data, token, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    };
    const body = JSON.stringify(data);
    try {
        const res = await axios.post("/api/product", body, config);
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data
        });
        history.push("/dashboard/product/data");
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: error
            });
        }

        dispatch({
            type: CREATE_PRODUCT_FAIL
        });
    }
};

// Delete product
export const deleteProduct = (id, token) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/product/${id}`, config);
        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        });
        refreshProduct();
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: error
            });
        }
    }
};
