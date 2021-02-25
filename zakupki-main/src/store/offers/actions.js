import {
  GET_OFFER_BY_PURCHASE,
  GET_OFFER_BY_PURCHASE_FAIL,
  GET_OFFER_BY_PURCHASE_SUCCESS,
  GET_OFFERS_ACCEPTED,
  GET_OFFERS_ACCEPTED_FAIL,
  GET_OFFERS_ACCEPTED_SUCCESS,
  GET_OFFERS_REJECTED,
  GET_OFFERS_REJECTED_FAIL,
  GET_OFFERS_REJECTED_SUCCESS,
  POST_OFFERS_FILE_UPLOAD,
  POST_OFFERS_FILE_UPLOAD_FAIL, POST_OFFERS_FILE_UPLOAD_SUCCESS

} from "./actionTypes"
import { LOGIN_SUCCESS, LOGIN_USER } from "../auth/login/actionTypes"

export const getOffersByPurchase = purchaseId => ({
  type: GET_OFFER_BY_PURCHASE,
  purchaseId
})

export const getOffersByPurchaseSuccess = offers => ({
  type: GET_OFFER_BY_PURCHASE_SUCCESS,
  payload: offers,
})

export const getOffersByPurchaseFail = error => ({
  type: GET_OFFER_BY_PURCHASE_FAIL,
  payload: error,
})

export const uploadFile = (file) => ({
    type: POST_OFFERS_FILE_UPLOAD,
    payload: file ,
});
export const uploadFileSuccess = (file) => {
  return {
    type: POST_OFFERS_FILE_UPLOAD_SUCCESS,
    payload: file,
  }
}

export const uploadFileFail = (file) => {
  return {
    type: POST_OFFERS_FILE_UPLOAD_FAIL,
    payload: error,
  }
}



export const getOfferAccepted = () => {
  console.log('offer accepted get');
  return {
  type: GET_OFFERS_ACCEPTED,
  }
}

export const getOfferAcceptedSuccess = offerDetails => ({
  type: GET_OFFERS_ACCEPTED_SUCCESS,
  payload: offerDetails,
})

export const getOfferAcceptedFail = error => ({
  type: GET_OFFERS_ACCEPTED_FAIL,
  payload: error,
})

export const getOfferRejected = () => ({
  type: GET_OFFERS_REJECTED,
})

export const getOfferRejectedSuccess = offerDetails => ({
  type: GET_OFFERS_REJECTED_SUCCESS,
  payload: offerDetails,
})

export const getOfferRejectedFail = error => ({
  type: GET_OFFERS_REJECTED_FAIL,
  payload: error,
})
