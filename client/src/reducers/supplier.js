import {
    GET_SUPPLIERS,
    CHANGE_DATA_SUPPLIER,
    CREATE_SUPPLIER_SUCCESS,
    CREATE_SUPPLIER_ERROR,
    CREATE_SUPPLIER_FAIL,
    DELETE_SUPPLIER,
    REFRESH_SUPPLIER
} from "../actions/types";

const initialState = {
    suppliers: [],
    isCreate: false,
    supplier: {},
    loading: true,
    error: {
        name: "",
        email: "",
        phone: "",
        address: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SUPPLIERS: {
            return {
                ...state,
                suppliers: payload,
                loading: false
            };
        }

        case CHANGE_DATA_SUPPLIER: {
            let isExists =
                payload.isExists === "true" || payload.isExists === true;
            payload.isExists = isExists;
            return {
                ...state,
                supplier: payload
            };
        }

        case CREATE_SUPPLIER_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";
            msg.email = "";
            msg.phone = "";
            msg.address = "";

            return {
                ...state,
                loading: false,
                error: msg,
                supplier: payload
            };
        }

        case CREATE_SUPPLIER_ERROR: {
            let msg = { ...state.error };
            msg.name = "";
            msg.email = "";
            msg.phone = "";
            msg.address = "";

            if (payload !== null) {
                payload.forEach(error => {
                    if (error.param === "name") {
                        msg.name = error.msg;
                    }
                    if (error.param === "email") {
                        msg.email = error.msg;
                    }
                    if (error.param === "phone") {
                        msg.phone = error.msg;
                    }
                    if (error.param === "password") {
                        msg.address = error.msg;
                    }
                });
            }

            return {
                ...state,
                error: msg
            };
        }

        case CREATE_SUPPLIER_FAIL: {
            return {
                ...state,
                loading: false,
                suppliers: [],
                supplier: null
            };
        }

        case DELETE_SUPPLIER: {
            return {
                ...state,
                // suppliers: state.suppliers.filter(
                //     supplier => supplier._id !== payload
                // ),
                loading: false
            };
        }

        case REFRESH_SUPPLIER: {
            return {
                ...state,
                supplier: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
