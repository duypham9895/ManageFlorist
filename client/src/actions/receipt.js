import axios from "axios";
import { GET_RECEIPTS } from "./types";

// Get receipts
export const getReceipts = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/receipt", config);
        dispatch({
            type: GET_RECEIPTS,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};
