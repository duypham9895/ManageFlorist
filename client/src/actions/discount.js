import axios from "axios";
import {
    GET_DISCOUNTS,
    CHANGE_DATA_DISCOUNT,
    CREATE_DISCOUNT_SUCCESS,
    CREATE_DISCOUNT_ERROR,
    CREATE_DISCOUNT_FAIL,
    DELETE_DISCOUNT,
    REFRESH_DISCOUNT
} from "./types";

// Get Discounts
export const getDiscounts = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/discount", config);
        dispatch({
            type: GET_DISCOUNTS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form Discount
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_DISCOUNT,
        payload: form
    });
};

export const refreshDiscount = () => dispatch => {
    dispatch({
        type: REFRESH_DISCOUNT
    });
};

// Create new a Supplier
export const createDiscount = (data, token, history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    };
    console.log(data);
    const body = JSON.stringify(data);
    try {
        const res = await axios.post("/api/discount", body, config);
        dispatch({
            type: CREATE_DISCOUNT_SUCCESS,
            payload: res.data
        });
        history.push("/dashboard/discount/data");
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_DISCOUNT_ERROR,
                payload: error
            });
        }

        dispatch({
            type: CREATE_DISCOUNT_FAIL
        });
    }
};

// Delete discount
export const deleteDiscount = (id, token) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/discount/${id}`, config);
        dispatch({
            type: DELETE_DISCOUNT,
            payload: id
        });
    } catch (err) {
        const error = err.response.data.errors;

        if (error) {
            dispatch({
                type: CREATE_DISCOUNT_ERROR,
                payload: error
            });
        }
    }
};
