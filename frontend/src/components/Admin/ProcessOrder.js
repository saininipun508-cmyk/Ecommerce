import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors as userClearErrors } from "../../actions/userAction";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import {
  Button,
  HStack,
  Text,
  Grid,
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import ConfirmItemCard from "../Cart/ConfirmItemCard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const ProcessOrder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [status, setStatus] = useState("");

  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const { order, error, isLoading } = useSelector(
    (state) => state.orderDetails
  );
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }

    if (userLoading === false && isAuthenticated && user.role !== "admin") {
      alert.error("Only admin can access this route.");
      navigate("/");
    }

    if (userLoading === false && isAuthenticated && user.role === "admin") {
      dispatch(getOrderDetails(params.id));
    }

    if (isUpdated) {
      alert.success("Ordere updated successfully.");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [
    alert,
    dispatch,
    error,
    isAuthenticated,
    isUpdated,
    navigate,
    params.id,
    updateError,
    user,
    userError,
    userLoading,
  ]);

  if (userLoading || !user || isLoading || !order) {
    return <Loader />;
  }

  const processOrderHandler = (e) => {
    e.preventDefault();

    dispatch(updateOrder(params.id, { status }));
  };

  return (
    <Fragment>
      <MetaData title="Process Order --Admin" />

      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        <VStack spacing={10} px={4} borderLeft="1px solid black" pt={10}>
          {isMaxWidth750 && (
            <Box mb={5} width={isMaxWidth750 ? "90%" : "60%"}>
              <Button
                p={5}
                w="100%"
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
              >
                Dashboard Options
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Dashboard Options</DrawerHeader>

                  <DrawerBody>
                    <SideBar />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
          )}
          <Box
            width={isMaxWidth750 ? "90%" : "60%"}
            bg="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="lg"
          >
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

          <Box
            width={isMaxWidth750 ? "90%" : "60%"}
            bg="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="lg"
          >
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

          <Box
            width={isMaxWidth750 ? "90%" : "60%"}
            bg="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="lg"
          >
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

          <Box
            width={isMaxWidth750 ? "90%" : "60%"}
            bg="gray.100"
            borderRadius="2xl"
            p={5}
            boxShadow="lg"
          >
            <Heading
              textAlign="center"
              textDecoration="underline"
              fontSize="2xl"
              fontWeight="medium"
            >
              Ordered Items
            </Heading>

            <Grid my={10} templateColumns="repeat(4, 1fr)" gap={5}>
              {order.orderItems &&
                order.orderItems.map((item, idx) => (
                  <ConfirmItemCard item={item} key={idx} />
                ))}
            </Grid>
          </Box>

          {order.orderStatus !== "Delivered" && (
            <VStack
              boxShadow="lg"
              rounded="md"
              bg="#e2e2e24f"
              my={10}
              width={isMaxWidth750 ? "90%" : "60%"}
              mx="auto"
              transition="all 0.3s"
            >
              <HStack width="100%" justifyContent="space-between">
                <Heading
                  textAlign="center"
                  p={4}
                  width="100%"
                  bg="teal"
                  opacity="0.8"
                  size="lg"
                  as="h3"
                  color="white"
                >
                  PROCESS ORDER
                </Heading>
              </HStack>

              <Box w="100%" px={6} as="form" onSubmit={processOrderHandler}>
                <FormControl my={10}>
                  <FormLabel>Category</FormLabel>
                  <HStack>
                    <AccountTreeIcon />
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Status</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </Select>
                  </HStack>
                </FormControl>
                <Button
                  mb={10}
                  bg="tomato"
                  color="white"
                  fontSize="2xl"
                  _hover={{ backgroundColor: "#ff4321" }}
                  width="100%"
                  type="submit"
                  value="Submit"
                  disabled={isLoading || status === ""}
                >
                  {isLoading ? "Status is Updating..." : "Update Status"}
                </Button>
              </Box>
            </VStack>
          )}
        </VStack>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
