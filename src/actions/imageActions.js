import { ADD_IMAGE, GET_IMAGES, GET_ERRORS } from "./types";
import theApi from "../api/index";

export const addImage = (imageData, history) => (dispatch) => {
  theApi
    .postImage(imageData)
    .then((res) => dispatch({ type: ADD_IMAGE, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  history.push("/");
};

export const getAllImages = () => (dispatch) => {
  console.warn("getAllImages = () =>");
  theApi
    .getImages()
    .then((res) => {
      console.log(`res: ${res}`);
      console.log(res);
      

      dispatch({
        type: GET_IMAGES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_IMAGES,
        payload: null,
      })
    );
};
