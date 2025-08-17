import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Review from "./Review";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import ProductInfo from "./ProductInfo";

const ProductDetails = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title={`${product.name}`} />
      <ProductInfo product={product} />
      <Review reviews={product.review} />
    </Fragment>
  );
};

export default ProductDetails;
