import axios from "axios"
import { post, del, get, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}
// Login Method
export const postLogin = (data) => post(url.POST_LOGIN, data)

// get purchase
export const getPurchases = () => get(url.GET_PURCHASES)

// get purchase
export const getKontragents = () => get(url.GET_KONTRAGENTS)

// get purchase details
export const getPurchasesDetails = id =>
  get(`${url.GET_PURCHASE_DETAIL}`, { params: { id } })

// get offers
export const getOffersByPurchase = id =>
  get(`${url.GET_OFFERS_BY_PURCHASE}/${id}`, { params: { id } })

// get accepted offers
export const getAcceptedOffers = () => get(url.GET_ACCEPTED_OFFERS)

// get rejected offers
export const getRejectedOffers = () => get(url.GET_REJECTED_OFFERS)

export const postUploadFiles = data => post(url.POST_LOGIN, data)
