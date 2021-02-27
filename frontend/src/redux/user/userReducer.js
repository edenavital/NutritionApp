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

const initialState = {
  connected: null,
  credentials: null,
  food: null,
  token: localStorage.getItem("JWT"),
  bmr: 0,
  currentCalories: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DATA_LOGIN:
      return {
        connected: true,
        credentials: action.payload.credentials,
        food: action.payload.food,
        token: action.payload.token,
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
    case INCREASE_DECREASE_FOOD:
      return {
        ...state,
        food: state.food.map((food) =>
          food.foodid === action.payload.foodid
            ? { ...food, quantity: action.payload.quantity }
            : food
        ),
      };
    case REMOVE_FOOD:
      return {
        ...state,
        food: state.food.filter((row) => row.foodid !== action.payload.foodid),
      };
    case UPDATE_USER_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload.credentials,
      };
        
    case CALCULATE_BMR:
      return {
        ...state,
        bmr: action.payload
      }
    case CALCULATE_DAILY_CALORIES:
      return {
        ...state,
        currentCalories: action.payload
      }

    default:
      return state;
  }
};
export default userReducer;
