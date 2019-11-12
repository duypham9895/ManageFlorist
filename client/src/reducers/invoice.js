import {
    GET_INVOICES,
    GET_INVOICES_DETAIL,
    CHANGE_DATA_INVOICE,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_ERROR,
    CREATE_INVOICE_FAIL,
    DELETE_INVOICE,
    REFRESH_INVOICE
} from "../actions/types";
const initialState = {
    invoices: [],
    isCreate: false,
    invoice: {},
    invoiceDetail: [],
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
        case GET_INVOICES_DETAIL: {
            return {
                ...state,
                invoice: payload.invoice,
                invoiceDetail: payload.detail,
                loading: false
            };
        }
        case GET_INVOICES: {
            return {
                ...state,
                invoices: payload,
                loading: false
            };
        }

        case CHANGE_DATA_INVOICE: {
            let isExists =
                payload.isExists === "true" || payload.isExists === true;
            let isDamage = !isExists;
            payload.isExists = isExists;
            payload.isDamage = isDamage;
            return {
                ...state,
                invoice: payload
            };
        }

        case CREATE_INVOICE_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";

            return {
                ...state,
                loading: false,
                error: msg,
                invoice: payload
            };
        }

        case CREATE_INVOICE_ERROR: {
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

        case CREATE_INVOICE_FAIL: {
            return {
                ...state,
                loading: false,
                invoices: [],
                invoice: null
            };
        }

        case DELETE_INVOICE: {
            return {
                ...state,
                loading: false
            };
        }

        case REFRESH_INVOICE: {
            return {
                ...state,
                invoice: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
