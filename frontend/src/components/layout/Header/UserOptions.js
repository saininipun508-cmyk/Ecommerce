import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tag,
  useMediaQuery,
  Button,
  Box,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { FiSlack } from "react-icons/fi";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";

const UserOptions = ({ user, isAuthenticated, children }) => {
  const [isMaxWidth800] = useMediaQuery("(max-width: 800px)");

  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const dashboard = () => {
    navigate("/admin/dashboard");
  };

  const orders = () => {
    navigate("/orders");
  };

  const account = () => {
    navigate("/account");
  };

  const cart = () => {
    navigate("/cart");
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully.");
  };

  const loginOrRegisterUSer = () => {
    navigate("/login");
  };

  const options = [
    {
      icon: <FaUserAlt />,
      name: "Profile",
      func: account,
    },
    {
      icon: <MdShoppingCart />,
      name: "Cart",
      func: cart,
    },
    {
      icon: isAuthenticated ? <IoLogOut /> : <IoLogIn />,
      name: isAuthenticated ? "Logout" : "Login / Register",
      func: isAuthenticated ? logoutUser : loginOrRegisterUSer,
    },
  ];

  if (isAuthenticated) {
    options.unshift({
      icon: <FaShoppingBag />,
      name: "Orders",
      func: orders,
    });
  }

  if (isAuthenticated && user.role === "admin") {
    options.unshift({
      icon: <FiSlack />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      {!isMaxWidth800 && (
        <Menu>
          <MenuButton>
            {isAuthenticated && (
              <Avatar size="sm" name={user.name} src={user.avatar.url} />
            )}
            {!isAuthenticated && "Login / Register"}
          </MenuButton>
          <MenuList color="black" zIndex={1000}>
            {options.map((item, idx) => (
              <MenuItem
                _hover={{ bg: "gray.200" }}
                key={idx}
                onClick={item.func}
              >
                <HStack>
                  {item.icon} <Text>{item.name} </Text>
                  {item.name === "Cart" && cartItems.length > 0 && (
                    <Tag size="sm" bg="green.300" borderRadius="full">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"} in your cart
                    </Tag>
                  )}
                </HStack>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}

      {isMaxWidth800 && (
        <>
          {options.map((item, idx) => {
            return (
              <Button
                onClick={item.func}
                key={idx}
                justifyContent="flex-start"
                w="100%"
              >
                {item.icon}
                <Box ml={3}>{item.name}</Box>
                {item.name === "Cart" && cartItems.length > 0 && (
                  <Tag ml={3} size="sm" bg="green.300" borderRadius="full">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"} in your cart
                  </Tag>
                )}
              </Button>
            );
          })}
        </>
      )}
    </Fragment>
  );
};

export default UserOptions;
