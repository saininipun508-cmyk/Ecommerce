import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors as userClearErrors } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
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
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import {
  clearErrors as productClearErrors,
  deleteReviews,
  getAllReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productconstant";
import Star from "@mui/icons-material/Star";

const ProductReview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [productId, setProductId] = useState("");

  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const {
    error: productReviewErrors,
    reviews,
    isLoading: productReviewsLoading,
  } = useSelector((state) => state.productReviews);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError);
      dispatch(productClearErrors());
    }

    if (productReviewErrors) {
      alert.error(productReviewErrors);
      dispatch(productClearErrors());
    }

    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (isDeleted) {
      alert.success("Review is deleted successfully.");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }

    if (userLoading === false && isAuthenticated && user.role !== "admin") {
      alert.error("Only admin can access this route.");
      navigate("/");
    }

    if (userLoading === false && isAuthenticated && productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
  }, [
    alert,
    deleteError,
    dispatch,
    isAuthenticated,
    isDeleted,
    navigate,
    productId,
    productReviewErrors,
    user,
    userError,
    userLoading,
  ]);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 300, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "review",
      headerName: "Review",
      minWidth: 180,
      flex: 0.4,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
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
            <Button
              mx={5}
              _hover={{ color: "red" }}
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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
  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        rating: review.rating,
        review: review.review,
        user: review.user.name,
      });
    });

  if (userLoading || !user || productReviewsLoading) {
    return <Loader />;
  }

  const theme = createTheme();

  return (
    <Fragment>
      <MetaData title="All Reviews --Admin" />

      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        <Box w="100%" p={1} borderLeft="1px solid black">
          {isMaxWidth750 && (
            <HStack justifyContent={"center"} mb={5}>
              <Button
                p={5}
                width={isMaxWidth750 ? "90%" : "60%"}
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
            </HStack>
          )}
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
                All REVIEWS
              </Heading>
            </HStack>

            <Box
              width="100%"
              px={6}
              as="form"
              onSubmit={productReviewSubmitHandler}
            >
              <FormControl my={10}>
                <FormLabel>Product Id</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<Star />} />
                  <Input
                    type="text"
                    placeholder="Enter Product Id"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                  />
                </InputGroup>
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
                disabled={productReviewsLoading || productId === ""}
              >
                Search
              </Button>
            </Box>
          </VStack>

          {reviews && reviews.length > 0 ? (
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
          ) : (
            <Heading
              boxShadow="dark-lg"
              my={4}
              mx="auto"
              width={isMaxWidth750 ? "90%" : "60%"}
              py={10}
              px={5}
              borderRadius="xl"
              textAlign="center"
              as="h4"
              fontSize="2xl"
              opacity="0.9"
            >
              No Review Found
            </Heading>
          )}
        </Box>
      </div>
    </Fragment>
  );
};

export default ProductReview;
