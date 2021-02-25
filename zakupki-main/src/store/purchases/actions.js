import {
  GET_PURCHASES,
  GET_PURCHASES_FAIL,
  GET_PURCHASES_SUCCESS,
  GET_PURCHASE_DETAIL,
  GET_PURCHASE_DETAIL_FAIL,
  GET_PURCHASE_DETAIL_SUCCESS,
} from "./actionTypes"

export const getPurchases = () => {
  console.log('in getpusrchasess')
  return {
  type: GET_PURCHASES,
}
}

export const getPurchasesSuccess = projects => ({
  type: GET_PURCHASES_SUCCESS,
  payload: projects,
})

export const getPurchasesFail = error => ({
  type: GET_PURCHASES_FAIL,
  payload: error,
})

export const getPurchaseDetail = purchaseId => ({
  type: GET_PURCHASE_DETAIL,
  purchaseId,
})

export const getPurchaseDetailSuccess = projectDetails => ({
  type: GET_PURCHASE_DETAIL_SUCCESS,
  payload: projectDetails,
})

export const getPurchaseDetailFail = error => ({
  type: GET_PURCHASE_DETAIL_FAIL,
  payload: error,
})
