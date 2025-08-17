import React, { Fragment } from "react";
import {
  GridItem,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";

const CartItemCard = ({ item }) => {
  const [isMaxWidth650] = useMediaQuery("(max-width: 650px)");
  const dispatch = useDispatch();

  const setNewQantityHandler = (e) => {
    dispatch(addItemsToCart(item.product, e.target.value * 1));
  };

  const removeFromCartHandler = () => {
    dispatch(removeItemsFromCart(item.product));
  };

  const menuList = [];
  for (let i = 1; i <= item.stock && i <= 5; i++) {
    menuList.push(
      <MenuItem
        value={i}
        key={i}
        _hover={{ bg: "gray.300" }}
        justifyContent="center"
      >
        {i}
      </MenuItem>
    );
  }

  return (
    <Fragment>
      {!isMaxWidth650 && (
        <Fragment>
          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="center"
            colSpan={2}
          >
            <HStack align="flex-start">
              <Image src={item.image} alt="hi" boxSize="30%" />
              <VStack pl="5" align="flex-start">
                <Heading as="h6" fontSize="xl" fontWeight="medium">
                  {item.name}
                </Heading>
                <Text as="p" fontSize="sm">
                  Price {item.price}
                </Text>
              </VStack>
            </HStack>
          </GridItem>

          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="center"
            colSpan={2}
          >
            <Text display="inline" mr={2}>
              Qty
            </Text>
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                bg="gray.300"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                {item.quantity} <ChevronDownIcon />
              </MenuButton>
              <MenuList onClick={setNewQantityHandler} minWidth="0" w="170%">
                {menuList}
              </MenuList>
            </Menu>
          </GridItem>

          <GridItem display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="xl" fontWeight="medium">
              {`₹${item.price * item.quantity}`}
            </Text>
          </GridItem>

          <GridItem display="flex" alignItems="center" justifyContent="center">
            <Button
              colorScheme="red"
              variant="solid"
              onClick={removeFromCartHandler}
            >
              Remove
            </Button>
          </GridItem>
        </Fragment>
      )}

      {isMaxWidth650 && (
        <Fragment>
          <GridItem display="flex" alignItems="center" justifyContent="center">
            <HStack align="flex-start">
              <Image src={item.image} alt="hi" boxSize="30%" />
              <VStack pl="5" align="flex-start">
                <Heading as="h6" fontSize="xl" fontWeight="medium">
                  {item.name}
                </Heading>
                <Text as="p" fontSize="sm">
                  Price {item.price}
                </Text>
              </VStack>
            </HStack>
          </GridItem>

          <GridItem display="flex" alignItems="center" justifyContent="center">
            <VStack>
              <Text fontSize="xl" fontWeight="medium">
                {`₹${item.price * item.quantity}`}
              </Text>

              <Button
                colorScheme="red"
                variant="solid"
                onClick={removeFromCartHandler}
              >
                Remove
              </Button>
              <Text display="inline" mr={2}>
                Qty
              </Text>
              <Menu>
                <MenuButton
                  px={4}
                  py={2}
                  transition="all 0.2s"
                  borderRadius="md"
                  borderWidth="1px"
                  bg="gray.300"
                  _hover={{ bg: "gray.400" }}
                  _expanded={{ bg: "blue.400" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  {item.quantity} <ChevronDownIcon />
                </MenuButton>
                <MenuList onClick={setNewQantityHandler} minWidth="0" w="170%">
                  {menuList}
                </MenuList>
              </Menu>
            </VStack>
          </GridItem>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CartItemCard;
