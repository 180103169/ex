import {
  GET_OFFER_BY_PURCHASE_FAIL,
  GET_OFFER_BY_PURCHASE_SUCCESS,
  GET_OFFERS_ACCEPTED_FAIL,
  GET_OFFERS_ACCEPTED_SUCCESS,
  GET_OFFERS_REJECTED_FAIL,
  GET_OFFERS_REJECTED_SUCCESS, POST_OFFERS_FILE_UPLOAD, POST_OFFERS_FILE_UPLOAD_FAIL, POST_OFFERS_FILE_UPLOAD_SUCCESS

} from "./actionTypes"
import { REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESSFUL } from "../auth/register/actionTypes"

const INIT_STATE = {
  offers: [],
  offerDetail: {},
  error: {},
  loading: false
}

const offers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_OFFERS_FILE_UPLOAD:
      console.log('upload case')
      state = {
        ...state,
        loading: true,
      }
      console.log(state);

      break
    case POST_OFFERS_FILE_UPLOAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        offers: action.payload,
      }

      break
    case POST_OFFERS_FILE_UPLOAD_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      }
      break
    case GET_OFFER_BY_PURCHASE_SUCCESS:
      return {
        ...state,
        offers: action.payload,
      }

    case GET_OFFER_BY_PURCHASE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_OFFERS_ACCEPTED_SUCCESS:
      return {
        ...state,
        offers: action.payload,
      }

    case GET_OFFERS_ACCEPTED_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_OFFERS_REJECTED_SUCCESS:
      return {
        ...state,
        offers: action.payload,
      }

    case GET_OFFERS_REJECTED_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default offers
