import { SAVE_DATA_FROM_DATABASE, RESET_STATE_APP } from "./userTypes";
//import axios from "axios";

export const saveDataFromDatabase = dataOfUser => {
  //   const BMR =
  return {
    type: SAVE_DATA_FROM_DATABASE,
    payload: dataOfUser
  };
};

export const resetStateUser = () => {
  return {
    type: RESET_STATE_APP
  };
};
