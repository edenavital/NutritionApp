import store from "../store";

import {
  RESET_STATE_APP,
  SAVE_DATA_LOGIN,
  ADD_FOOD,
  REMOVE_FOOD,
  INCREASE_DECREASE_FOOD,
  UPDATE_USER_CREDENTIALS,
  CALCULATE_BMR,
  CALCULATE_DAILY_CALORIES
} from "./userTypes";

import { fetchRequestLoader } from "../app/appActions";

import axios from "axios";

//Including token
export const saveDataLogin = (dataOfUser, token) => {
  //   const BMR =
  if (token) {
    dataOfUser = {...dataOfUser, token}
  }

  return {
    type: SAVE_DATA_LOGIN,
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

    let currentUserState = store.getState().user;
    const avatarUrl = { avatarUrl: file.data.secure_url };

    await axios.post("/api/updateAvatar", avatarUrl, {
      headers: { Authorization: currentUserState.token },
    });

    currentUserState.credentials.avatar = file.data.secure_url;

    dispatch(updateUserCredentials(currentUserState));
    dispatch(fetchRequestLoader());
  };
};

//Calculating BMR - callback only for login
export const calculateBmr = ({ height, weight, age, gender }) => {
  height = parseFloat(height * 60);
  weight = parseFloat(weight);

  let bmr = 0;
  if (gender === 'male') {
    bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
  }
  bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  console.log("BMR is:", bmr)
  return {
    type: CALCULATE_BMR,
    payload: Math.round(bmr)
  }
}

// independant actions
export const calculateDailyCalories = () => {
  const food = store.getState().user && store.getState().user.food
  if (food) {
    const totalCalories = food.reduce((total, item) => {
      return total += item.quantity * item.calories;
    }, 0)
    store.dispatch({ type: CALCULATE_DAILY_CALORIES, payload: totalCalories })
  }
}