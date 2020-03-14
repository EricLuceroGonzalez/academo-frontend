import axios from "axios";

const api = axios.create({
  // baseURL: "https://cygapi.herokuapp.com/api"
  baseURL: "http://localhost:3001/api"
});

axios.defaults.headers.common = {
  Authorization: "Bearer " + localStorage.jwtToken
};

// The user REVIEWR Login-Register post()
export const postRegister = usrData => api.post("/user/register", usrData);
export const postLogin = usrData => api.post("/user/login", usrData);

const apis = {
  postRegister,
  postLogin
};

// baseURL: "http://localhost:3000/api"
export default apis;
