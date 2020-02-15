import {
  TOGGLE_SIDE_DRAWER,
  RESET_STATE_APP,
  FETCH_REQUEST_LOADER
} from "./appTypes";

const initialState = {
  loading: false,
  isDrawerVisible: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_DRAWER:
      return {
        ...state,
        isDrawerVisible: !state.isDrawerVisible
      };
    case RESET_STATE_APP:
      return {
        ...initialState
      };
    case FETCH_REQUEST_LOADER:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
};
export default appReducer;
