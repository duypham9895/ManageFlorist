import {
    GET_INVENTORIES
    // CHANGE_DATA_PRODUCT,
    // CREATE_PRODUCT_SUCCESS,
    // CREATE_PRODUCT_ERROR,
    // CREATE_PRODUCT_FAIL,
    // DELETE_PRODUCT,
    // REFRESH_PRODUCT
} from "../actions/types";

const initialState = {
    stocks: [],
    isCreate: false,
    stock: {},
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_INVENTORIES: {
            return {
                ...state,
                stocks: payload,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}
