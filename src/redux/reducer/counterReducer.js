import { ActionType } from "../contents/actionType";

const initialState = {
  counter: []
};

export const counterReducer = (state = initialState, {type, payload}) => {
  switch(type){
    case ActionType.SET_PRODUCTS: 
      return {...state, counter: payload};
    default:
      return state;
  }
}

export const selectedCounterReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.SELECTED_PRODUCT:
      return {...state, ...payload};
    case ActionType.REMOVE_SELECTED_PRODUCT:
      return {};
    default: 
      return state;
  }
}