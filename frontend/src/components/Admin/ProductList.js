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
import {
  clearErrors as productClearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productconstant";

const ProductList = () => {
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

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(productClearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(productClearErrors());
    }

    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (isDeleted) {
      alert.success("Product is deleted successfully.");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
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

  const deleteProductHandler = (productId) => {
    dispatch(deleteProduct(productId));
    alert.show("Please wait product is deleting...");
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 300, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              mx={5}
              _hover={{ color: "red" }}
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  if (userLoading || !user || isLoading || !products) {
    return <Loader />;
  }

  const theme = createTheme();

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - Admin" />

      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        <Box w="100%" p={1} borderLeft="1px solid black">
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

export default ProductList;
