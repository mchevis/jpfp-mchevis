import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import campus from "./campus";
import student from "./student";

//REDUCER
const reducer = combineReducers({ campus, student });

//STORE
const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware));

export default store;
