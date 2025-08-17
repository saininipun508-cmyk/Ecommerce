import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors as userClearErrors } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { clearErrors as orderClearError } from "../../actions/orderAction";
import { deleteOrder, getAllOrders } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

const OrderList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");

  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const { error, orders, isLoading } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(orderClearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(orderClearError());
    }

    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (isDeleted) {
      alert.success("Order is deleted successfully.");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }

    if (userLoading === false && isAuthenticated && user.role !== "admin") {
      alert.error("Only admin can access this route.");
      navigate("/");
    }

    if (userLoading === false && isAuthenticated && user.role === "admin") {
      dispatch(getAllOrders());
    }
  }, [
    alert,
    deleteError,
    dispatch,
    error,
    isAuthenticated,
    isDeleted,
    navigate,
    user,
    userError,
    userLoading,
  ]);

  const deleteOrderHandler = (productId) => {
    dispatch(deleteOrder(productId));
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 250,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 250,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/orders/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              mx={5}
              _hover={{ color: "red" }}
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  if (userLoading || !user || isLoading || !orders) {
    return <Loader />;
  }

  const theme = createTheme();

  return (
    <Fragment>
      <MetaData title="All Orders --Admin" />

      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        <Box w="100%" p={1} borderLeft="1px solid black">
          {isMaxWidth750 && (
            <Box mt={1} mb={3} w="100%">
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
          <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
              <Box>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="myTable"
                  autoHeight
                />
              </Box>
            </StyledEngineProvider>
          </ThemeProvider>
        </Box>
      </div>
    </Fragment>
  );
};

export default OrderList;
