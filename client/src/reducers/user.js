import {
    GET_USERS,
    CHANGE_DATA_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    CREATE_USER_FAIL,
    DELETE_USER,
    REFRESH_USER
} from "../actions/types";
const initialState = {
    users: [],
    isCreate: false,
    user: {},
    loading: true,
    error: {
        name: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USERS: {
            return {
                ...state,
                users: payload,
                loading: false
            };
        }

        case CHANGE_DATA_USER: {
            let isExists =
                payload.isExists === "true" || payload.isExists === true;
            payload.isExists = isExists;
            return {
                ...state,
                user: payload
            };
        }

        case CREATE_USER_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";

            return {
                ...state,
                loading: false,
                error: msg,
                user: payload
            };
        }

        case CREATE_USER_ERROR: {
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

        case CREATE_USER_FAIL: {
            return {
                ...state,
                loading: false,
                users: [],
                user: null
            };
        }

        case DELETE_USER: {
            return {
                ...state,
                // users: state.users.filter(
                //     user => user._id !== payload
                // ),
                loading: false
            };
        }

        case REFRESH_USER: {
            return {
                ...state,
                user: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
