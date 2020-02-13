import { TOGGLE_SIDE_DRAWER, RESET_STATE_APP } from "./appTypes";
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
