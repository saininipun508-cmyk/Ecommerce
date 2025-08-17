import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CLEAR_ERRORS,
} from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        isLoading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.data.user,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload || "Something went wrong.",
      };

    case LOAD_USER_FAIL:
      return {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload || "Something went wrong.",
      };

    case LOGOUT_USER_SUCCESS:
      return {
        isLoading: false,
        user: null,
        isAuthenticated: false,
      };

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload.status === "success",
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload.status === "success",
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
      };

    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.status,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        isLoading: false,
        message: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data.users,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data.user,
      };

    case USER_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
