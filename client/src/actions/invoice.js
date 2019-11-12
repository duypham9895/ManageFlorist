import axios from "axios";
import {
    GET_INVOICES,
    GET_INVOICES_DETAIL,
    CHANGE_DATA_INVOICE,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_ERROR,
    CREATE_INVOICE_FAIL,
    DELETE_INVOICE,
    REFRESH_INVOICE
} from "./types";

// Get Invoices
export const getInvoices = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/invoice", config);
        dispatch({
            type: GET_INVOICES,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};

// Get Invoice Detail
export const getInvoice = (token, id, invoice) => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get(`/api/invoice/${id}`, config);
        dispatch({
            type: GET_INVOICES_DETAIL,
            payload: {
                detail: res.data,
                invoice: invoice
            }
        });
    } catch (error) {
        console.error(error);
    }
};

// Get data on form Invoice
export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_INVOICE,
        payload: form
    });
};

export const refreshInvoice = () => dispatch => {
    dispatch({
        type: REFRESH_INVOICE
    });
};

// Create new a Supplier
export const createInvoice = (data, token, history) => async dispatch => {
    let config = {
        headers: {
            Accept: "application/json"
        }
    };

    const body = JSON.stringify(data);
    try {
        config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        };

        const res = await axios.post("/api/invoice", body, config);
        dispatch({
            type: CREATE_INVOICE_SUCCESS,
            payload: res.data.invoice
        });
        history.push("/dashboard/invoice/data");
    } catch (err) {
        const error = err.response.data.errors;
        console.log(error);
        if (error) {
            dispatch({
                type: CREATE_INVOICE_ERROR,
                payload: error
            });
        }
        dispatch({
            type: CREATE_INVOICE_FAIL
        });
    }
};

// Delete invoice
export const deleteInvoice = (id, token, history) => async dispatch => {
    const config = {
        headers: {
            "x-auth-token": token
        }
    };
    try {
        await axios.delete(`/api/invoice/${id}`, config);
        dispatch({
            type: DELETE_INVOICE,
            payload: id
        });
        history.push("/dashboard/invoice/data");
    } catch (err) {}
};
