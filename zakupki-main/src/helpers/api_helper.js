import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"
import authHeader from "./jwt-token-access/auth-token-header"
//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = "http://10.110.160.12:8000/api/"

const axiosApi = axios.create({
  baseURL: API_URL,
})


axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  axiosApi.defaults.headers.common['Authorization'] = authHeader()
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  axiosApi.defaults.headers.common['Authorization'] = authHeader()

  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  axiosApi.defaults.headers.common['Authorization'] = authHeader()

  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  axiosApi.defaults.headers.common['Authorization'] = authHeader()

  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
