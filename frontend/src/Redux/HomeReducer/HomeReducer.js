// Importing action constants
import {
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  CLEAR_API_MESSAGE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SET_API_MESSAGE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "../../Utility/ReduxConstants/HomeConstants";

// Initial state for the reducer
const initialState = {
  userData: [], // Array to store user data
  loading: false, // Loading indicator
  error: null, // Error message
  apiMessage: "", // API-related message
};

// Reducer function
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: {
      // Handle FETCH_USERS_REQUEST action
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_USERS_SUCCESS: {
      // Handle FETCH_USERS_SUCCESS action
      return {
        ...state,
        userData: action.payload, // Update user data with fetched data
        loading: false,
        error: null,
      };
    }
    case FETCH_USERS_FAILURE: {
      // Handle FETCH_USERS_FAILURE action
      return {
        ...state,
        userData: [], // Clear user data on failure
        loading: false,
        error: null,
      };
    }
    case ADD_USER_SUCCESS: {
      // Handle ADD_USER_SUCCESS action
      return {
        ...state,
        userData: [...state.userData, action.payload], // Add new user data
        error: null,
      };
    }
    case ADD_USER_FAILURE: {
      // Handle ADD_USER_FAILURE action
      return { ...state, error: action.payload }; // Set error on failure
    }
    case UPDATE_USER_SUCCESS:
      // Handle UPDATE_USER_SUCCESS action
      return {
        ...state,
        userData: state.userData.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ), // Update user data with the modified user
        error: null,
      };

    case UPDATE_USER_FAILURE:
      // Handle UPDATE_USER_FAILURE action
      return { ...state, error: action.payload }; // Set error on failure

    case DELETE_USER_SUCCESS:
      // Handle DELETE_USER_SUCCESS action
      return {
        ...state,
        userData: state.userData.filter((user) => user._id !== action.payload), // Remove user data for the deleted user
        error: null,
      };

    case DELETE_USER_FAILURE:
      // Handle DELETE_USER_FAILURE action
      return { ...state, error: action.payload }; // Set error on failure

    case SET_API_MESSAGE:
      // Handle SET_API_MESSAGE action
      return { ...state, apiMessage: action.payload }; // Set API message

    case CLEAR_API_MESSAGE:
      // Handle CLEAR_API_MESSAGE action
      return { ...state, apiMessage: "" }; // Clear API message

    default:
      // Default case: return the current state for unrecognized actions
      return state;
  }
};
