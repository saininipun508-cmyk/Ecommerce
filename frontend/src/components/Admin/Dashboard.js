import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getALlUsers } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import SideBar from "./SideBar.js";
import "./Dashboard.css";
import MetaData from "../layout/MetaData";
// eslint-disable-next-line no-unused-vars
import { Chart } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Heading,
  VStack,
  HStack,
  Box,
  Text,
  useDisclosure,
  useMediaQuery,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import {
  clearErrors as productClearErrors,
  getAdminProducts,
} from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { clearErrors as orderClearErrors } from "../../actions/orderAction";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");

  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const { error, products, isLoading } = useSelector((state) => state.products);
  const {
    error: ordersError,
    isLoading: ordersLoading,
    orders,
  } = useSelector((state) => state.allOrders);

  const {
    error: allUsersError,
    users,
    isLoading: allUsersLoading,
  } = useSelector((state) => state.allUsers);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(productClearErrors());
    }

    if (ordersError) {
      alert.error(ordersError);
      dispatch(orderClearErrors());
    }

    if (allUsersError) {
      alert.error(allUsersError);
      dispatch(clearErrors());
    }

    if (userError) {
      alert.error(userError);
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
      dispatch(getAdminProducts());
      dispatch(getAllOrders());
      dispatch(getALlUsers());
    }
  }, [
    alert,
    allUsersError,
    dispatch,
    error,
    isAuthenticated,
    navigate,
    ordersError,
    user,
    userError,
    userLoading,
  ]);

  if (
    userLoading ||
    !user ||
    isLoading ||
    !products ||
    ordersLoading ||
    allUsersLoading
  ) {
    return <Loader />;
  }

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock++;
      }
    });

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin" />

      {!isMaxWidth750 && <SideBar />}

      <VStack
        w="100%"
        spacing={10}
        px={20}
        borderLeft="1px solid black"
        pt={20}
      >
        <Box mb={5}>
          <Heading fontSize="4xl">Dashboard</Heading>
        </Box>

        {isMaxWidth750 && (
          <Box mb={5} w="100%">
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

                <DrawerBody pt={1}>
                  <SideBar />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        )}

        <Box rounded="md" boxShadow="dark-lg" width="100%" bg="teal" p={5}>
          <Text fontWeight="bold" textAlign="center" fontSize="xl">
            Total Amount
          </Text>
          <Text color="white" textAlign="center" fontSize="xl">
            ₹{totalAmount}
          </Text>
        </Box>

        <HStack py={10} width="100%" justifyContent="space-between">
          <Box
            _hover={{ transform: "scale(1.05)" }}
            rounded="md"
            boxShadow="dark-lg"
            bg="teal"
            p={5}
            width="30%"
          >
            <Link to="/admin/products">
              <Text fontWeight="bold" textAlign="center" fontSize="xl">
                Products
              </Text>
              <Text color="white" textAlign="center" fontSize="xl">
                {products && products.length}
              </Text>
            </Link>
          </Box>

          <Box
            _hover={{ transform: "scale(1.05)" }}
            rounded="md"
            boxShadow="dark-lg"
            bg="teal"
            p={5}
            width="30%"
          >
            <Link to="/admin/orders">
              <Text fontWeight="bold" textAlign="center" fontSize="xl">
                Orders
              </Text>
              <Text color="white" textAlign="center" fontSize="xl">
                {orders && orders.length}
              </Text>
            </Link>
          </Box>

          <Box
            _hover={{ transform: "scale(1.05)" }}
            rounded="md"
            boxShadow="dark-lg"
            bg="teal"
            p={5}
            width="30%"
          >
            <Link to="/admin/users">
              <Text fontWeight="bold" textAlign="center" fontSize="xl">
                Users
              </Text>
              <Text color="white" textAlign="center" fontSize="xl">
                {users && users.length}
              </Text>
            </Link>
          </Box>
        </HStack>

        <Box width="80%" my={5} mx="auto">
          <Line data={lineState} />
        </Box>

        <Box width="30vmax" my={5} mx="auto">
          <Doughnut data={doughnutState} />
        </Box>
      </VStack>
    </div>
  );
};

export default Dashboard;
