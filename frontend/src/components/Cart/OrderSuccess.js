import React, { Fragment, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors } from "../../actions/userAction";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  const { isLoading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return navigate("/login");
  }
  return (
    <Fragment>
      <MetaData title="Success" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="50vh"
        flexDirection="column"
        className="svgSize"
      >
        <CheckCircleRoundedIcon />

        <Text fontSize="3xl" as="p" my={5}>
          Your Order Has Been Placed Successfully.
        </Text>

        <Link to="/orders">
          <Button colorScheme="green" type="button">
            View Order
          </Button>
        </Link>
      </Box>
    </Fragment>
  );
};

export default OrderSuccess;
