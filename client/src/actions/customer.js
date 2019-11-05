import axios from "axios";
import {
    GET_CUSTOMERS,
    GET_CUSTOMER,
    CHANGE_DATA_CUSTOMER,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,
    CREATE_CUSTOMER_FAIL,
    DELETE_CUSTOMER,
    REFRESH_CUSTOMER
} from "./types";

// Get Customers
export const getCustomers = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/users/customer", config);
        // console.log(res.data);
        dispatch({
            type: GET_CUSTOMERS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get Customers
export const getCustomer = (token, id) => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get(`/api/users/${id}`, config);
        console.log(res.data);
        dispatch({
            type: GET_CUSTOMER,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form Customer
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_CUSTOMER,
        payload: form
    });
};

export const refreshCustomer = () => dispatch => {
    dispatch({
        type: REFRESH_CUSTOMER
    });
};

// Create new a Customer
export const createCustomer = (
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
            type: CREATE_CUSTOMER_SUCCESS,
            payload: res.data
        });
        history.push("/dashboard/customer/data");
    } catch (err) {
        console.log(err);
        const error = err.response.data.errors;
        if (error) {
            dispatch({
                type: CREATE_CUSTOMER_ERROR,
                payload: error
            });
        }
        dispatch({
            type: CREATE_CUSTOMER_FAIL
        });
    }
};

// Delete users
export const deleteCustomer = (id, token) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/users/${id}`, config);
        dispatch({
            type: DELETE_CUSTOMER,
            payload: id
        });
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_CUSTOMER_ERROR,
                payload: error
            });
        }
    }
};
