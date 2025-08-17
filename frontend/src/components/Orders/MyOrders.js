import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/userAction";
import {
  clearErrors as orderClearErrors,
  myOrders,
} from "../../actions/orderAction";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import "./MyOrders.css";
import HeadingComp from "../HeadingComp/HeadingComp";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isLoading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const {
    isLoading: ordersLoading,
    error: ordersError,
    orders,
  } = useSelector((state) => state.myOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (ordersError) {
      alert.error(ordersError);
      dispatch(orderClearErrors());
    }

    dispatch(myOrders());
  }, [alert, dispatch, error, ordersError]);

  if (isLoading || ordersLoading) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return navigate("/login");
  }

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
      minWidth: 150,
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
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.id}`}>
            <LaunchRoundedIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, idx) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  const theme = createTheme();

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      <HeadingComp text={`Your Orders`} />

      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Box className="myOrdersPage">
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
    </Fragment>
  );
};

export default MyOrders;
