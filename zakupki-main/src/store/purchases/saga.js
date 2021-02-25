import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_PURCHASES, GET_PURCHASE_DETAIL } from "./actionTypes"
import {
  getPurchasesSuccess,
  getPurchasesFail,
  getPurchaseDetailSuccess,
  getPurchaseDetailFail,
} from "./actions"

//Include Both Helper File with needed methods
import { getPurchases, getPurchasesDetails } from "helpers/backend_helper"

function* fetchPurchases() {
  console.log('in get purchasees');
  try {
    const response = yield call(getPurchases)
    yield put(getPurchasesSuccess(response))
  } catch (error) {
    yield put(getPurchasesFail(error))
  }
}

function* fetchPurchaseDetail({ purchaseId }) {
  console.log('in fetch detail')
  console.log(purchaseId)
  try {

    const response = yield call(getPurchasesDetails, purchaseId)
    yield put(getPurchaseDetailSuccess(response))
  } catch (error) {
    yield put(getPurchaseDetailFail(error))
  }
}

function* projectsSaga() {
  yield takeEvery(GET_PURCHASES, fetchPurchases)
  yield takeEvery(GET_PURCHASE_DETAIL, fetchPurchaseDetail)
}

export default projectsSaga
