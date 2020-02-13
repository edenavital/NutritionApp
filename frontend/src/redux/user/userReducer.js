import { SAVE_DATA_FROM_DATABASE, RESET_STATE_APP } from "./userTypes";

const initialState = {
  data: [{}]
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DATA_FROM_DATABASE:
      return {
        credentials: action.payload.credentials,
        food: action.payload.food
      };
    case RESET_STATE_APP:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
export default userReducer;
