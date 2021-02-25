import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_OFFERS_ACCEPTED,
  GET_OFFERS_REJECTED,
  GET_OFFER_BY_PURCHASE,
  POST_OFFERS_FILE_UPLOAD
} from "./actionTypes"
import {
  getOfferAcceptedSuccess,
  getOfferAcceptedFail,
  getOfferRejectedSuccess,
  getOfferRejectedFail,
  getOffersByPurchase,
  getOffersByPurchaseSuccess,
  getOffersByPurchaseFail,
  uploadFileSuccess,
  uploadFileFail
} from "./actions"

//Include Both Helper File with needed methods
import { getAcceptedOffers, getRejectedOffers, postUploadFiles } from "helpers/backend_helper"

function* fetchAcceptedOffers() {
  console.log('in fetch accepted offers');
  try {
    const response = yield call(getAcceptedOffers)
    yield put(getOfferAcceptedSuccess(response))
  } catch (error) {
    yield put(getOfferAcceptedFail(error))
  }
}
function* fetchRejectedOffers() {
  console.log('in fetch rejected');
  try {
    const response = yield call(getRejectedOffers)
    yield put(getOfferRejectedSuccess(response))
  } catch (error) {
    yield put(getOfferRejectedFail(error))
  }
}

function* fetchOfferByPurchase({ purchaseId }) {
  console.log('in fetch offers by purchase')
  try {
    const response = yield call(getOffersByPurchase, purchaseId)
    yield put(getOffersByPurchaseSuccess(response))
  } catch (error) {
    yield put(getOffersByPurchaseFail(error))
  }
}
function* uploadFile({ payload: { file } }) {
  console.log('upload file see in saga');
  try {
      const response = yield call(postUploadFiles, {
        files: file
      })
      yield put(uploadFileSuccess(response))
  } catch (error) {
    yield put(uploadFileFail(error))
  }
}


function* projectsSaga() {
  yield takeEvery(GET_OFFERS_ACCEPTED, fetchAcceptedOffers)
  yield takeEvery(GET_OFFERS_REJECTED, fetchRejectedOffers)
  yield takeEvery(GET_OFFER_BY_PURCHASE, fetchOfferByPurchase)
  yield takeEvery(POST_OFFERS_FILE_UPLOAD, uploadFile)
}

export default projectsSaga
