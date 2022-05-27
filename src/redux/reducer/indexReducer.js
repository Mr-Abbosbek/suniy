import { combineReducers } from "redux";
import { counterReducer, selectedCounterReducer } from "./counterReducer";

export const reducers = combineReducers({
  allCounters: counterReducer,
  counter: selectedCounterReducer
})