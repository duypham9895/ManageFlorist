import axios from "axios";
import { CHANGE_DATA_CART, CHANGE_DATA, CHANGE_DATA_CARTS, DELETE_ORDER } from "../actions/types";

// add data to Carts
export const addToCart = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_CART,
        payload: form
    });
};

export const changeData = form => dispatch => {
    dispatch({
        type: CHANGE_DATA,
        payload: form
    });
};

export const changeDataCarts = form => dispatch => {
    dispatch({
        type: CHANGE_DATA_CARTS,
        payload: form
    });
};

export const deleteOrder = cart => dispatch => {
    dispatch({
        type: DELETE_ORDER,
        payload: cart
    });
};

export const createInvoice = (token, orders, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        };

        let infoInvoice = orders.cart;
        let body = JSON.stringify(infoInvoice);

        let res = await axios.post("/api/invoice", body, config);

        let idInvoice = res.data.invoice._id;

        let carts = orders.carts;
        let temp;

        for (temp of carts) {
            temp.invoice = idInvoice;
            temp.product = temp.product.name;
            body = JSON.stringify(temp);
            res = await axios.post("/api/invoice/detail", body, config);
        }

        history.push("/dashboard/invoice/data");
    } catch (error) {}
};
