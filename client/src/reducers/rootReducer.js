import { combineReducers } from "redux";
import auth from "./auth";
import supplier from "./supplier";

let reducers = combineReducers({
    auth,
    supplier
});

export default reducers;
