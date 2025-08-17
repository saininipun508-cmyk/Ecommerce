import React, { Fragment } from "react";
import {
  Box,
  Grid,
  VStack,
  GridItem,
  Button,
  Text,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import CartItemCard from "./CartItemCard";
import MetaData from "../layout/MetaData";
import HeadingComp from "../HeadingComp/HeadingComp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");
  const [isMaxWidth650] = useMediaQuery("(max-width: 650px)");
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  let grossTotal = 0;

  cartItems.forEach((item) => {
    grossTotal += item.price * item.quantity;
  });

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title="Cart" />
      <HeadingComp text="MY CART" />
      <Box
        w={isMaxWidth900 ? "95%" : "80%"}
        p={5}
        my={5}
        mx="auto"
        bg="gray.100"
      >
        {cartItems.length !== 0 && (
          <Grid
            templateColumns={
              isMaxWidth650 ? "repeat(2, 1fr)" : "repeat(6, 1fr)"
            }
            columnGap={20}
            rowGap={10}
          >
            {cartItems.map((item, idx) => (
              <CartItemCard key={idx} item={item} />
            ))}
          </Grid>
        )}

        {!cartItems.length && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="dark-lg"
            my={4}
            mx="auto"
            w="50%"
            py={10}
            px={5}
            borderRadius="xl"
            opacity="0.9"
          >
            <MdRemoveShoppingCart size="10vw" />
            <Heading mt={5} textAlign="center" as="h4" fontSize="2xl">
              No Product In Your Cart
            </Heading>
          </Box>
        )}
      </Box>

      {cartItems.length > 0 && (
        <VStack
          pt={5}
          align="flex-end"
          w={isMaxWidth900 ? "95%" : "80%"}
          my={5}
          mx="auto"
        >
          <Grid
            borderTop="4px solid tomato"
            pt={5}
            mb="5"
            templateColumns="repeat(2, 1fr)"
            width={isMaxWidth900 ? "100%" : "50%"}
          >
            <GridItem
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                Gross Total
              </Text>
            </GridItem>
            <GridItem
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                {`₹${grossTotal}`}
              </Text>
            </GridItem>
          </Grid>

          <Button
            onClick={checkoutHandler}
            width={isMaxWidth900 ? "100%" : "50%"}
            colorScheme="green"
            variant="solid"
          >
            <Text fontSize="2xl" fontWeight="bold">
              Check Out
            </Text>
          </Button>
        </VStack>
      )}
    </Fragment>
  );
};

export default Cart;
