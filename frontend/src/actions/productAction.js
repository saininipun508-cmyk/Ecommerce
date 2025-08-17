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
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productconstant";
import axios from "axios";

export const getProduct =
  (
    keyword = "",
    currentPage = 1,
    sliderRange = [0, 2500],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      keyword = keyword ? keyword : "";

      let Link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${sliderRange[0]}&price[lte]=${sliderRange[1]}&ratings[gte]=${ratings}`;

      if (category) {
        Link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${
          sliderRange[0]
        }&price[lte]=${
          sliderRange[1]
        }&category=${category.toLowerCase()}&ratings[gte]=${ratings}`;
      }

      dispatch({ type: ALL_PRODUCT_REQUEST });
      const { data } = await axios.get(Link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: err.response?.data?.message || "Some thing went wrong.",
      });
    }
  };

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: err.response?.data?.message || "Some thing went wrong.",
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = { headers: { "Content-type": "multipart/form-data" } };
    const { data } = await axios.post(
      `/api/v1/admin/products/`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = { headers: { "Content-type": "multipart/form-data" } };

    const { data } = await axios.patch(
      `/api/v1/admin/products/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/products/${productId}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const newReview = (reviewData, productId) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/products/${productId}/reviews`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const upDateReview =
  (reviewData, productId, reviewId) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });

      const config = { headers: { "Content-type": "application/json" } };

      const { data } = await axios.patch(
        `/api/v1/products/${productId}/reviews/${reviewId}`,
        reviewData,
        config
      );

      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// all review of a product
export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${productId}/reviews`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

// delete review of a product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/products/${productId}/reviews/${reviewId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};
