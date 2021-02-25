import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED, GET_KOTRANGENTS, GET_KOTRANGENTS_SUCCESSFUL, GET_KOTRANGENTS_FAILED
} from "./actionTypes"
import { GET_OFFERS_REJECTED_FAIL } from "../../offers/actionTypes"

export const registerUser = user => {
  return {
    type: REGISTER_USER,
    payload: { user },
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}

export const getKontragents = () => {
  return {
    type: GET_KOTRANGENTS,
  }
}

export const getKontragentsSuccessful = kotragents => {
  return {
    type: GET_KOTRANGENTS_SUCCESSFUL,
    payload: kontragents,
  }
}

export const getKontragentsFailed = kotragents => {
  return {
    type: GET_KOTRANGENTS_FAILED,
    payload: kotragents,
  }
}
