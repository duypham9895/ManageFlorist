import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/rootReducer.js";

let middleware = [thunk, logger];

export default createStore(reducers, applyMiddleware(...middleware));
