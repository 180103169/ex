import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Accepted from "../pages/Offers/Accepted/accepted"
import Rejected from "../pages/Offers/Rejected/rejected";
import Details from "../pages/Dashboard/details";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "/offers/accepted", component: Accepted },
  { path: "/offers/rejected", component: Rejected },
  { path: "/details/:id", component: Details },
]


const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
