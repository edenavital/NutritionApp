import store from "../store";

import {
  SAVE_DATA_FROM_DATABASE,
  RESET_STATE_APP,
  SAVE_DATA_LOGIN,
  ADD_FOOD,
  REMOVE_FOOD,
  INCREASE_DECREASE_FOOD,
  UPDATE_USER_CREDENTIALS,
} from "./userTypes";

import { fetchRequestLoader } from "../app/appActions";

import axios from "axios";

//Including token
export const saveDataLogin = (dataOfUser) => {
  //   const BMR =
  return {
    type: SAVE_DATA_LOGIN,
    payload: dataOfUser,
  };
};

export const saveDataFromDatabase = (dataOfUser) => {
  //   const BMR =
  return {
    type: SAVE_DATA_FROM_DATABASE,
    payload: dataOfUser,
  };
};

export const resetStateUser = () => {
  return {
    type: RESET_STATE_APP,
  };
};

export const addFood = (newFood) => {
  return {
    type: ADD_FOOD,
    payload: newFood,
  };
};

export const increaseDecreaseFood = (food) => {
  return {
    type: INCREASE_DECREASE_FOOD,
    payload: food,
  };
};

export const removeFood = (food) => {
  return {
    type: REMOVE_FOOD,
    payload: food,
  };
};

export const updateUserCredentials = (userCredentials) => {
  return {
    type: UPDATE_USER_CREDENTIALS,
    payload: userCredentials,
  };
};

export const setImage = (files) => {
  console.log("setImage invoked");
  return async (dispatch) => {
    dispatch(fetchRequestLoader());

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "nutrition");

    const file = await axios.post(
      "https://api.cloudinary.com/v1_1/dsmi4cpe6/image/upload",
      data
    );

    let currentUserState = store.getState().user.credentials;
    currentUserState[0].avatar = file.data.secure_url;

    dispatch(updateUserCredentials(currentUserState));
    dispatch(fetchRequestLoader());
  };
};
