import { TOGGLE_SIDE_DRAWER, RESET_STATE_APP } from "./appTypes";

const initialState = {
  isDrawerVisible: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_DRAWER:
      return {
        isDrawerVisible: !state.isDrawerVisible
      };
    case RESET_STATE_APP:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
export default appReducer;
