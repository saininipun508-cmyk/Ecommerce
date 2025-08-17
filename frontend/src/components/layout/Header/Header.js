import React, { useRef, useState } from "react";
import {
  Flex,
  Image,
  Input,
  HStack,
  useMediaQuery,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Text,
  Box,
  VStack,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  AiFillHome,
  AiOutlineDropbox,
  AiFillMessage,
  AiFillInfoCircle,
} from "react-icons/ai";

const logo =
  "https://res.cloudinary.com/dhtnodfhl/image/upload/v1658429313/avatars/logo_hyagaf.png";

const Header = () => {
  const [isMaxWidth800] = useMediaQuery("(max-width: 800px)");
  const [isMaxWidth400] = useMediaQuery("(max-width: 400px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [keyword, setKeyword] = useState();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/products/?keyword=${keyword}`);
    }
    onClose();
  };

  return (
    <>
      {!isMaxWidth800 && (
        <Flex
          height="14"
          bg="#2874F0"
          color="white"
          justifyContent="space-between"
        >
          <HStack width="50%" spacing="1.5vw" justifyContent="center">
            <NavLink to="/">
              <Image src={logo} height={30} width={100} mr={2}></Image>
            </NavLink>

            <form style={{ width: "50%" }} onSubmit={submitHandler}>
              <InputGroup>
                <Input
                  bg="white"
                  color="black"
                  onChange={(e) => setKeyword(e.target.value.trim())}
                  placeholder="Search.."
                />
                <InputRightElement
                  type="submit"
                  children={
                    <Search2Icon
                      cursor="pointer"
                      color="black"
                      _hover={{ color: "teal" }}
                    />
                  }
                />
              </InputGroup>
            </form>
          </HStack>

          <HStack width="50%" spacing="1.5vw" justifyContent="center">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/products">Products</NavLink>

            <NavLink to="/contact">Contact</NavLink>

            <NavLink to="/about">About</NavLink>

            <UserOptions
              isAuthenticated={isAuthenticated}
              user={user}
            ></UserOptions>
          </HStack>
        </Flex>
      )}

      {isMaxWidth800 && (
        <Flex
          height="14"
          justifyContent="space-between"
          bg="#2874F0"
          color="white"
          alignItems="center"
          px={5}
        >
          <Button
            background={"none"}
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            ref={btnRef}
            onClick={onOpen}
          >
            <HamburgerIcon w={10} h={10} />
          </Button>

          <NavLink to="/">
            <Image src={logo} height={30} width={100} mr={2}></Image>
          </NavLink>

          {isAuthenticated && (
            <Link to="/account">
              <HStack cursor={"pointer"}>
                {!isMaxWidth400 && <Text>{user.name}</Text>}
                <Avatar size="sm" name={user.name} src={user.avatar.url} />
              </HStack>
            </Link>
          )}

          {!isAuthenticated && (
            <Link to="/login">
              <Button colorScheme="blue">Login / Register</Button>
            </Link>
          )}
        </Flex>
      )}

      {isMaxWidth800 && (
        <Drawer
          placement="left"
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader mb={2}>
              <Box my={4}>
                <Image src={logo} height={30} width={"50%"} mr={2}></Image>
              </Box>
              <form style={{ width: "100%" }} onSubmit={submitHandler}>
                <InputGroup>
                  <Input
                    onChange={(e) => setKeyword(e.target.value.trim())}
                    placeholder="Search.."
                  />
                  <InputRightElement
                    type="submit"
                    children={
                      <Search2Icon
                        cursor="pointer"
                        color="black"
                        _hover={{ color: "teal" }}
                      />
                    }
                  />
                </InputGroup>
              </form>
            </DrawerHeader>

            <DrawerBody onClick={onClose}>
              <VStack my={10} spacing="4" align="flex-start">
                <NavLink style={{ width: "100%" }} to="/">
                  <Button justifyContent="flex-start" w="100%">
                    <Icon as={AiFillHome} mr={3} />
                    Home
                  </Button>
                </NavLink>

                <NavLink style={{ width: "100%" }} to="/products">
                  <Button justifyContent="flex-start" w="100%">
                    <Icon as={AiOutlineDropbox} mr={3} />
                    Products
                  </Button>
                </NavLink>

                <UserOptions isAuthenticated={isAuthenticated} user={user} />

                <NavLink style={{ width: "100%" }} to="/contact">
                  <Button justifyContent="flex-start" w="100%">
                    <Icon as={AiFillMessage} mr={3} />
                    Contact
                  </Button>
                </NavLink>

                <NavLink style={{ width: "100%" }} to="/about">
                  <Button justifyContent="flex-start" w="100%">
                    <Icon as={AiFillInfoCircle} mr={3} />
                    About
                  </Button>
                </NavLink>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Header;
