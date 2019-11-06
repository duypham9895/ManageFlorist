import {
    GET_CUSTOMERS,
    GET_CUSTOMER,
    CHANGE_DATA_CUSTOMER,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,
    CREATE_CUSTOMER_FAIL,
    DELETE_CUSTOMER,
    REFRESH_CUSTOMER
} from "../actions/types";
const initialState = {
    customers: [],
    isCreate: false,
    customer: {},
    loading: true,
    error: {
        name: "",
        address: "",
        avatar: "",
        email: "",
        level: "",
        phone: "",
        point: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CUSTOMERS: {
            return {
                ...state,
                customers: payload,
                loading: false
            };
        }

        case GET_CUSTOMER: {
            let temp;
            for (temp in payload.account) {
                payload[temp] = payload.account[temp];
            }

            payload["code"] = payload.role.code;
            return {
                ...state,
                customer: payload,
                isCreate: false,
                loading: false
            };
        }

        case CHANGE_DATA_CUSTOMER: {
            let isExists =
                payload.isExists === "true" || payload.isExists === true;
            payload.isExists = isExists;
            return {
                ...state,
                customer: payload
            };
        }

        case CREATE_CUSTOMER_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";

            return {
                ...state,
                loading: false,
                error: msg,
                customer: payload
            };
        }

        case CREATE_CUSTOMER_ERROR: {
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

        case CREATE_CUSTOMER_FAIL: {
            return {
                ...state,
                loading: false,
                customers: [],
                customer: null
            };
        }

        case DELETE_CUSTOMER: {
            return {
                ...state,
                // customers: state.customers.filter(
                //     customer => customer._id !== payload
                // ),
                loading: false
            };
        }

        case REFRESH_CUSTOMER: {
            return {
                ...state,
                customer: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
