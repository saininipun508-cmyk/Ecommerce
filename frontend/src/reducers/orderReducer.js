import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        isLoading: false,
        order: action.payload.data,
      };

    case CREATE_ORDER_FAIL:
      return {
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        isLoading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        isLoading: false,
        orders: action.payload.data.orders,
      };

    case MY_ORDERS_FAIL:
      return {
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        isLoading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        isLoading: false,
        orders: action.payload.data.orders,
      };

    case ALL_ORDERS_FAIL:
      return {
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

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload.status === "success",
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload.status === "success",
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        isLoading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        isLoading: false,
        order: action.payload.data.order,
      };

    case ORDER_DETAILS_FAIL:
      return {
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
