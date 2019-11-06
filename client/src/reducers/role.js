import {
    GET_ROLES,
    CHANGE_DATA_ROLE,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_ERROR,
    CREATE_ROLE_FAIL,
    DELETE_ROLE,
    REFRESH_ROLE
} from "../actions/types";
const initialState = {
    roles: [],
    isCreate: false,
    role: {},
    loading: true,
    error: {
        name: "",
        code: "",
        qty: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ROLES: {
            return {
                ...state,
                roles: payload,
                loading: false
            };
        }

        case CHANGE_DATA_ROLE: {
            let isExists =
                payload.isExists === "true" || payload.isExists === true;
            payload.isExists = isExists;
            return {
                ...state,
                role: payload
            };
        }

        case CREATE_ROLE_SUCCESS: {
            let msg = { ...state.error };
            msg.name = "";

            return {
                ...state,
                loading: false,
                error: msg,
                role: payload
            };
        }

        case CREATE_ROLE_ERROR: {
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

        case CREATE_ROLE_FAIL: {
            return {
                ...state,
                loading: false,
                roles: [],
                role: null
            };
        }

        case DELETE_ROLE: {
            return {
                ...state,
                // roles: state.roles.filter(
                //     role => role._id !== payload
                // ),
                loading: false
            };
        }

        case REFRESH_ROLE: {
            return {
                ...state,
                role: null,
                isCreate: true
            };
        }

        default: {
            return state;
        }
    }
}
