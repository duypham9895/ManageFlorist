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
    let config = {
        headers: {
            Accept: "application/json"
        }
    };
    if (typeof data.image === Object) {
        let form = new FormData();
        form.append("image", data.image);
        let image = await axios.post("/api/uploadProduct", form, config);
        data.image = image.data;
    }

    const body = JSON.stringify(data);
    try {
        config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        };

        const res = await axios.post("/api/product", body, config);
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data.product
        });
        history.push("/dashboard/product/data");
    } catch (err) {
        const error = err.response.data.errors;
        console.log(error);
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
export const deleteProduct = (id, token, history) => async dispatch => {
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
        history.push("/dashboard/product/data");
    } catch (err) {}
};
