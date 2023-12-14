// Importing combineReducers from redux
import { combineReducers } from "redux";

// Importing the HomeReducer
import HomeReducer from "./HomeReducer/HomeReducer";

// Combining reducers using combineReducers
export const reducer = combineReducers({
  Home: HomeReducer, // Combining the HomeReducer under the 'Home' key in the state
});
