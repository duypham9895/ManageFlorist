import { combineReducers } from "redux";
import auth from "./auth";
import supplier from "./supplier";
import category from "./category";
import product from "./product";
import inventory from "./inventory";
import receipt from "./receipt";
import discount from "./discount";
import role from "./role";
import user from "./user";

let reducers = combineReducers({
    auth,
    supplier,
    category,
    product,
    inventory,
    receipt,
    discount,
    role,
    user
});

export default reducers;
