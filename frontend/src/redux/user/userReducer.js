import {
  SAVE_DATA_FROM_DATABASE,
  RESET_STATE_APP,
  SAVE_DATA_LOGIN,
  ADD_FOOD,
  INCREASE_FOOD,
} from "./userTypes";

const initialState = {
  credentials: null,
  food: null,
  token: localStorage.getItem("JWT"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DATA_LOGIN:
      return {
        credentials: action.payload.credentials,
        food: action.payload.food,
        token: action.payload.token,
      };
    case SAVE_DATA_FROM_DATABASE:
      return {
        ...state,
        credentials: action.payload.credentials,
        food: action.payload.food,
      };
    case RESET_STATE_APP:
      return {
        ...initialState,
        token: null,
      };
    case ADD_FOOD:
      return {
        ...state,
        food: [...state.food, action.payload],
      };
    case INCREASE_FOOD:
      return {
        ...state,
        food: state.food.map((food) =>
          food.foodid === action.payload.foodid
            ? { ...food, quantity: action.payload.quantity }
            : food
        ),
        // food[action.payload.foodid].quantity: action.payload.quantity,
      };

    default:
      return state;
  }
};
export default userReducer;
