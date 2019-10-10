import {
    GET_CATEGORIES,
    CHANGE_DATA_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_FAIL,
    DELETE_CATEGORY,
    REFRESH_CATEGORY
} from "../actions/types";
const initialState = {
    categories: [],
    isCreate: false,
    category: {},
    loading: true,
    error: {
        name: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORIES: {
            return {
                ...state,
                categories: payload,
                loading: false
            };
        }

        case CHANGE_DATA_CATEGORY: {
            let isExists = payload.isExists === true;
            payload.isExists = isExists;
            return {
                ...state,
                category: payload
            };
        }

        case CREATE_CATEGORY_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";

            return {
                ...state,
                loading: false,
                error: msg,
                category: payload
            };
        }

        case CREATE_CATEGORY_ERROR: {
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

        case CREATE_CATEGORY_FAIL: {
            return {
                ...state,
                loading: false,
                categories: [],
                category: null
            };
        }

        case DELETE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.filter(
                    category => category._id !== payload
                ),
                loading: false
            };
        }

        case REFRESH_CATEGORY: {
            return {
                ...state,
                category: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
