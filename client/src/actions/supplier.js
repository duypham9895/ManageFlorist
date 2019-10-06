import axios from "axios";
import { GET_SUPPLIERS } from "./types";

// Get suppliers
export const getSuppliers = () => async dispatch => {
    try {
        const res = await axios.get("/api/supplier");
        dispatch({
            type: GET_SUPPLIERS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};
