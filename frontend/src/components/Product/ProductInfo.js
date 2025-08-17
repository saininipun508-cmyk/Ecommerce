import React, { useState } from "react";
import {
  HStack,
  Heading,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  VStack,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Box,
  Container,
  Stack,
  Flex,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { addItemsToCart } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Rating from "@mui/material/Rating";
import { MdLocalShipping } from "react-icons/md";
import {
  clearErrors,
  getProductDetails,
  newReview,
  upDateReview,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { NEW_REVIEW_RESET } from "../../constants/productconstant";
import Carousel from "../Carousel/Carousel";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(!product.stock ? 0 : 1);
  const [ratingValue, setRatingValue] = useState(1);
  const [review, setReview] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { success, error } = useSelector((state) => state.newReview);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  let isAlreadyGiveTheReview = false;
  let reviewId = "";

  product.review &&
    user &&
    product.review.forEach((item) => {
      if (item.user._id === user._id) {
        isAlreadyGiveTheReview = true;
        reviewId = item._id;
      }
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch(getProductDetails(params.id));
      dispatch({
        type: NEW_REVIEW_RESET,
      });
    }

    setQuantity(!product.stock ? 0 : 1);
  }, [alert, dispatch, error, params.id, product, success]);

  const decreaseQuantity = () => {
    if (quantity === 0 || quantity === 1) return;
    setQuantity((val) => val - 1);
  };

  const increaseQunatity = () => {
    if (product.stock === quantity) return;
    setQuantity((val) => val + 1);
  };

  const addToCartHandler = () => {
    if (quantity <= 0) {
      return alert.error("This item can not be added in to cart");
    }
    dispatch(addItemsToCart(product._id, quantity));
    alert.success("Item added to cart");
  };

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const submitReviewHandler = () => {
    const reviewData = {
      review,
      rating: ratingValue,
    };

    if (isAlreadyGiveTheReview) {
      dispatch(upDateReview(reviewData, params.id, reviewId));
    } else {
      dispatch(newReview(reviewData, params.id));
    }
    onClose();
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        alignItems="flex-start"
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Center width="100%">
            <Box width="60%">
              {product.images && (
                <Carousel dots={true} images={product.images} />
              )}
            </Box>
          </Center>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.name}
            </Heading>
            <Text fontSize="xs">Product # {product._id}</Text>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {`₹${product.price}`}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Rating
              </Text>
              <HStack spacing={{ base: 4, sm: 6 }}>
                <Rating {...options} />

                <Text as="span">
                  ({product.numOfReviews + " "}
                  {product.numOfReviews === 1 ? "Review" : "Reviews"})
                </Text>
              </HStack>
            </Box>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Status
              </Text>

              <Text as="b" color={product.stock < 1 ? "red" : "green"}>
                {product.stock < 1 ? " Out of stock." : " In stock"}
              </Text>
              <Text as="span">
                {product.stock !== 0
                  ? ` (${product.stock} ${
                      product.stock === 1 ? "Item" : "Items"
                    } left.)`
                  : ""}
              </Text>
            </Box>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Description
              </Text>

              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {product.description}
                  <br />
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text>
                <Text fontSize={"lg"}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                  maxime modi nam officiis porro, quae, quisquam quos
                  reprehenderit velit? Natus, totam.
                </Text>
              </VStack>
            </Box>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Select Quantity
              </Text>
              <HStack>
                <Button
                  onClick={decreaseQuantity}
                  bg={useColorModeValue("gray.900", "gray.50")}
                  color={useColorModeValue("white", "gray.900")}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  disabled={product.stock <= 0}
                >
                  -
                </Button>
                <NumberInput
                  borderColor="gray.500"
                  width="30%"
                  value={quantity}
                  max={product.stock}
                  readOnly={true}
                >
                  <NumberInputField />
                </NumberInput>
                <Button
                  onClick={increaseQunatity}
                  bg={useColorModeValue("gray.900", "gray.50")}
                  color={useColorModeValue("white", "gray.900")}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  disabled={product.stock <= 0}
                >
                  +
                </Button>
              </HStack>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center">
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={addToCartHandler}
            disabled={product.stock <= 0}
          >
            Add to cart
          </Button>

          {/* Submit review */}
          <Button
            onClick={onOpen}
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            disabled={!isAuthenticated}
          >
            {!isAuthenticated && "Login to submit the review"}

            {isAuthenticated &&
              (isAlreadyGiveTheReview ? "Update Review" : "Submit Review")}
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {isAlreadyGiveTheReview ? "Update Review" : "Submit Review"}
              </ModalHeader>

              <ModalBody>
                <Rating
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
                <Textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  CANCEL
                </Button>
                <Button colorScheme="blue" onClick={submitReviewHandler}>
                  SUBMIT
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default ProductInfo;
