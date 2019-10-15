import { combineReducers } from "redux";
import auth from "./auth";
import supplier from "./supplier";
import category from "./category";
import product from "./product";
import inventory from "./inventory";

let reducers = combineReducers({
    auth,
    supplier,
    category,
    product,
    inventory
});

export default reducers;
