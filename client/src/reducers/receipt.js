import { GET_RECEIPTS } from "../actions/types";

const initialState = {
    receipts: [],
    isCreate: false,
    receipt: {},
    loading: true,
    error: {
        name: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_RECEIPTS: {
            return {
                ...state,
                receipts: payload,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}
