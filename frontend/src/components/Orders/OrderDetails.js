import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { clearErrors as userClearErrors } from "../../actions/userAction";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import ConfirmItemCard from "../Cart/ConfirmItemCard";

const OrderDetails = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const { order, error, isLoading } = useSelector(
    (state) => state.orderDetails
  );
  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [alert, dispatch, error, params.id, userError]);

  if (isLoading || userLoading) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return navigate("/login");
  }

  return (
    <Fragment>
      <MetaData title="Orders Detail" />

      <Box
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "40vw"}
        bg="gray.100"
        borderRadius="2xl"
        p={5}
        boxShadow="lg"
        my={10}
        mx="auto"
      >
        <Box display="flex" flexDirection="column" my={5}>
          <Heading
            textAlign="center"
            textDecoration="underline"
            fontSize="2xl"
            fontWeight="medium"
          >
            Shipping Info
          </Heading>

          <Box mt={5}>
            <Text display="inline" as="p" fontWeight="medium">
              Name:{"   "}
            </Text>
            <Text as="span" fontSize="sm">
              {order.user?.name}
            </Text>
          </Box>
          <Box>
            <Text display="inline" as="p" fontWeight="medium">
              Phone:{"   "}
            </Text>
            <Text as="span" fontSize="sm">
              {order.shippingInfo?.phoneNo}
            </Text>
          </Box>
          <Box>
            <Text display="inline" as="p" fontWeight="medium">
              Address:{"   "}
            </Text>
            <Text as="span" fontSize="sm">
              {order.shippingInfo &&
                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
            </Text>
          </Box>
        </Box>

        <Divider borderColor="black" />

        <Box display="flex" flexDirection="column" my={5}>
          <Heading
            textAlign="center"
            textDecoration="underline"
            fontSize="2xl"
            fontWeight="medium"
          >
            Payment
          </Heading>

          <Box mt={5}>
            <Text
              display="block"
              as="p"
              fontWeight="bold"
              color={
                order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "green.500"
                  : "red.500"
              }
            >
              {order.paymentInfo && order.paymentInfo.status === "succeeded"
                ? "PAID"
                : "NOT PAID"}
            </Text>
            <Text display="inline" as="p" fontWeight="bold">
              Amount:{"   "}
            </Text>
            <Text as="span" fontSize="sm">
              {order.totalPrice && `₹${order.totalPrice}`}
            </Text>
          </Box>
        </Box>

        <Divider borderColor="black" />

        <Box display="flex" flexDirection="column" my={5}>
          <Heading
            textAlign="center"
            textDecoration="underline"
            fontSize="2xl"
            fontWeight="medium"
          >
            Order Status
          </Heading>

          <Box mt={5}>
            <Text
              display="block"
              as="p"
              fontWeight="bold"
              color={
                order.orderStatus && order.orderStatus === "Delivered"
                  ? "green.500"
                  : "red.500"
              }
            >
              {order.orderStatus && order.orderStatus}
            </Text>
          </Box>
        </Box>

        <Divider borderColor="black" />

        <Box display="flex" flexDirection="column" my={5}>
          <Heading
            textAlign="center"
            textDecoration="underline"
            fontSize="2xl"
            fontWeight="medium"
          >
            Order Id
          </Heading>

          <Box mt={5}>
            <Text display="inline" as="p" fontWeight="bold">
              {order._id}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "40vw"}
        bg="gray.100"
        borderRadius="2xl"
        p={5}
        boxShadow="lg"
        my={10}
        mx="auto"
      >
        <Heading
          textAlign="center"
          textDecoration="underline"
          fontSize="2xl"
          fontWeight="medium"
        >
          Order Items
        </Heading>

        <Grid my={10} templateColumns="repeat(4, 1fr)" gap={5}>
          {order.orderItems &&
            order.orderItems.map((item, idx) => (
              <ConfirmItemCard item={item} key={idx} />
            ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default OrderDetails;
