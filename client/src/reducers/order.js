import { 
    CHANGE_DATA_CART, 
    CHANGE_DATA, 
    CHANGE_DATA_CARTS, 
    DELETE_ORDER 
} from "../actions/types";

const initialState = {
    carts: [],
    isCreate: false,
    cart: {},
    loading: true,
    error: {
        name: ""
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CHANGE_DATA_CART: {
            let carts = [...state.carts];
            let order;
            for (order of carts) {
                if (order.product === payload.product) {
                    payload.qty = order.qty;
                    payload.qty += 1;
                    carts.splice(carts.indexOf(order), 1);
                }
            }
            carts.push(payload);

            return {
                ...state,
                loading: false,
                carts: carts
            };
        }

        case CHANGE_DATA_CARTS: {
            return {
                ...state,
                carts: payload
            };
        }

        case CHANGE_DATA: {
            return {
                ...state,
                cart: payload
            };
        }

        case DELETE_ORDER: {
            return{
                ...state,
                carts: state.carts.filter(
                    cart => cart !== payload
                ),
            }
        }

        default: {
            return state;
        }
    }
}
