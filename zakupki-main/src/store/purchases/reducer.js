import {
  GET_PURCHASES_FAIL,
  GET_PURCHASES_SUCCESS,
  GET_PURCHASE_DETAIL_FAIL,
  GET_PURCHASE_DETAIL_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  purchases: [],
  purchaseDetail: {},
  error: {},
}

const purchases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PURCHASES_SUCCESS:
      return {
        ...state,
        purchases: action.payload,
      }

    case GET_PURCHASES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PURCHASE_DETAIL_SUCCESS:
      return {
        ...state,
        purchaseDetail: action.payload,
      }

    case GET_PURCHASE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default purchases
