import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/productconstant";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        isLoading: true,
        products: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        resultPerPage: action.payload.resultPerPage,
        products: action.payload.data.products,
        productsCount: action.payload.productsCount,
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        products: action.payload.data.products,
      };

    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
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

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        success: action.payload.status === "success",
        product: action.payload.data.product,
      };

    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
        isLoading: false,
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

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload.status === "success",
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload.status === "success",
      };

    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_DETAIL_SUCCESS:
      return {
        isLoading: false,
        product: action.payload.data.product,
      };

    case PRODUCT_DETAIL_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        isLoading: false,
        success: action.payload.status === "success",
      };

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ALL_REVIEW_SUCCESS:
      return {
        isLoading: false,
        reviews: action.payload.data.reviews,
      };

    case ALL_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        reviews: [],
        error: null,
      };

    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        isLoading: false,
        isDeleted: action.payload.status === "success",
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong.",
      };

    case DELETE_REVIEW_RESET:
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
