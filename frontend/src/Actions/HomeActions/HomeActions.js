// userActions.js
import axios from "axios";
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

export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});
export const addUserFailure = (error) => ({
  type: ADD_USER_FAILURE,
  payload: error,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});
export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});
export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const setApiMessage = (message) => ({
  type: SET_API_MESSAGE,
  payload: message,
});
export const clearApiMessage = () => ({ type: CLEAR_API_MESSAGE });

export const fetchUsers = (baseUrl) => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get(baseUrl);
      console.log(response, "fetchUsers");
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure("Error fetching users"));
    }
  };
};

export const addUser = (baseUrl, user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(baseUrl, user);
      console.log(response, "fetchUsers1");
      dispatch(addUserSuccess(response.data?.user));
      dispatch(setApiMessage(response.data?.message));
    } catch (error) {
      dispatch(addUserFailure("Error adding user"));
    }
  };
};
export const updateUser = (baseUrl, userId, updatedUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`${baseUrl}${userId}`, updatedUser);
      console.log(response, "fetchUsers2");
      dispatch(updateUserSuccess(response.data?.user));
      dispatch(setApiMessage(response.data?.message));
    } catch (error) {
      dispatch(updateUserFailure("Error updating user"));
    }
  };
};

export const deleteUser = (baseUrl, userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${baseUrl}${userId}`);
      dispatch(deleteUserSuccess(userId));
      dispatch(setApiMessage(response.data?.message));
      console.log(response.data?.message, "deleteUser");
    } catch (error) {
      dispatch(deleteUserFailure("Error deleting user"));
    }
  };
};
