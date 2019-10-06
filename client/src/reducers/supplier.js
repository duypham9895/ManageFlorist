import { GET_SUPPLIERS } from "../actions/types";

const initialState = {
    suppliers: [],
    supplier: null,
    loading: true,
    error: {}
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

        default: {
            return state;
        }
    }
}
