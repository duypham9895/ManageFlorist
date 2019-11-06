import {
    GET_DISCOUNTS,
    CHANGE_DATA_DISCOUNT,
    CREATE_DISCOUNT_SUCCESS,
    CREATE_DISCOUNT_ERROR,
    CREATE_DISCOUNT_FAIL,
    DELETE_DISCOUNT,
    REFRESH_DISCOUNT
} from "../actions/types";
const initialState = {
    discounts: [],
    isCreate: false,
    discount: {},
    loading: true,
    error: {
        code: "",
        endDate: "",
        startDate: "",
        event: "",
        percent: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_DISCOUNTS: {
            return {
                ...state,
                discounts: payload,
                loading: false
            };
        }

        case CHANGE_DATA_DISCOUNT: {
            let isExists =
                payload.isExists === "true" || payload.isExists === true;
            payload.isExists = isExists;
            return {
                ...state,
                discount: payload
            };
        }

        case CREATE_DISCOUNT_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";

            return {
                ...state,
                loading: false,
                error: msg,
                discount: payload
            };
        }

        case CREATE_DISCOUNT_ERROR: {
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

        case CREATE_DISCOUNT_FAIL: {
            return {
                ...state,
                loading: false,
                discounts: [],
                discount: null
            };
        }

        case DELETE_DISCOUNT: {
            return {
                ...state,
                // discounts: state.discounts.filter(
                //     discount => discount._id !== payload
                // ),
                loading: false
            };
        }

        case REFRESH_DISCOUNT: {
            return {
                ...state,
                discount: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
