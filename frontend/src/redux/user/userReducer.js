import { SAVE_DATA_FROM_DATABASE, RESET_STATE_APP } from "./userTypes";

const initialState = {
  credentials: null,
  food: null,
  token: localStorage.getItem("JWT"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DATA_FROM_DATABASE:
      return {
        credentials: action.payload.credentials,
        food: action.payload.food,
        token: action.payload.token,
      };
    case RESET_STATE_APP:
      return {
        ...initialState,
        token: null,
      };
    default:
      return state;
  }
};
export default userReducer;
