import axios from "axios";
import {
    GET_SUPPLIERS,
    CHANGE_DATA_SUPPLIER,
    CREATE_SUPPLIER_SUCCESS,
    CREATE_SUPPLIER_ERROR,
    CREATE_SUPPLIER_FAIL,
    DELETE_SUPPLIER,
    REFRESH_SUPPLIER
} from "./types";

// Get suppliers
export const getSuppliers = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/supplier", config);
        dispatch({
            type: GET_SUPPLIERS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form Supplier
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_SUPPLIER,
        payload: form
    });
};

export const refreshSupplier = () => dispatch => {
    dispatch({
        type: REFRESH_SUPPLIER
    });
};

// Create new a Supplier
export const createSupplier = (data, token, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    };
    const body = JSON.stringify(data);
    try {
        const res = await axios.post("/api/supplier", body, config);
        dispatch({
            type: CREATE_SUPPLIER_SUCCESS,
            payload: res.data
        });
        history.push("/dashboard/supplier/data");
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_SUPPLIER_ERROR,
                payload: error
            });
        }

        dispatch({
            type: CREATE_SUPPLIER_FAIL
        });
    }
};

// Delete Supplier
export const deleteSupplier = (id, token) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/supplier/${id}`, config);
        dispatch({
            type: DELETE_SUPPLIER,
            payload: id
        });
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_SUPPLIER_ERROR,
                payload: error
            });
        }
    }
};
