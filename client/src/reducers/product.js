import {
    GET_PRODUCTS,
    CHANGE_DATA_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_FAIL,
    DELETE_PRODUCT,
    REFRESH_PRODUCT
} from "../actions/types";
const initialState = {
    products: [],
    isCreate: false,
    product: {},
    loading: true,
    error: {
        name: "",
        qty: "",
        importPrice: "",
        sellingPrice: "",
        expired: "",
        image: "",
        category: "",
        description: "",
        supplier: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: payload,
                loading: false
            };
        }

        case CHANGE_DATA_PRODUCT: {
            let isExists =
                payload.isExists === "true" || payload.isExists === true;
            let isDamage = !isExists;
            payload.isExists = isExists;
            payload.isDamage = isDamage;
            return {
                ...state,
                product: payload
            };
        }

        case CREATE_PRODUCT_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";

            return {
                ...state,
                loading: false,
                error: msg,
                product: payload
            };
        }

        case CREATE_PRODUCT_ERROR: {
            let msg = { ...state.error };
            msg.name = "";

            if (payload !== null) {
                payload.forEach(error => {
                    if (error.param === "name") {
                        msg.name = error.msg;
                    }
                });
            }

            return {
                ...state,
                error: msg
            };
        }

        case CREATE_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                products: [],
                product: null
            };
        }

        case DELETE_PRODUCT: {
            return {
                ...state,
                loading: false
            };
        }

        case REFRESH_PRODUCT: {
            return {
                ...state,
                product: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
