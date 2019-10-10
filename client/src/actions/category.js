import axios from "axios";
import { GET_CATEGORIES } from "./types";

// Get Categories
export const getCategories = token => async dispatch => {
    try {
        const config = {
            headers: {
                "x-auth-token": token
            }
        };
        const res = await axios.get("/api/category", config);
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    } catch (error) {
        console.error(error);
    }
};
