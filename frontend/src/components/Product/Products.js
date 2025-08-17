import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import {
  Flex,
  Center,
  Grid,
  Box,
  useDisclosure,
  Button,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import HeadingComp from "../HeadingComp/HeadingComp";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const [isMaxWidth991] = useMediaQuery("(max-width: 991px)");

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([1, 1000000]);
  const [sliderValue, setSliderValue] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [category, setCategory] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const dispatch = useDispatch();
  const alert = useAlert();
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword");

  const { products, isLoading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, priceRange, category, ratings));
  }, [
    alert,
    category,
    currentPage,
    dispatch,
    error,
    keyword,
    priceRange,
    ratings,
  ]);

  const productFilterOptions = {
    priceRange,
    setPriceRange,
    sliderValue,
    setSliderValue,
    setRatings,
    isHover,
    setIsHover,
    category,
    setCategory,
  };

  return (
    <Fragment>
      <MetaData title="Products"></MetaData>
      <HeadingComp text="Products" />

      <Grid templateColumns={{ base: "1fr", lg: "1fr 5fr" }}>
        {isMaxWidth991 && (
          <Box mb={4} width="90%" mx="auto">
            <Button
              width="100%"
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
            >
              Apply Filter
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
                <DrawerHeader fontSize={"2xl"}>Apply Filter</DrawerHeader>

                <DrawerBody>
                  <ProductFilter {...productFilterOptions} />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        )}

        {!isMaxWidth991 && (
          <Box>
            <ProductFilter {...productFilterOptions} />
          </Box>
        )}

        {isLoading && <Loader />}

        {!isLoading && (
          <Fragment>
            <Flex
              flexWrap="wrap"
              margin="1vmax auto"
              width="100%"
              justifyContent="space-evenly"
            >
              {products &&
                products.map((product, idx) => (
                  <ProductCard key={idx} product={product} />
                ))}
            </Flex>
          </Fragment>
        )}
      </Grid>

      {productsCount > 0 && (
        <Center my={10}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            linkClass="page-link"
            itemClass="page-item"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </Center>
      )}
    </Fragment>
  );
};

export default Products;
