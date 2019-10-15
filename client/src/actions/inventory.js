import axios from "axios";
import {
    GET_INVENTORIES
    // CHANGE_DATA_PRODUCT,
    // CREATE_PRODUCT_SUCCESS,
    // CREATE_PRODUCT_ERROR,
    // CREATE_PRODUCT_FAIL,
    // DELETE_PRODUCT,
    // REFRESH_PRODUCT
} from "./types";

// Get Inventories
export const getInventories = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/inventory", config);
        dispatch({
            type: GET_INVENTORIES,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};
