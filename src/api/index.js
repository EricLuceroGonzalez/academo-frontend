import axios from "axios";

const api = axios.create({
  // baseURL: "https://academo-backend.herokuapp.com/api"
  baseURL: "http://localhost:3001/api",
});

axios.defaults.headers.common = {
  Authorization: "Bearer " + localStorage.jwtToken,
};

// The user REVIEWR Login-Register post()
export const postRegister = (usrData) => api.post("/user/register", usrData);
export const postLogin = (usrData) => api.post("/user/login", usrData);
export const postExam = (examData) => api.post("/test", examData);
export const getGrades = () => api.get("/getAllGrades");
export const getCourses = () => api.get("/getAllCourses");
export const getCourseDash = (usr) => api.get(`/courseDashboard/${usr}`);
export const getATest = (testName) => api.get(`/getATest/${testName}`);
// api.get("/getGrades");
const theApi = {
  postRegister,
  postLogin,
  postExam,
  getGrades,
  getCourses,
  getCourseDash,
  getATest
};

// baseURL: "http://localhost:3000/api"
export default theApi;
