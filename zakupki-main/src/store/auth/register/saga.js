import { takeEvery, put, call } from "redux-saga/effects"

//Account Redux states
import { GET_KOTRANGENTS, GET_KOTRANGENTS_SUCCESSFUL, REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed, getKontragentsSuccessful, getKontragentsFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"
import { getKontragents, getRejectedOffers } from "../../../helpers/backend_helper"
import { getOfferRejectedFail, getOfferRejectedSuccess } from "../../offers/actions"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.registerUser,
        user.email,
        user.password
      )
      yield put(registerUserSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtRegister, "/post-jwt-register", user)
      yield put(registerUserSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeRegister, user)
      yield put(registerUserSuccessful(response))
    }
  } catch (error) {
    yield put(registerUserFailed(error))
  }
}
function* fetchKontragents() {
  console.log('in fetch kontragents');
  try {
    const response = yield call(getKontragents)
    yield put(getKontragentsSuccessful(response))
  } catch (error) {
    yield put(getKontragentsFailed(error))
  }
}

function* accountSaga() {
  yield takeEvery(REGISTER_USER, registerUser)
  yield takeEvery(GET_KOTRANGENTS, fetchKontragents)
}

export default accountSaga
