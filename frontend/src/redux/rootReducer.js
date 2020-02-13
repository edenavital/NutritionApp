import { combineReducers } from "redux";

//When you will start working with DATA from the DB, you will store it using the reducer
//You will create a new folder for the data and will create a reducer or reducerS for it...
import userReducer from "./user/userReducer";
import appReducer from "./app/appReducer";

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer
});

export default rootReducer;
