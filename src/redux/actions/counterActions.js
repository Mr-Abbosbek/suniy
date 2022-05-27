import { ActionType } from './../contents/actionType';

export const setCounter = (counters) => {
  return{
    type: ActionType.SET_PRODUCTS,
    payload: counters
  }
}

export const selectedCounter = (counter) => {
  return{
    type: ActionType.SELECTED_PRODUCT,
    payload: counter
  }
}

export const removeSelectedCounter = ()=>{
  return{
    type: ActionType.REMOVE_SELECTED_PRODUCT
  }
}