import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import HeadingComp from "../HeadingComp/HeadingComp";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Divider,
  Grid,
  useMediaQuery,
} from "@chakra-ui/react";
import Loader from "../Loader/Loader";
import ConfirmItemCard from "./ConfirmItemCard";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors } from "../../actions/userAction";

const ConfirmOrder = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, isLoading, isAuthenticated, error } = useSelector(
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

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subTotal > 1000 ? 0 : 200;

  const tax = subTotal * 0.18;

  const totalPrice = subTotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
    window.location.reload(false);
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <HeadingComp text="Confirm Your Order" />

      <Box
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "50vw"}
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
          Shipping Info
        </Heading>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          my={4}
        >
          <Box>
            <Text display="inline" as="p" fontWeight="medium">
              Name:{" "}
            </Text>
            <Text as="span" fontSize="sm">
              {user.name}
            </Text>
          </Box>
          <Box>
            <Text display="inline" as="p" fontWeight="medium">
              Phone:{" "}
            </Text>
            <Text as="span" fontSize="sm">
              {shippingInfo.phoneNo}
            </Text>
          </Box>
          <Box>
            <Text display="inline" as="p" fontWeight="medium">
              Address:{" "}
            </Text>
            <Text as="span" fontSize="sm">
              {address}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "50vw"}
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
          Your Cart Items
        </Heading>

        <Grid my={10} templateColumns="repeat(4, 1fr)" gap={5}>
          {cartItems &&
            cartItems.map((item, idx) => (
              <ConfirmItemCard item={item} key={idx} />
            ))}
        </Grid>
      </Box>

      <Box
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "50vw"}
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
          Order Summary
        </Heading>

        <Box my={5}>
          <HStack my={3} justifyContent="space-between">
            <Text as="p">SubTotal</Text>
            <Text as="span">₹{subTotal}</Text>
          </HStack>

          <HStack my={3} justifyContent="space-between">
            <Text as="p">Shipping Charges</Text>
            <Text as="span">₹{shippingCharges}</Text>
          </HStack>

          <HStack my={3} justifyContent="space-between">
            <Text as="p">GST</Text>
            <Text as="span">₹{tax}</Text>
          </HStack>

          <Divider borderColor="black" />
          <HStack my={3} justifyContent="space-between">
            <Text as="b">Total</Text>
            <Text as="b">₹{totalPrice}</Text>
          </HStack>
        </Box>

        <Box width="80%" mx="auto">
          <Button
            onClick={proceedToPayment}
            _hover={{ bg: "green.400" }}
            width="100%"
            bg="green.300"
          >
            Proceed To Payment
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ConfirmOrder;
