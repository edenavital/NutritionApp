import {
  TOGGLE_SIDE_DRAWER,
  RESET_STATE_APP,
  FETCH_REQUEST_LOADER,
  CALCULATE_BMR
} from "./appTypes";
//import axios from "axios";

export const toggleSideDrawer = () => {
  console.log("INSIDE TOGGLE SIDE DRAWER ACTION");
  return {
    type: TOGGLE_SIDE_DRAWER
  };
};

export const resetStateApp = () => {
  return {
    type: RESET_STATE_APP
  };
};

export const fetchRequestLoader = () => {
  return {
    type: FETCH_REQUEST_LOADER
  };
};
