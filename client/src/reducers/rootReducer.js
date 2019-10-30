import { combineReducers } from "redux";
import auth from "./auth";
import supplier from "./supplier";
import category from "./category";
import product from "./product";
import inventory from "./inventory";
import receipt from "./receipt";

let reducers = combineReducers({
    auth,
    supplier,
    category,
    product,
    inventory,
    receipt
});

export default reducers;
