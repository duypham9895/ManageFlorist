import { combineReducers } from "redux";
import auth from "./auth";
import supplier from "./supplier";
import category from "./category";

let reducers = combineReducers({
    auth,
    supplier,
    category
});

export default reducers;
