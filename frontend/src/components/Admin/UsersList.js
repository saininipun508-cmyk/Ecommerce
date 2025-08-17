import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors as userClearErrors,
  deleteUser,
  getALlUsers,
} from "../../actions/userAction";
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
import { DELETE_USER_RESET } from "../../constants/userConstant";

const UsersList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");

  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const { error, users, isLoading } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(productClearErrors());
    // }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(userClearErrors());
    }

    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }

    if (userLoading === false && isAuthenticated && user.role !== "admin") {
      alert.error("Only admin can access this route.");
      navigate("/");
    }

    if (userLoading === false && isAuthenticated && user.role === "admin") {
      dispatch(getALlUsers());
    }
  }, [
    alert,
    deleteError,
    dispatch,
    error,
    isAuthenticated,
    isDeleted,
    message,
    navigate,
    user,
    userError,
    userLoading,
  ]);

  const deleteUserHandler = (productId) => {
    dispatch(deleteUser(productId));
    alert.show("Please wait user is deleting...");
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 300, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 1,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor";
      },
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
            <Link to={`/admin/users/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              mx={5}
              _hover={{ color: "red" }}
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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
  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      });
    });

  if (userLoading || !user || isLoading || !users) {
    return <Loader />;
  }

  const theme = createTheme();

  return (
    <Fragment>
      <MetaData title="All Users - Admin" />

      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        <Box w="100%" p={1} borderLeft="1px solid black">
          {isMaxWidth750 && (
            <Box mb={3} w="100%" mt={1}>
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

export default UsersList;
