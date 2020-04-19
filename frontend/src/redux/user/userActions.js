import {
  SAVE_DATA_FROM_DATABASE,
  RESET_STATE_APP,
  SAVE_DATA_LOGIN,
  ADD_FOOD
} from "./userTypes";

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