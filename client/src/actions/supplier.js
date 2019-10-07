import axios from "axios";
import { GET_SUPPLIERS } from "./types";

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
