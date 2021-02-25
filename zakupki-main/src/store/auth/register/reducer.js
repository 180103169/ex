import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED, GET_KOTRANGENTS_SUCCESSFUL, GET_KOTRANGENTS_FAILED
} from "./actionTypes"
import { GET_OFFERS_REJECTED_FAIL, GET_OFFERS_REJECTED_SUCCESS } from "../../offers/actionTypes"

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  kotragents: []
}

const account = (state = initialState, action) => {
  console.log('in reduuucer')
  console.log(action);
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        user: null,
        loading: true,
        registrationError: null,
      }
      break
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
      }
      break
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      }
      break
    case GET_KOTRANGENTS_SUCCESSFUL:
      console.log('success kotra')
      return {
        ...state,
        kontragents: action.payload,
      }

    case GET_KOTRANGENTS_FAILED:
      console.log('fail kotra')

      return {
        ...state,
        error: action.payload,
      }
    default:
      state = { ...state }
      break
  }
  return state
}

export default account
